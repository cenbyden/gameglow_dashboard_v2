import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../navigation/NavBar';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark">
      <div className="min-h-screen pb-20">
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
};

export default AppLayout;
