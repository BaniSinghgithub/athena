# Museum Artifact Scanner - Backend

FastAPI backend for the Museum Artifact Scanner app.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `POST /scan` - Accepts an image file and returns artifact ID and coordinates
- `GET /nearby?user_x=<x>&user_y=<y>` - Returns 3 nearby artifacts
- `GET /artifact/{artifact_id}` - Returns a specific artifact by ID

## Testing

You can test the API using:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

