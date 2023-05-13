import React from 'react';
import NewBook from '../newly-created/NewBook';

const Sidebar = () => {
  return (
    <div className='sidebar' style={{ background: '#ccc' }}>
      <NewBook />
    </div>
  );
};

export default Sidebar;
