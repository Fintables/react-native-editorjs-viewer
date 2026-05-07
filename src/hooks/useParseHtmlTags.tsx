import { createElement, type ReactNode, Fragment, useCallback } from 'react';
import { Text } from 'react-native';
import { decode } from 'html-entities';
import type { IUseParseHtmlTags } from '../types';
import { Bold, Code, Italic, Link, Mark, Underline } from '../subComponents';

const defaultTagList = ['b', 'code', 'i', 'mark', 'u', 'a'];

const useParseHtmlTags = ({
  styles,
  textProps,
}: IUseParseHtmlTags & { textProps?: any }) => {
  const getTagName = useCallback((value: string) => {
    return value.match(/<\s*(\w+)/)?.[1] ?? '';
  }, []);

  const getComponentByName = useCallback((name: string) => {
    switch (name) {
      case 'b':
        return Bold;
      case 'code':
        return Code;
      case 'i':
        return Italic;
      case 'mark':
        return Mark;
      case 'u':
        return Underline;
      case 'a':
        return Link;

      default:
        return Text;
    }
  }, []);

  const getStyleName = useCallback((tagName: string) => {
    switch (tagName) {
      case 'b':
        return 'boldTextStyle';
      case 'code':
        return 'codeTextStyle';
      case 'i':
        return 'italicTextStyle';
      case 'mark':
        return 'markTextStyle';
      case 'u':
        return 'underlineTextStyle';
      case 'a':
        return 'linkTextStyle';

      default:
        return 'textStyle';
    }
  }, []);

  const createElementByTagName = useCallback(
    (
      tagChildren: string | ReactNode,
      props: Record<string, any>,
      tagName: string
    ): ReactNode => {
      return createElement(
        getComponentByName(tagName),
        {
          ...textProps,
          ...props,
          style: styles?.[getStyleName(tagName)],
        },
        tagChildren
      );
    },
    [getComponentByName, getStyleName, styles, textProps]
  );

  const matchTagInList = useCallback(
    (listOfTags: Array<string>, text: string): RegExpMatchArray | null => {
      const { match } = listOfTags.reduce(
        (acc, curr) => {
          const currentMatch = text.match(new RegExp(`<${curr}(.*?)>`));

          if (!currentMatch) return acc;

          if (acc.match == null) {
            acc.match = currentMatch;
            return acc;
          }

          const currentMatchIsPreviousAcumMatch =
            currentMatch.index != null &&
            acc.match.index != null &&
            currentMatch.index < acc.match.index;

          if (currentMatchIsPreviousAcumMatch) {
            acc.match = currentMatch;
            return acc;
          }

          return acc;
        },
        { match: null } as { match: RegExpMatchArray | null }
      );

      return match;
    },
    []
  );

  const parseHtmlTag = useCallback(
    (listOfTags: Array<string>, value: string): ReactNode => {
      const firstMatchTag = matchTagInList(listOfTags, value);

      if (firstMatchTag == null || firstMatchTag?.index == null) {
        return <Fragment>{decode(value)}</Fragment>;
      }

      const stringAfterTargetTag = value.substring(
        firstMatchTag.index + firstMatchTag[0].length
      );

      const tagName = getTagName(firstMatchTag[0]);

      const props = firstMatchTag[0].match(/ (.*?)>/)?.[1];

      const propsMap: Record<string, any> = {};

      if (props) {
        const attrRegex =
          /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
        let attrMatch: RegExpExecArray | null;

        while ((attrMatch = attrRegex.exec(props)) !== null) {
          const [, key, doubleQuoted, singleQuoted, unquoted] = attrMatch;
          if (!key) continue;
          propsMap[key] = decode(
            doubleQuoted ?? singleQuoted ?? unquoted ?? ''
          );
        }
      }

      const closeTag = stringAfterTargetTag.match(new RegExp(`</${tagName}>`));

      const nextOpenTag = matchTagInList(listOfTags, stringAfterTargetTag);

      if (
        closeTag?.index == null ||
        (closeTag.index == null && nextOpenTag?.index == null)
      ) {
        return <Fragment>{decode(value)}</Fragment>;
      }

      // If does not exists anyone open tag
      if (nextOpenTag?.index == null || closeTag.index < nextOpenTag.index) {
        const textBeforeTag = value.substring(0, firstMatchTag.index);
        const tagText = stringAfterTargetTag.substring(0, closeTag.index);
        const textAfterTag = stringAfterTargetTag.substring(
          closeTag.index + closeTag[0].length
        );

        return (
          <Fragment>
            {textBeforeTag && decode(textBeforeTag)}
            {createElementByTagName(decode(tagText), propsMap, tagName)}
            {textAfterTag && parseHtmlTag(listOfTags, textAfterTag)}
          </Fragment>
        );
      }

      const textBeforeTag = value.substring(0, firstMatchTag.index);
      const tagText = value.substring(
        firstMatchTag.index + firstMatchTag[0].length
      );
      const textAfterTag = stringAfterTargetTag.substring(
        closeTag.index + closeTag[0].length
      );

      return (
        <Fragment>
          {textBeforeTag && decode(textBeforeTag)}
          {createElementByTagName(
            parseHtmlTag(listOfTags, tagText.substring(0, closeTag.index)),
            propsMap,
            tagName
          )}
          {textAfterTag && parseHtmlTag(listOfTags, textAfterTag)}
        </Fragment>
      );
    },
    [matchTagInList, getTagName, createElementByTagName]
  );

  return {
    defaultTagList,
    parseHtmlTag,
  };
};

export default useParseHtmlTags;
