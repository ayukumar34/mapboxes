'use client';

// Mapbox
import mapboxgl from 'mapbox-gl';

// React Hooks
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        -77.033920, // Longitude
        38.900028 // Latitude
      ],
      zoom: 9,
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="w-full h-screen" />;
};

export default Map;
