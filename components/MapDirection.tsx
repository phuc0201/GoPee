import { Coordinates, Location } from "@/models/location.model";
import { getRoute } from "@/services/geolocation.service";
import polyline from "@mapbox/polyline";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import MapView, {
  LatLng,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";

interface MapDirectionProps {
  pickupLocation?: Location;
  dropoffLocation?: Location;
  hasDriverAccepted?: boolean;
  driverCoords?: Coordinates;
}

export default function MapDirection({
  pickupLocation,
  dropoffLocation,
  hasDriverAccepted,
  driverCoords,
}: MapDirectionProps) {
  const mapRef = useRef<MapView>(null);
  const screen = Dimensions.get("window");
  const [animatedRouteCoords, setAnimatedRouteCoords] = useState<LatLng[]>([]);

  const initialRegion = {
    latitude: pickupLocation?.coordinates.lat ?? 10.7485,
    longitude: pickupLocation?.coordinates.lng ?? 106.6265,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const createRouting = async (origin: LatLng, destination: LatLng) => {
    try {
      const json = await getRoute(origin, destination);

      if (json && json.routes && json.routes[0]) {
        const path = json.routes[0].overview_polyline.points;
        const decoded = polyline.decode(path);

        const coords = decoded.map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));

        setAnimatedRouteCoords([]);

        animateRoute(coords);

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
    }
  };

  const animateRoute = (coords: LatLng[]) => {
    let index = 0;
    const BATCH_SIZE = 5;

    const draw = () => {
      if (index < coords.length) {
        const nextBatch = coords.slice(index, index + BATCH_SIZE);
        setAnimatedRouteCoords((prev) => [...prev, ...nextBatch]);
        index += BATCH_SIZE;

        requestAnimationFrame(draw);
      }
    };

    requestAnimationFrame(draw);
  };

  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      const origin = {
        latitude: pickupLocation.coordinates.lat,
        longitude: pickupLocation.coordinates.lng,
      };
      const destination = {
        latitude: dropoffLocation.coordinates.lat,
        longitude: dropoffLocation.coordinates.lng,
      };

      // createRouting(origin, destination);
    }
  }, [pickupLocation, dropoffLocation]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        region={initialRegion}
      >
        {pickupLocation && (
          <Marker
            coordinate={{
              latitude: pickupLocation.coordinates.lat,
              longitude: pickupLocation.coordinates.lng,
            }}
            title="Điểm đón"
            pinColor="green"
            image={require("../assets/images/location-v3.png")}
          />
        )}

        {dropoffLocation && (
          <Marker
            coordinate={{
              latitude: dropoffLocation.coordinates.lat,
              longitude: dropoffLocation.coordinates.lng,
            }}
            title="Điểm đến"
            pinColor="red"
            image={require("../assets/images/location.png")}
          />
        )}

        {hasDriverAccepted && driverCoords && (
          <Marker
            coordinate={{
              latitude: driverCoords.lat,
              longitude: driverCoords.lng,
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                objectFit: "contain",
              }}
              source={require("../assets/images/vehicle/motorbike.png")}
            ></Image>
          </Marker>
        )}

        {animatedRouteCoords.length > 0 && (
          <Polyline
            coordinates={animatedRouteCoords}
            strokeColor="#3A5DFB"
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  );
}
