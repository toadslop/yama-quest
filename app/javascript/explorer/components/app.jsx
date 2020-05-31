import React from 'react';
import ListNameHeader from '../containers/ListNameHeader'
import MountainsSidebar from '../containers/MountainsSidebar'
import MountainMap from '../containers/MountainMap'
import Navbar from '../containers/Navbar'

// TODO: Currently, whether mobile style spit top-bottom nav
// renders is handled by CSS. Change this to Javascript.
const App = () => {
  return (
    <div className="box">
    <Navbar mobileClass="top-nav" />
      <ListNameHeader />
      <div className="app-container">
        <MountainsSidebar />
        <MountainMap />
      </div>
    <Navbar mobileClass="bottom-nav" />
    </div>
  );
};

export default App;