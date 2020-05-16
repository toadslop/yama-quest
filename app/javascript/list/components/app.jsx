import React from 'react';
import ListNameHeader from '../containers/ListNameHeader'
import MountainsSidebar from '../containers/MountainsSidebar'
import MountainMap from '../containers/MountainMap'
import Navbar from './Navbar'

const App = () => {
  return (
    
    <div className="box">
    <Navbar />
      <ListNameHeader />
      <div className="list-app-container">
        <MountainsSidebar />
        <MountainMap />
      </div>
    </div>
  );
};

export default App;