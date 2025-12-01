# Museum Artifact Scanner

A React Native (Expo) app with FastAPI backend for scanning and viewing museum artifacts.

## Project Structure

```
Athena_Assignment/
├── backend/
│   ├── main.py              # FastAPI backend with scan and nearby endpoints
│   ├── requirements.txt     # Python dependencies
│   └── README.md
├── frontend/
│   ├── App.js               # Main app component with navigation
│   ├── screens/
│   │   ├── CameraScreen.js  # Camera screen for scanning artifacts
│   │   ├── DetailsScreen.js # Details and map screen
│   │   └── ModelViewScreen.js # 3D model viewer screen
│   ├── package.json         # Node dependencies
│   ├── app.json             # Expo configuration
│   ├── babel.config.js      # Babel configuration
│   └── README.md
└── README.md
```

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API URLs in `screens/CameraScreen.js` and `screens/DetailsScreen.js`:
   - For Android emulator: `http://10.0.2.2:8000`
   - For iOS simulator: `http://localhost:8000`
   - For physical device: `http://<your-computer-ip>:8000`

4. Start Expo:
```bash
npm start
```

## Features

- **Camera Scanning**: Take photos to scan artifacts (mocked AI)
- **Artifact Details**: View artifact information and location
- **Interactive Map**: See your location on a 300x300 map with SVG
- **3D Model Viewer**: View artifacts in 3D using model-viewer
- **Nearby Artifacts**: Find artifacts close to your location

## API Endpoints

- `POST /scan` - Scan an image and get artifact ID and coordinates
- `GET /nearby?user_x=<x>&user_y=<y>` - Get 3 nearby artifacts
- `GET /artifact/{id}` - Get artifact details by ID