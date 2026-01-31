import React, { useState } from 'react';

const MultiProgressBar = () => {
  const [values, setValues] = useState([10, 50, 80]); 

  const updateValue = (index, newValue) => {
    const newValues = [...values];
    newValues[index] = Math.min(100, Math.max(0, Number(newValue)));
    setValues(newValues);
  };

  const addBar = () => setValues([...values, 50]);
  const removeBar = (index) => setValues(values.filter((_, i) => i !== index));

  const total = values.reduce((acc, curr) => acc + curr, 0);
  const average = values.length > 0 ? Math.round(total / values.length) : 0;
  
  const getColor = (val) => {
    if (val < 40) return 'bg-red-500';
    if (val < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dynamic Progress</h2>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm font-bold mb-1">
          <span>Average</span>
          <span>{average}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div 
            className={`h-6 transition-all duration-500 ${getColor(average)}`} 
            style={{ width: `${average}%` }}
          />
        </div>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {values.map((val, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-6 font-mono text-sm text-gray-500">{index + 1}</span>
            <input 
              type="range" min="0" max="100" 
              value={val} 
              onChange={(e) => updateValue(index, e.target.value)}
              className="flex-1 accent-blue-600"
            />
            <span className="w-8 text-sm text-right">{val}%</span>
            <button onClick={() => removeBar(index)} className="text-red-500 text-sm hover:underline">Remove</button>
          </div>
        ))}
      </div>
      
      <button onClick={addBar} className="mt-4 w-full border-2 border-dashed border-gray-300 py-2 rounded text-gray-500 hover:border-blue-500 hover:text-blue-500 transition">
        + Add Input
      </button>
    </div>
  );
};

export default MultiProgressBar;