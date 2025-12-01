# Museum Artifact Scanner - Frontend

React Native (Expo) frontend for the Museum Artifact Scanner app.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update the API_BASE_URL in:
   - `screens/CameraScreen.js`
   - `screens/DetailsScreen.js`
   
   Change `http://localhost:8000` to your backend URL. For Android emulator, use `http://10.0.2.2:8000`. For iOS simulator, use `http://localhost:8000`. For physical devices, use your computer's IP address.

3. Start the Expo development server:
```bash
npm start
```

## Screens

1. **Camera Screen**: Take a photo to scan an artifact
2. **Details Screen**: View artifact details and location on a map
3. **3D View Screen**: View the artifact's 3D model using model-viewer

## Notes

- Make sure the backend is running before using the app
- Camera permissions will be requested on first launch
- The app uses expo-camera for photo capture
- react-native-svg is used for drawing the map and user location
- react-native-webview is used to display 3D models with model-viewer

