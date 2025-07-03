'use client';

// React hooks
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// React Map GL
import Map, { Marker as MarkerContainer, ViewStateChangeEvent } from 'react-map-gl/mapbox';

// UI Components
import { Marker } from './components/Marker';
import { ModeToggle } from '@/components/mode-toggle';

const LIGHT_STYLE = 'mapbox://styles/mapbox/streets-v11';
const DARK_STYLE = 'mapbox://styles/mapbox/dark-v10';

const COORDINATES = [-77.03392, 38.900028];

export default function Home() {
  // Set theme
  const { resolvedTheme } = useTheme();
  const [mapStyle, setMapStyle] = useState(LIGHT_STYLE);

  // Set viewport state
  const [viewState, setViewState] = useState({
    longitude: COORDINATES[0],
    latitude: COORDINATES[1],
    zoom: 12,
  });

  useEffect(() => {
    setMapStyle(resolvedTheme === 'dark' ? DARK_STYLE : LIGHT_STYLE);
  }, [resolvedTheme]);

  const handleMove = (evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50 bg-white dark:bg-card rounded-lg">
        <ModeToggle />
      </div>
      <div className="w-full h-screen">
        <Map
          {...viewState}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle={mapStyle}
          style={{ width: '100%', height: '100%' }}
          onMove={handleMove}
        >
          <MarkerContainer
            longitude={COORDINATES[0]}
            latitude={COORDINATES[1]}
          >
            <Marker />
          </MarkerContainer>
        </Map>
      </div>
    </>
  );
}
