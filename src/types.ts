import React, { type ReactElement } from 'react';
import type { ImageProps, TextProps, ViewProps } from 'react-native';
import type { IParagraphProps } from './components/paragraph';
import type { IHeaderProps } from './components/header';
import type { IDelimiterProps } from './components/delimiter';
import type { IImageProps } from './components/image';
import type { ILinkToolProps } from './components/linkTool';
import type { IQuoteProps } from './components/quote';
import type { IListProps } from './components/list';
import type { ITableProps } from './components/table';
import type { IWarningProps } from './components/warning';
import type { ICheckListProps } from './components/checkList';
import type { IRawProps } from './components/raw';
import type { RenderHTMLProps } from 'react-native-render-html';

export interface IEditorJsData {
  version?: string;
  time?: number;
  blocks: OutputBlockData[];
}

export interface OutputBlockData<
  Type extends string = string,
  T extends object = any,
> {
  id?: string;
  type: Type;
  data: BlockToolData<T>;
  tunes?: { [name: string]: BlockTuneData };
}

export type BlockToolData<T extends object = any> = T;

export type BlockTuneData = any;

export type IUseParseHtmlTags = {
  styles?: {
    boldTextStyle?: TextProps['style'];
    italicTextStyle?: TextProps['style'];
    underlineTextStyle?: TextProps['style'];
    markTextStyle?: TextProps['style'];
    codeTextStyle?: TextProps['style'];
    textStyle?: TextProps['style'];
    linkTextStyle?: TextProps['style'];
  };
};

export type EditorJsViewerProps = {
  data: IEditorJsData;
  showFallback?: boolean;
  textProps?: Omit<TextProps, 'style' | 'children'>;
  components?: {
    Paragraph?: React.ComponentType<IParagraphProps>;
    Header?: React.ComponentType<IHeaderProps>;
    Delimiter?: React.ComponentType<IDelimiterProps>;
    Image?: React.ComponentType<IImageProps>;
    Link?: React.ComponentType<ILinkToolProps>;
    Quote?: React.ComponentType<IQuoteProps>;
    List?: React.ComponentType<IListProps>;
    Table?: React.ComponentType<ITableProps>;
    Warning?: React.ComponentType<IWarningProps>;
    CheckList?: React.ComponentType<ICheckListProps>;
    Raw?: React.ComponentType<IRawProps>;
  };
  customComponents?: IComponentObject;
  style?: ViewProps['style'];
  defaultStyles?: IUseParseHtmlTags['styles'];
  componentStyles?: {
    paragraph?: IUseParseHtmlTags['styles'];
    header?: {
      textStyle?: (level: 1 | 2 | 3 | 4 | 5 | 6) => TextProps['style'];
    } & Omit<NonNullable<IUseParseHtmlTags['styles']>, 'textStyle'>;
    delimiter?: {
      containerStyle?: ViewProps['style'];
      textStyle?: TextProps['style'];
    };
    image?: {
      imageStyle?: ImageProps['style'];
      containerStyle?: ViewProps['style'];
    } & IUseParseHtmlTags['styles'];
    linkTool?: {
      wrapperStyle?: ViewProps['style'];
      containerStyle?: ViewProps['style'];
      imageContainerStyle?: ViewProps['style'];
      dataContainerStyle?: ViewProps['style'];
      titleTextStyle?: TextProps['style'];
      descriptionTextStyle?: TextProps['style'];
      linkTextStyle?: TextProps['style'];
      imageStyle?: ImageProps['style'];
    };
    quote?: {
      containerStyle?: ViewProps['style'];
      captionTextStyle?: TextProps['style'];
    } & IUseParseHtmlTags['styles'];
    fallback?: {
      containerStyle?: ViewProps['style'];
      textStyle?: TextProps['style'];
    };
    list?: {
      containerStyle?: ViewProps['style'];
      contentContainerStyle?: ViewProps['style'];
      listItem?: {
        containerStyle?: ViewProps['style'];
        textStyle?: TextProps['style'];
        dotStyle?: ViewProps['style'];
        numberTextStyle?: TextProps['style'];
      } & IUseParseHtmlTags['styles'];
    };
    table?: {
      containerStyle?: ViewProps['style'];
      cellStyle?: ViewProps['style'];
      headerCellStyle?: ViewProps['style'];
      cellTextStyle?: TextProps['style'];
      headerCellTextStyle?: TextProps['style'];
      rowStyle?: ViewProps['style'];
      contentContainerStyle?: ViewProps['style'];
      separatorStyle?: ViewProps['style'];
    };
    warning?: {
      containerStyle?: ViewProps['style'];
      titleTextStyle?: TextProps['style'];
      textStyle?: TextProps['style'];
    } & IUseParseHtmlTags['styles'];
    checklist?: {
      containerStyle?: ViewProps['style'];
      checkListItem?: {
        containerStyle?: ViewProps['style'];
        textStyle?: TextProps['style'];
        checkBox?: {
          style?: ViewProps['style'];
          checkedStyle?: ViewProps['style'];
          uncheckedStyle?: ViewProps['style'];
          checkmarkStyle?: ViewProps['style'];
        };
      } & IUseParseHtmlTags['styles'];
      contentContainerStyle?: ViewProps['style'];
    };
    code?: {
      containerStyle?: ViewProps['style'];
      codeContainerStyle?: ViewProps['style'];
      codeTextStyle?: TextProps['style'];
    };
    raw?: {
      containerStyle?: ViewProps['style'];
    };
  };
  componentProps?: {
    raw?: Omit<RenderHTMLProps, 'source' | 'contentWidth'>;
    table?: Pick<ITableProps, 'flatListProps' | 'textProps'>;
    linkTool?: Pick<
      ILinkToolProps,
      'titleTextProps' | 'descriptionTextProps' | 'linkTextProps' | 'imageProps'
    >;
  };
};

export interface IComponentBlockProps<T extends object = any> {
  block: OutputBlockData<string, T>;
  containerStyle: ViewProps['style'];
}

export type IComponentObject = {
  [key: string]: (param: IComponentBlockProps) => ReactElement;
};
