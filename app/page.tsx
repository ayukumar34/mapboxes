'use client';

// Next
import dynamic from 'next/dynamic';

// Components
const Map = dynamic(() => import('@/app/components/Map'), { ssr: false });

export default function Home() {
  return (
    <Map />
  );
}
