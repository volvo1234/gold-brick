import React from 'react';

const raptorStyle = {
  display: 'block',
  background: 'url(/images/Powered_by_BHN.png) no-repeat center center',
  backgroundSize: 'contain',
  width: '200px',
  height: '60px',
}

const RaptorLogo = () => (
    <div>
      <span style={raptorStyle} />
    </div>
);

export default RaptorLogo;