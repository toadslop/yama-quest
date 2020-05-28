import React from 'react';
import ListNameHeader from '../containers/ListNameHeader'
import MountainsSidebar from '../containers/MountainsSidebar'
import MountainMap from '../containers/MountainMap'
import Navbar from '../containers/Navbar'

const App = () => {
  return (
    <div className="box">
    <Navbar mobileClass="top-nav" />
      <ListNameHeader />
      <div className="list-app-container">
        <MountainsSidebar />
        <MountainMap />
      </div>
    <Navbar mobileClass="bottom-nav" />
    </div>
  );
};

export default App;