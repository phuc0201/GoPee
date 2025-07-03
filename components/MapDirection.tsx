import { Location } from "@/models/location.model";
import { getRoute } from "@/services/geolocation.service";
import polyline from "@mapbox/polyline";
import { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import MapView, {
  LatLng,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";

interface MapDirectionProps {
  pickupLocation?: Location;
  dropoffLocation?: Location;
}

export default function MapDirection({
  pickupLocation,
  dropoffLocation,
}: MapDirectionProps) {
  const mapRef = useRef<MapView>(null);
  const screen = Dimensions.get("window");

  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const initialRegion = {
    latitude: pickupLocation?.coordinates.latitude ?? 10.7485,
    longitude: pickupLocation?.coordinates.longitude ?? 106.6265,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const createRouting = async (origin: LatLng, destination: LatLng) => {
    try {
      setLoadingRoute(true);
      const json = await getRoute(origin, destination);

      if (json && json.routes && json.routes[0]) {
        const path = json.routes[0].overview_polyline.points;

        const decoded = polyline.decode(path);

        const coords = decoded.map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));

        setRouteCoords(coords);

        if (mapRef.current) {
          mapRef.current.fitToCoordinates(coords, {
            edgePadding: {
              top: screen.height * 0.3,
              right: 50,
              bottom: screen.height * 0.4,
              left: 50,
            },
            animated: true,
          });
        }
      }
    } catch (error) {
      console.error("Lỗi khi gọi Goong Directions API:", error);
    } finally {
      setLoadingRoute(false);
    }
  };

  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      const origin = {
        latitude: pickupLocation.coordinates.latitude,
        longitude: pickupLocation.coordinates.longitude,
      };
      const destination = {
        latitude: dropoffLocation.coordinates.latitude,
        longitude: dropoffLocation.coordinates.longitude,
      };

      createRouting(origin, destination);
    }
  }, [pickupLocation, dropoffLocation]);

  return (
    <View
      style={{ flex: 1, marginBottom: -Dimensions.get("window").height * 0.8 }}
    >
      <MapView
        ref={mapRef}
        style={{
          flex: 1,
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        {pickupLocation && (
          <Marker
            coordinate={{
              latitude: pickupLocation.coordinates.latitude,
              longitude: pickupLocation.coordinates.longitude,
            }}
            title="Điểm đón"
            pinColor="green"
            image={require("../assets/images/location.png")}
          />
        )}

        {dropoffLocation && (
          <Marker
            coordinate={{
              latitude: dropoffLocation.coordinates.latitude,
              longitude: dropoffLocation.coordinates.longitude,
            }}
            title="Điểm đến"
            pinColor="red"
            image={require("../assets/images/location-v3.png")}
          />
        )}

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#06B151"
            strokeWidth={3}
          />
        )}
      </MapView>
    </View>
  );
}
