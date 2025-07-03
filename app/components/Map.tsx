'use client';

// Mapbox
import mapboxgl from 'mapbox-gl';

// React Hooks
import { useEffect, useRef, useState } from 'react';

// Next.js Hooks
import { useTheme } from 'next-themes';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const LIGHT_STYLE = 'mapbox://styles/mapbox/streets-v11';
const DARK_STYLE = 'mapbox://styles/mapbox/dark-v10';

const Map = () => {
  // References
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // Theme
  const { resolvedTheme } = useTheme();
  const [style, setStyle] = useState<string>(LIGHT_STYLE);

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setStyle(DARK_STYLE);
    } else {
      setStyle(LIGHT_STYLE);
    }
  }, [resolvedTheme]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.setStyle(style);
    } else {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: style,
        center: [
          -77.033920, // Longitude
          38.900028 // Latitude
        ],
        zoom: 12,
      });
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [style]);

  return <div ref={mapContainerRef} className="w-full h-screen" />;
};

export default Map;
