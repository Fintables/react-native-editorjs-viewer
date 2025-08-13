# React Native Editor.js Viewer

React Native Editor.js Viewer is a powerful and flexible component for rendering Editor.js content in React Native applications. This library provides a seamless way to display rich, structured content created with Editor.js in your mobile apps, maintaining the look and feel of the original content while adapting it for mobile interfaces.

Key features include:

- Support for a wide range of Editor.js block types
- Customizable styling for each block type
- Fallback component for handling unsupported blocks
- Responsive design optimized for mobile devices
- Easy integration with existing React Native projects

Whether you're building a content-rich app, a mobile blog reader, or any application that needs to display structured content, React Native Editor.js Viewer offers a robust solution for rendering Editor.js output in your React Native environment.

## Installation

```sh
npm install @fintables/react-native-editorjs-viewer
```

## Usage

```javascript
import EditorJsViewer from '@fintables/react-native-editorjs-viewer';

// ...

const App = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <EditorJsViewer
        data={editorJsData}
        showFallback={true}
        style={styles.editorJsContainer}
      />
    </ScrollView>
  );
};
```

## Features

- Supports various Editor.js block types
- Customizable styles for each component
- Fallback component for unsupported block types
- Responsive design for mobile applications

## Supported Block Types

- Paragraph
- Header
- Delimiter
- Image
- Link Tool
- Quote
- List (ordered and unordered)
- Table
- Warning
- Checklist
- Raw HTML

## Customization

You can customize the appearance of each component by passing style props:

```javascript
<EditorJsViewer
  data={editorJsData}
  componentStyles={{
    paragraph: {
      textStyle: { fontSize: 16, color: '#333' },
    },
    // ... other component styles
  }}
  componentProps={{
    raw: {
      contentWidth: Dimensions.get('window').width,
    },
    // ... other component props
  }}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
