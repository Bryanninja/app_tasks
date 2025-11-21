import React from 'react';

import Sidebar from '../components/Sidebar';

export default function home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64"></div>
    </div>
  );
}
