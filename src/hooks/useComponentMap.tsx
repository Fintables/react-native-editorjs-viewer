import { useMemo } from 'react';
import type {
  EditorJsViewerProps,
  IComponentBlockProps,
  IComponentObject,
} from '../types';
import {
  ParagraphComponent,
  HeaderComponent,
  DelimiterComponent,
  ImageComponent,
  LinkToolComponent,
  QuoteComponent,
  ListComponent,
  TableComponent,
  WarningComponent,
  CheckListComponent,
  RawComponent,
} from '../components';

function useComponentMap(
  components: EditorJsViewerProps['components'],
  componentStyles: EditorJsViewerProps['componentStyles'],
  defaultStyles: EditorJsViewerProps['defaultStyles'],
  customComponents: EditorJsViewerProps['customComponents'],
  componentProps: EditorJsViewerProps['componentProps'],
  textProps: EditorJsViewerProps['textProps']
): IComponentObject {
  return useMemo(() => {
    const Paragraph = components?.Paragraph || ParagraphComponent;
    const Header = components?.Header || HeaderComponent;
    const Delimiter = components?.Delimiter || DelimiterComponent;
    const Image = components?.Image || ImageComponent;
    const LinkTool = components?.Link || LinkToolComponent;
    const Quote = components?.Quote || QuoteComponent;
    const List = components?.List || ListComponent;
    const Table = components?.Table || TableComponent;
    const Warning = components?.Warning || WarningComponent;
    const CheckList = components?.CheckList || CheckListComponent;
    const Raw = components?.Raw || RawComponent;

    return {
      paragraph: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <Paragraph
            data={block.data}
            style={[
              containerStyle,
              defaultStyles?.textStyle,
              componentStyles?.paragraph?.textStyle,
            ]}
            textProps={textProps}
            otherStyles={{
              boldTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.paragraph?.textStyle,
                defaultStyles?.boldTextStyle,
                componentStyles?.paragraph?.boldTextStyle,
              ],
              italicTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.paragraph?.textStyle,
                defaultStyles?.italicTextStyle,
                componentStyles?.paragraph?.italicTextStyle,
              ],
              underlineTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.paragraph?.textStyle,
                defaultStyles?.underlineTextStyle,
                componentStyles?.paragraph?.underlineTextStyle,
              ],
              codeTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.paragraph?.textStyle,
                defaultStyles?.codeTextStyle,
                componentStyles?.paragraph?.codeTextStyle,
              ],
              markTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.paragraph?.textStyle,
                defaultStyles?.markTextStyle,
                componentStyles?.paragraph?.markTextStyle,
              ],
              linkTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.paragraph?.textStyle,
                defaultStyles?.linkTextStyle,
                componentStyles?.paragraph?.linkTextStyle,
              ],
            }}
          />
        );
      },
      header: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <Header
            data={block.data}
            style={(level) => [
              containerStyle,
              defaultStyles?.textStyle,
              componentStyles?.header?.textStyle?.(level),
            ]}
            textProps={textProps}
            otherStyles={(level) => ({
              boldTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.header?.textStyle?.(level),
                defaultStyles?.boldTextStyle,
                componentStyles?.header?.boldTextStyle,
              ],
              italicTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.header?.textStyle?.(level),
                defaultStyles?.italicTextStyle,
                componentStyles?.header?.italicTextStyle,
              ],
              underlineTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.header?.textStyle?.(level),
                defaultStyles?.underlineTextStyle,
                componentStyles?.header?.underlineTextStyle,
              ],
              codeTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.header?.textStyle?.(level),
                defaultStyles?.codeTextStyle,
                componentStyles?.header?.codeTextStyle,
              ],
              markTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.header?.textStyle?.(level),
                defaultStyles?.markTextStyle,
                componentStyles?.header?.markTextStyle,
              ],
              linkTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.header?.textStyle?.(level),
                defaultStyles?.linkTextStyle,
                componentStyles?.header?.linkTextStyle,
              ],
            })}
          />
        );
      },
      delimiter: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <Delimiter
            data={block.data}
            containerStyle={[
              containerStyle,
              componentStyles?.delimiter?.containerStyle,
            ]}
            textStyle={[
              defaultStyles?.textStyle,
              componentStyles?.delimiter?.textStyle,
            ]}
            textProps={textProps}
          />
        );
      },
      image: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <Image
            data={block.data}
            containerStyle={[
              containerStyle,
              componentStyles?.image?.containerStyle,
            ]}
            textStyle={[
              defaultStyles?.textStyle,
              componentStyles?.image?.textStyle,
            ]}
            imageStyle={componentStyles?.image?.imageStyle}
            textProps={textProps}
            otherStyles={{
              boldTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.image?.textStyle,
                defaultStyles?.boldTextStyle,
                componentStyles?.image?.boldTextStyle,
              ],
              italicTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.image?.textStyle,
                defaultStyles?.italicTextStyle,
                componentStyles?.image?.italicTextStyle,
              ],
              underlineTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.image?.textStyle,
                defaultStyles?.underlineTextStyle,
                componentStyles?.image?.underlineTextStyle,
              ],
              codeTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.image?.textStyle,
                defaultStyles?.codeTextStyle,
                componentStyles?.image?.codeTextStyle,
              ],
              markTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.image?.textStyle,
                defaultStyles?.markTextStyle,
                componentStyles?.image?.markTextStyle,
              ],
              linkTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.image?.textStyle,
                defaultStyles?.linkTextStyle,
                componentStyles?.image?.linkTextStyle,
              ],
            }}
          />
        );
      },
      linktool: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <LinkTool
            data={block.data}
            containerStyle={[
              containerStyle,
              componentStyles?.linkTool?.containerStyle,
            ]}
            wrapperStyle={componentStyles?.linkTool?.wrapperStyle}
            imageContainerStyle={componentStyles?.linkTool?.imageContainerStyle}
            dataContainerStyle={componentStyles?.linkTool?.dataContainerStyle}
            titleTextStyle={[
              defaultStyles?.textStyle,
              componentStyles?.linkTool?.titleTextStyle,
            ]}
            descriptionTextStyle={[
              defaultStyles?.textStyle,
              componentStyles?.linkTool?.descriptionTextStyle,
            ]}
            linkTextStyle={[
              defaultStyles?.textStyle,
              defaultStyles?.linkTextStyle,
              componentStyles?.linkTool?.linkTextStyle,
            ]}
            imageStyle={componentStyles?.linkTool?.imageStyle}
            titleTextProps={{
              ...textProps,
              ...componentProps?.linkTool?.titleTextProps,
            }}
            descriptionTextProps={{
              ...textProps,
              ...componentProps?.linkTool?.descriptionTextProps,
            }}
            linkTextProps={{
              ...textProps,
              ...componentProps?.linkTool?.linkTextProps,
            }}
            imageProps={componentProps?.linkTool?.imageProps}
          />
        );
      },
      quote: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <Quote
            data={block.data}
            containerStyle={[
              containerStyle,
              componentStyles?.quote?.containerStyle,
            ]}
            textStyle={[
              defaultStyles?.textStyle,
              componentStyles?.quote?.textStyle,
            ]}
            captionTextStyle={[
              defaultStyles?.textStyle,
              componentStyles?.quote?.captionTextStyle,
            ]}
            textProps={textProps}
            otherStyles={{
              boldTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.quote?.textStyle,
                defaultStyles?.boldTextStyle,
                componentStyles?.quote?.boldTextStyle,
              ],
              italicTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.quote?.textStyle,
                defaultStyles?.italicTextStyle,
                componentStyles?.quote?.italicTextStyle,
              ],
              underlineTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.quote?.textStyle,
                defaultStyles?.underlineTextStyle,
                componentStyles?.quote?.underlineTextStyle,
              ],
              codeTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.quote?.textStyle,
                defaultStyles?.codeTextStyle,
                componentStyles?.quote?.codeTextStyle,
              ],
              markTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.quote?.textStyle,
                defaultStyles?.markTextStyle,
                componentStyles?.quote?.markTextStyle,
              ],
              linkTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.quote?.textStyle,
                defaultStyles?.linkTextStyle,
                componentStyles?.quote?.linkTextStyle,
              ],
            }}
          />
        );
      },
      list: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <List
            data={block.data}
            containerStyle={[
              containerStyle,
              componentStyles?.list?.containerStyle,
            ]}
            listItemStyle={{
              containerStyle: componentStyles?.list?.listItem?.containerStyle,
              textStyle: [
                defaultStyles?.textStyle,
                componentStyles?.list?.listItem?.textStyle,
              ],
              dotStyle: componentStyles?.list?.listItem?.dotStyle,
              numberTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.list?.listItem?.textStyle,
                componentStyles?.list?.listItem?.numberTextStyle,
              ],
            }}
            contentContainerStyle={componentStyles?.list?.contentContainerStyle}
            textProps={textProps}
            otherStyles={{
              boldTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.list?.listItem?.textStyle,
                defaultStyles?.boldTextStyle,
                componentStyles?.list?.listItem?.boldTextStyle,
              ],
              italicTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.list?.listItem?.textStyle,
                defaultStyles?.italicTextStyle,
                componentStyles?.list?.listItem?.italicTextStyle,
              ],
              underlineTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.list?.listItem?.textStyle,
                defaultStyles?.underlineTextStyle,
                componentStyles?.list?.listItem?.underlineTextStyle,
              ],
              codeTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.list?.listItem?.textStyle,
                defaultStyles?.codeTextStyle,
                componentStyles?.list?.listItem?.codeTextStyle,
              ],
              markTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.list?.listItem?.textStyle,
                defaultStyles?.markTextStyle,
                componentStyles?.list?.listItem?.markTextStyle,
              ],
              linkTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.list?.listItem?.textStyle,
                defaultStyles?.linkTextStyle,
                componentStyles?.list?.listItem?.linkTextStyle,
              ],
            }}
          />
        );
      },
      table: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <Table
            data={block.data}
            containerStyle={[
              containerStyle,
              componentStyles?.table?.containerStyle,
            ]}
            rowStyle={componentStyles?.table?.rowStyle}
            cellStyle={componentStyles?.table?.cellStyle}
            headerCellStyle={componentStyles?.table?.headerCellStyle}
            cellTextStyle={[
              defaultStyles?.textStyle,
              componentStyles?.table?.cellTextStyle,
            ]}
            headerCellTextStyle={[
              defaultStyles?.textStyle,
              componentStyles?.table?.headerCellTextStyle,
            ]}
            contentContainerStyle={
              componentStyles?.table?.contentContainerStyle
            }
            separatorStyle={componentStyles?.table?.separatorStyle}
            textProps={{ ...textProps, ...componentProps?.table?.textProps }}
            flatListProps={componentProps?.table?.flatListProps}
          />
        );
      },
      warning: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <Warning
            data={block.data}
            containerStyle={[
              containerStyle,
              componentStyles?.warning?.containerStyle,
            ]}
            titleTextStyle={[
              defaultStyles?.textStyle,
              defaultStyles?.boldTextStyle,
              componentStyles?.warning?.boldTextStyle,
              componentStyles?.warning?.titleTextStyle,
            ]}
            messageTextStyle={[
              defaultStyles?.textStyle,
              componentStyles?.warning?.textStyle,
            ]}
            textProps={textProps}
            otherStyles={{
              boldTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.warning?.textStyle,
                defaultStyles?.boldTextStyle,
                componentStyles?.warning?.boldTextStyle,
              ],
              italicTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.warning?.textStyle,
                defaultStyles?.italicTextStyle,
                componentStyles?.warning?.italicTextStyle,
              ],
              underlineTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.warning?.textStyle,
                defaultStyles?.underlineTextStyle,
                componentStyles?.warning?.underlineTextStyle,
              ],
              codeTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.warning?.textStyle,
                defaultStyles?.codeTextStyle,
                componentStyles?.warning?.codeTextStyle,
              ],
              markTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.warning?.textStyle,
                defaultStyles?.markTextStyle,
                componentStyles?.warning?.markTextStyle,
              ],
              linkTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.warning?.textStyle,
                defaultStyles?.linkTextStyle,
                componentStyles?.warning?.linkTextStyle,
              ],
            }}
          />
        );
      },
      checklist: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <CheckList
            data={block.data}
            containerStyle={[
              containerStyle,
              componentStyles?.checklist?.containerStyle,
            ]}
            itemContainerStyle={
              componentStyles?.checklist?.checkListItem?.containerStyle
            }
            textStyle={[
              defaultStyles?.textStyle,
              componentStyles?.checklist?.checkListItem?.textStyle,
            ]}
            checkboxStyle={
              componentStyles?.checklist?.checkListItem?.checkBox?.style
            }
            checkboxCheckedStyle={
              componentStyles?.checklist?.checkListItem?.checkBox?.checkedStyle
            }
            checkboxUncheckedStyle={
              componentStyles?.checklist?.checkListItem?.checkBox
                ?.uncheckedStyle
            }
            checkmarkStyle={
              componentStyles?.checklist?.checkListItem?.checkBox
                ?.checkmarkStyle
            }
            contentContainerStyle={
              componentStyles?.checklist?.contentContainerStyle
            }
            textProps={textProps}
            otherStyles={{
              boldTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.checklist?.checkListItem?.textStyle,
                defaultStyles?.boldTextStyle,
                componentStyles?.checklist?.checkListItem?.boldTextStyle,
              ],
              italicTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.checklist?.checkListItem?.textStyle,
                defaultStyles?.italicTextStyle,
                componentStyles?.checklist?.checkListItem?.italicTextStyle,
              ],
              underlineTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.checklist?.checkListItem?.textStyle,
                defaultStyles?.underlineTextStyle,
                componentStyles?.checklist?.checkListItem?.underlineTextStyle,
              ],
              codeTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.checklist?.checkListItem?.textStyle,
                defaultStyles?.codeTextStyle,
                componentStyles?.checklist?.checkListItem?.codeTextStyle,
              ],
              markTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.checklist?.checkListItem?.textStyle,
                defaultStyles?.markTextStyle,
                componentStyles?.checklist?.checkListItem?.markTextStyle,
              ],
              linkTextStyle: [
                defaultStyles?.textStyle,
                componentStyles?.checklist?.checkListItem?.textStyle,
                defaultStyles?.linkTextStyle,
                componentStyles?.checklist?.checkListItem?.linkTextStyle,
              ],
            }}
          />
        );
      },
      raw: ({ block, containerStyle }: IComponentBlockProps) => {
        return (
          <Raw
            data={block.data}
            containerStyle={[
              containerStyle,
              componentStyles?.raw?.containerStyle,
            ]}
            textProps={textProps}
            {...componentProps?.raw}
          />
        );
      },
      ...customComponents,
    };
  }, [
    components,
    componentStyles,
    customComponents,
    componentProps,
    defaultStyles,
    textProps,
  ]) as IComponentObject;
}

export default useComponentMap;
