import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import data from './data.json';
import EditorJsViewer from '@fintables/react-native-editorjs-viewer';

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EditorJsViewer
          data={data}
          showFallback={true}
          style={styles.editorJsContainer}
          textProps={{
            maxFontSizeMultiplier: 1.0,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  editorJsContainer: {
    padding: 10,
  },
});
