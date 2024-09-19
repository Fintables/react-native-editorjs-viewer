import { StyleSheet, View } from 'react-native';
import { FallbackComponent } from './components';
import type { EditorJsViewerProps } from './types';
import { useComponentMap } from './hooks';

const EditorJsViewer = ({
  data,
  showFallback = false,
  components,
  customComponents,
  componentStyles,
  style,
  componentConfigs,
}: EditorJsViewerProps) => {
  const componentMap = useComponentMap(
    components,
    componentStyles,
    customComponents,
    componentConfigs
  );

  return (
    <View style={[styles.container, style]}>
      {data.blocks.map((block, index) => {
        const isFirstBlock = index === 0;
        const isLastBlock = index === data.blocks.length - 1;

        const overrideMarginIfIsFirstOrLastElement = {
          marginTop: isFirstBlock ? 0 : undefined,
          marginBottom: isLastBlock ? 0 : undefined,
        };

        const type = block.type.toLowerCase();

        if (type === 'image' && block.data?.file == null && block.data.url) {
          block.data.file = { url: block.data.url };
        }

        const Component = componentMap[type];

        if (Component) {
          return (
            <Component
              key={block.id || index}
              block={block}
              containerStyle={overrideMarginIfIsFirstOrLastElement}
            />
          );
        }

        return showFallback ? (
          <FallbackComponent
            key={block.id || index}
            blockType={block.type}
            containerStyle={[
              overrideMarginIfIsFirstOrLastElement,
              componentStyles?.fallback?.containerStyle,
            ]}
            textStyle={componentStyles?.fallback?.textStyle}
          />
        ) : null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default EditorJsViewer;
