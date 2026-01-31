import React from 'react';

const FilterControls = ({ filter, setFilter }) => {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded capitalize text-sm transition-colors ${
            filter === f
              ? 'bg-blue-100 text-blue-600 font-bold'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterControls;