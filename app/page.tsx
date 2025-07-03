'use client';

// React Hooks
import { useEffect, useMemo, useRef, useState } from 'react';

// Next.js Hooks
import { useTheme } from 'next-themes';

// React Map GL
import Map, {
  ViewStateChangeEvent,
  Marker as MarkerContainer,
  MapRef,
} from 'react-map-gl/mapbox';

// Supercluster
import Supercluster from 'supercluster';

// `Marker` Component
import { Marker } from './components/Marker';

// `ModeToggle` Component
import { ModeToggle } from '@/components/mode-toggle';

// UI Components
import { Button } from '@/components/ui/button';

const LIGHT_STYLE = 'mapbox://styles/mapbox/streets-v11';
const DARK_STYLE = 'mapbox://styles/mapbox/dark-v10';

const COORDINATES = [-77.03392, 38.900028];

// Helper function to generate fake points
const points = Array.from({ length: 100 }, (_, i) => ({
  type: 'Feature',
  properties: { id: i },
  geometry: {
    type: 'Point',
    coordinates: [
      COORDINATES[0] + (Math.random() - 0.5) * 0.1,
      COORDINATES[1] + (Math.random() - 0.5) * 0.1,
    ],
  },
}));

export default function Home() {
  // Set theme
  const { resolvedTheme } = useTheme();

  // Set map style
  const [mapStyle, setMapStyle] = useState(LIGHT_STYLE);

  // Set map reference
  const mapRef = useRef<MapRef | null>(null);

  // Set view state
  const [viewState, setViewState] = useState({
    longitude: COORDINATES[0],
    latitude: COORDINATES[1],
    zoom: 10,
  });

  // Set bounds
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);

  // Set map style
  useEffect(() => {
    setMapStyle(resolvedTheme === 'dark' ? DARK_STYLE : LIGHT_STYLE);
  }, [resolvedTheme]);

  // Handle map move
  const handleMove = (evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  };

  // Handle map move end
  const handleMoveEnd = () => {
    if (!mapRef.current) return;
    const b = mapRef.current.getBounds();
    if (!b) return;
    setBounds([
      b.getWest(),
      b.getSouth(),
      b.getEast(),
      b.getNorth(),
    ]);
  };

  // Set supercluster
  const supercluster = useMemo(() => {
    const cluster = new Supercluster({
      radius: 20,
      maxZoom: 14,
    });
    cluster.load(points as any);
    return cluster;
  }, []);

  // Set clusters
  const clusters = useMemo(() => {
    if (!bounds) return [];
    return supercluster.getClusters(bounds, Math.round(viewState.zoom));
  }, [bounds, supercluster, viewState.zoom]);

  return (
    <>
      <div className="fixed top-4 right-4 z-50 bg-card rounded-lg">
        <ModeToggle />
      </div>
      <div className="w-full h-screen">
        <Map
          ref={mapRef}
          {...viewState}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle={mapStyle}
          style={{ width: '100%', height: '100%' }}
          onMove={handleMove}
          onMoveEnd={handleMoveEnd}
        >
          {clusters.map((cluster: any) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const isCluster = cluster.properties.cluster;

            if (isCluster) {
              return (
                <MarkerContainer
                  key={`cluster-${cluster.id}`}
                  longitude={longitude}
                  latitude={latitude}
                >
                  <Button
                    size="icon"
                    className=" size-6 rounded-full bg-blue-600 text-white text-xs font-medium hover:bg-blue-400"
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      setViewState((vs) => ({
                        ...vs,
                        longitude,
                        latitude,
                        zoom: expansionZoom,
                      }));
                    }}
                  >
                    {cluster.properties.point_count_abbreviated}
                  </Button>
                </MarkerContainer>
              );
            }

            return (
              <MarkerContainer
                key={`marker-${cluster.properties.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <Marker longitude={longitude} latitude={latitude} />
              </MarkerContainer>
            );
          })}
        </Map>
      </div>
    </>
  );
}
