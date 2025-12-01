import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const API_BASE_URL = 'http://192.168.31.235:8001'; // Change to your backend URL

export default function DetailsScreen({ route, navigation }) {
  const { artifactId, userX, userY } = route.params;
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtifact();
  }, []);

  const fetchArtifact = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/artifact/${artifactId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch artifact');
      }
      const data = await response.json();
      setArtifact(data);
    } catch (error) {
      console.error('Error fetching artifact:', error);
      Alert.alert('Error', 'Failed to load artifact details.');
    } finally {
      setLoading(false);
    }
  };

  const handleView3D = () => {
    if (artifact && artifact['3d_model_url']) {
      navigation.navigate('ModelView', {
        modelUrl: artifact['3d_model_url'],
      });
    } else {
      Alert.alert('Error', '3D model URL not available.');
    }
  };

  // Normalize coordinates to fit in 300x300 box
  // Assuming coordinates range from 0-50 for both x and y
  const MAX_COORD = 50;
  const MAP_SIZE = 300;
  const normalizedX = (userX / MAX_COORD) * MAP_SIZE;
  const normalizedY = (userY / MAX_COORD) * MAP_SIZE;

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!artifact) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Artifact not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{artifact.name}</Text>
        <Text style={styles.description}>{artifact.description}</Text>
        
        <View style={styles.mapContainer}>
          <Text style={styles.mapLabel}>Location Map</Text>
          <Svg width={MAP_SIZE} height={MAP_SIZE} style={styles.map}>
            {/* Grid lines for reference */}
            {Array.from({ length: 5 }).map((_, i) => (
              <React.Fragment key={i}>
                <Line
                  x1={(i + 1) * (MAP_SIZE / 5)}
                  y1="0"
                  x2={(i + 1) * (MAP_SIZE / 5)}
                  y2={MAP_SIZE}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
                <Line
                  x1="0"
                  y1={(i + 1) * (MAP_SIZE / 5)}
                  x2={MAP_SIZE}
                  y2={(i + 1) * (MAP_SIZE / 5)}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
              </React.Fragment>
            ))}
            
            {/* User location - Red dot */}
            <Circle
              cx={normalizedX}
              cy={normalizedY}
              r="8"
              fill="#ff0000"
            />
          </Svg>
          <Text style={styles.coordinates}>
            Position: ({userX.toFixed(1)}, {userY.toFixed(1)})
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleView3D}>
          <Text style={styles.buttonText}>View 3D Model</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  mapContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  mapLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  map: {
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  coordinates: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

