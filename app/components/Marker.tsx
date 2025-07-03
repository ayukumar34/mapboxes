'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function Marker() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="relative w-4 h-4 bg-blue-600 hover:bg-blue-400 rounded-full p-0"
          variant="ghost"
        >
          <span className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping" />
          <span className="absolute w-2 h-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 border-2 border-white rounded-full z-10" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64">
        <div className="text-sm">
          <p className="font-semibold mb-1">Marker</p>
          <p>This is a custom animated marker with a popover.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
