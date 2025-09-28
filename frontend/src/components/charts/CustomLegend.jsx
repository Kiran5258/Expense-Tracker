import React from 'react';

function CustomLegend({ payload }) {
  return (
    <div className='flex flex-wrap justify-center gap-4 mt-4'>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className='flex items-center space-x-2'>
          <div
            className='w-3 h-3 rounded-full'
            style={{ backgroundColor: entry.color }}
          />
          <span className='text-xs text-gray-600 font-medium'>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CustomLegend;
