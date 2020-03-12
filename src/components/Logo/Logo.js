import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo= () => {
	return(
		<div className='ma4 nt0'>
		<Tilt className="Tilt br2 shadow-2" options={{ max : 75 }} style={{ height: 200, width: 200 }} >
 		<div className="Tilt-inner pa-6">
 		<img style={{paddingTop:'15px'}} src={brain} alt='logo'/>  
 		</div>
		</Tilt>
		</div>
		);
}

export default Logo;