import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ModelViewScreen({ route }) {
  const { modelUrl } = route.params;

  // HTML string with model-viewer tag
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
          }
          model-viewer {
            width: 100%;
            height: 100vh;
            background-color: #1a1a1a;
          }
        </style>
      </head>
      <body>
        <model-viewer
          src="${modelUrl}"
          alt="3D Artifact Model"
          auto-rotate
          camera-controls
          interaction-policy="allow-when-focused"
          ar
          ar-modes="webxr scene-viewer quick-look"
          style="width: 100%; height: 100vh;"
        >
        </model-viewer>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
});

