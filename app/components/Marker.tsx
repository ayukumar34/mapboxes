'use client';

// UI Components
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface MarkerProps {
  longitude: number;
  latitude: number;
}

export function Marker({ longitude, latitude }: MarkerProps) {
  // Helper function to format coordinates
  const formatCoordinate = (coord: number, type: 'lat' | 'lng') => {
    const direction = type === 'lat' ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
    return `${Math.abs(coord).toFixed(6)}° ${direction}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="relative size-4 bg-blue-600 hover:bg-blue-400 dark:hover:bg-blue-400 rounded-full p-0"
          variant="ghost"
        >
          <span className="absolute inset-0 rounded-full bg-blue-400 hover:bg-blue-400 dark:hover:bg-blue-400 opacity-75 animate-ping" />
          <span className="absolute w-2 h-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-400 dark:bg-blue-400 dark:hover:bg-blue-600 border-2 border-white rounded-full z-10" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 rounded-xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium text-lg text-foreground">Marker</h3>
          </div>

          <div className="space-y-2 mb-1">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Latitude</span>
                <span className="font-mono text-sm font-semibold text-blue-700 dark:text-blue-300">
                  {formatCoordinate(latitude, 'lat')}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Longitude</span>
                <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {formatCoordinate(longitude, 'lng')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
