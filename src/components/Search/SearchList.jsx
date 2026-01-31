import React, { useState } from 'react';

const DATA = [
  "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"
];

const HighlightedText = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() 
          ? <span key={i} className="bg-yellow-300 font-bold rounded-sm px-0.5">{part}</span> 
          : part
      )}
    </span>
  );
};

const SearchList = () => {
  const [query, setQuery] = useState('');

  const filteredData = DATA.filter(item => 
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Live Search</h2>
      
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search fruits..."
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 ring-blue-500 outline-none"
      />

      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>Results found: {filteredData.length}</span>
      </div>

      <ul className="border rounded-lg divide-y">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <li key={index} className="p-3 hover:bg-gray-50">
              <HighlightedText text={item} highlight={query} />
            </li>
          ))
        ) : (
          <li className="p-3 text-gray-500 text-center">No results found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchList;