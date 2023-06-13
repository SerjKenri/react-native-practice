import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (route.params) {
            setMarker(route.params.photoLocation);
        }
    }, [route.params]);

    if (!marker) {
        return;
    }
    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                region={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.006,
                }}
                mapType="standard"
                minZoomLevel={15}
                onMapReady={() => console.log('Map is ready')}
                onRegionChange={() => console.log('Region change')}
            >
                <Marker
                    title={route.params.regionName}
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.006,
                    }}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default MapScreen;
