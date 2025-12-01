# Setup and Run Guide

## Prerequisites

### For Backend (Python/FastAPI):
- Python 3.8 or higher installed
- pip (Python package manager)

### For Frontend (React Native/Expo):
- Node.js (v14 or higher) and npm installed
- Expo CLI (will be installed globally or via npx)
- For mobile testing:
  - **Android**: Android Studio with an emulator, OR Expo Go app on your phone
  - **iOS**: Xcode (Mac only) with iOS Simulator, OR Expo Go app on your phone

---

## Step 1: Setup Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the FastAPI server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   You should see output like:
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
   INFO:     Application startup complete.
   ```

5. **Verify backend is running:**
   - Open browser and go to: `http://localhost:8000/docs`
   - You should see the Swagger API documentation

**Keep this terminal window open!** The backend needs to keep running.

---

## Step 2: Setup Frontend

### Option A: Using npx (Recommended - No global install needed)

1. **Open a NEW terminal window** (keep backend running in the first one)

2. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   This may take a few minutes the first time.

4. **Configure API URL:**
   
   You need to update the API URL in two files based on how you'll run the app:
   
   **For Android Emulator:**
   - Open `screens/CameraScreen.js` and `screens/DetailsScreen.js`
   - Change `http://localhost:8000` to `http://10.0.2.2:8000`
   
   **For iOS Simulator:**
   - Keep `http://localhost:8000` (no change needed)
   
   **For Physical Device (Phone):**
   - Find your computer's IP address:
     - Windows: Run `ipconfig` in CMD, look for IPv4 Address
     - Mac/Linux: Run `ifconfig` or `ip addr`, look for inet address
   - Change `http://localhost:8000` to `http://YOUR_IP_ADDRESS:8000`
   - Example: `http://192.168.1.100:8000`
   - **Important**: Make sure your phone and computer are on the same WiFi network!

5. **Start Expo:**
   ```bash
   npm start
   ```
   
   Or if you prefer:
   ```bash
   npx expo start
   ```

6. **Choose how to run:**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (Mac only)
   - Scan QR code with Expo Go app on your phone
   - Press `w` for web browser (limited functionality)

### Option B: Using Expo Go App (Easiest for Physical Device)

1. **Install Expo Go on your phone:**
   - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Follow steps 1-5 from Option A**

3. **Scan the QR code** that appears in the terminal with:
   - **Android**: Expo Go app (camera feature)
   - **iOS**: Camera app (will prompt to open in Expo Go)

---

## Step 3: Testing the App

1. **Camera Screen:**
   - Grant camera permissions when prompted
   - Tap the white circle button to take a photo
   - The app will send the photo to the backend

2. **Details Screen:**
   - You should see the artifact name and description
   - A 300x300 map with a red dot showing your location
   - Tap "View 3D Model" button

3. **3D Model Screen:**
   - The 3D model should load in a WebView
   - You can interact with it (rotate, zoom)

---

## Troubleshooting

### Backend Issues:

**Port 8000 already in use:**
```bash
# Use a different port
uvicorn main:app --reload --host 0.0.0.0 --port 8001
# Then update frontend API URLs to use port 8001
```

**Module not found errors:**
- Make sure virtual environment is activated
- Reinstall: `pip install -r requirements.txt`

### Frontend Issues:

**Cannot connect to backend:**
- Make sure backend is running
- Check API URL matches your setup (localhost vs IP address)
- For physical device: Ensure phone and computer are on same WiFi
- Check firewall isn't blocking port 8000

**Camera not working:**
- Grant camera permissions in device settings
- For web: Camera doesn't work in browser, use mobile device/emulator

**npm install fails:**
- Try: `npm install --legacy-peer-deps`
- Or: Delete `node_modules` and `package-lock.json`, then reinstall

**Expo start fails:**
- Clear cache: `npx expo start -c`
- Update Expo: `npm install -g expo-cli@latest`

### Network Issues:

**Finding your IP address:**
- **Windows**: Open CMD, type `ipconfig`, look for "IPv4 Address"
- **Mac**: Open Terminal, type `ifconfig | grep "inet "`, look for your local network IP
- **Linux**: Open Terminal, type `hostname -I` or `ip addr show`

**Testing backend connection:**
- Open browser on your phone/emulator
- Go to: `http://YOUR_BACKEND_URL:8000/docs`
- If you see Swagger UI, connection works!

---

## Quick Start Commands Summary

**Terminal 1 (Backend):**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
# Update API URLs in CameraScreen.js and DetailsScreen.js
npm start
```

---

## Development Tips

1. **Backend auto-reloads** when you change `main.py` (thanks to `--reload` flag)
2. **Frontend hot-reloads** automatically when you save files
3. **Check backend logs** in Terminal 1 to see API requests
4. **Use Swagger UI** (`http://localhost:8000/docs`) to test API endpoints manually
5. **Expo DevTools** open automatically in browser - useful for debugging

---

## Next Steps

Once everything is running:
- Test the `/scan` endpoint with different images
- Try the `/nearby` endpoint with different coordinates
- Customize the artifact database in `backend/main.py`
- Add more features to the frontend screens

Happy coding! 🚀

