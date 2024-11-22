// ./src/plugins/my-plugin/admin/plugin-icon.js
import React from 'react';
import mhg from './MHG-logo.svg';


const MyPluginIcon = () => {
  return (
    <img
    src={mhg}
    style={{
      border: '1px solid white',
      width: '3.5rem',
      height: '3.5rem'
    }}
  />
  );
};

export default MyPluginIcon;
