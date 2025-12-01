from fastapi import FastAPI, File, UploadFile, Query
from fastapi.middleware.cors import CORSMiddleware
import random
import math

app = FastAPI()

# Enable CORS for React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database of artifacts
artifacts_db = [
    {
        "id": 1,
        "name": "Ancient Egyptian Scarab",
        "description": "A beautifully carved scarab beetle from ancient Egypt, symbolizing rebirth and protection.",
        "3d_model_url": "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        "x_coord": 10.5,
        "y_coord": 15.3
    },
    {
        "id": 2,
        "name": "Roman Coin Collection",
        "description": "A collection of Roman coins from the 2nd century AD, featuring various emperors.",
        "3d_model_url": "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        "x_coord": 25.7,
        "y_coord": 8.2
    },
    {
        "id": 3,
        "name": "Greek Vase",
        "description": "An ornate Greek amphora depicting scenes from mythology.",
        "3d_model_url": "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        "x_coord": 12.1,
        "y_coord": 20.8
    },
    {
        "id": 4,
        "name": "Medieval Sword",
        "description": "A well-preserved medieval longsword from the 14th century.",
        "3d_model_url": "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        "x_coord": 18.9,
        "y_coord": 12.4
    },
    {
        "id": 5,
        "name": "Mayan Calendar Stone",
        "description": "A replica of the famous Aztec calendar stone with intricate carvings.",
        "3d_model_url": "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        "x_coord": 30.2,
        "y_coord": 18.6
    },
    {
        "id": 6,
        "name": "Chinese Terracotta Warrior",
        "description": "A miniature replica of the famous terracotta warriors from Xi'an.",
        "3d_model_url": "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        "x_coord": 5.3,
        "y_coord": 25.1
    }
]

def calculate_distance(x1, y1, x2, y2):
    """Calculate Euclidean distance between two points"""
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

@app.get("/")
def read_root():
    return {"message": "Museum Artifact Scanner API"}

@app.post("/scan")
async def scan_artifact(file: UploadFile = File(...)):
    """
    Accepts an image file and returns a random artifact ID and coordinates.
    In a real implementation, this would use AI to identify the artifact.
    """
    # Mock AI processing - just return a random artifact
    random_artifact = random.choice(artifacts_db)
    
    return {
        "artifact_id": random_artifact["id"],
        "x": random_artifact["x_coord"],
        "y": random_artifact["y_coord"]
    }

@app.get("/nearby")
async def get_nearby_artifacts(
    user_x: float = Query(..., description="User's X coordinate"),
    user_y: float = Query(..., description="User's Y coordinate")
):
    """
    Returns a list of 3 artifacts that are mathematically close to the user's coordinates.
    """
    # Calculate distances from user to all artifacts
    artifacts_with_distance = []
    for artifact in artifacts_db:
        distance = calculate_distance(
            user_x, user_y,
            artifact["x_coord"], artifact["y_coord"]
        )
        artifacts_with_distance.append({
            **artifact,
            "distance": distance
        })
    
    # Sort by distance and return the 3 closest
    artifacts_with_distance.sort(key=lambda x: x["distance"])
    nearby_artifacts = artifacts_with_distance[:3]
    
    # Remove the distance field from the response
    for artifact in nearby_artifacts:
        artifact.pop("distance", None)
    
    return {
        "artifacts": nearby_artifacts
    }

@app.get("/artifact/{artifact_id}")
async def get_artifact(artifact_id: int):
    """
    Get a specific artifact by ID.
    """
    artifact = next((a for a in artifacts_db if a["id"] == artifact_id), None)
    if artifact is None:
        return {"error": "Artifact not found"}
    return artifact

