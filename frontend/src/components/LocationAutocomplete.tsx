'use client';

import React, { useEffect, useState } from 'react';

console.log("Loaded env key:", process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY);

export default function LocationAutocomplete({
  value,
  onChange,
}: {
  value: string;
  onChange: (newVal: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [input, setInput] = useState(value);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (input.length < 3) return;

      const fetchSuggestions = async () => {
        try {
          const res = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
              input
            )}&limit=5&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
          );
          const data = await res.json();

          console.log('Geoapify raw response:', data); // Debug log

          if (!data.features || !Array.isArray(data.features)) {
            console.warn('⚠️ No features returned from Geoapify', data);
            setSuggestions([]);
            return;
          }

          const formatted = data.features.map(
            (feat: any) => feat.properties.formatted
          );
          setSuggestions(formatted);
        } catch (err) {
          console.error('Autocomplete error:', err);
          setSuggestions([]);
        }
      };

      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [input]);

  const handleSelect = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
    onChange(suggestion);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Location"
        className="w-full border p-2 rounded text-black"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 max-h-40 overflow-y-auto shadow-md rounded text-black">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(s)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
