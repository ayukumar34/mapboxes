'use client';

// Next
import dynamic from 'next/dynamic';

// Components
const Map = dynamic(() => import('@/app/components/Map'), { ssr: false });
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50 bg-white dark:bg-card rounded-lg shadow-lg p-1">
        <ModeToggle />
      </div>
      <Map />
    </>
  );
}
