import React from 'react';
import ListNameHeader from '../containers/ListNameHeader'
import MountainsSidebar from '../containers/MountainsSidebar'

const App = () => {
  return (
    <div className="box">
      <ListNameHeader />
      <div className="list-app-container">
        <MountainsSidebar />
      </div>
    </div>
  );
};

export default App;