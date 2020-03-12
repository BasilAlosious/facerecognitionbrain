import React from 'react';
import './FaceRecognition.css';

const FaceRecognition= ({box,imageurl}) => {
	return(
		<div className='center ma'>
		<div className='absolute mt2'>
		<img id='inputimage'alt='not available' src={imageurl} width='500px' height='auto'/>
		<div className='bounding-box'style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right:box.rightCol}}></div>
		</div>
		</div>
		);
}

export default FaceRecognition;