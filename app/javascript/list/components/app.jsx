import React from 'react';
import ListNameHeader from '../containers/ListNameHeader'
import MountainsSidebar from '../containers/MountainsSidebar'
import MountainMap from '../containers/MountainMap'

const App = () => {
  return (
    <div className="box">
      <ListNameHeader />
      <div className="list-app-container">
        <MountainsSidebar />
        <MountainMap />
      </div>
    </div>
  );
};

export default App;