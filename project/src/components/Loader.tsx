// Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <span className="relative inline-block w-8 h-8 rounded-full bg-transparent animate-fill">
      <span className="absolute inset-0 w-full h-full rounded-full left-12 top-0 animate-fill"></span>
      <span className="absolute inset-0 w-full h-full rounded-full right-12 top-0 animate-fill"></span>
    </span>
  );
};

export default Loader;
