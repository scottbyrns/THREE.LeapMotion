THREE.LeapMotion
================

Interface adapter for the LeapMotion to make it easier to work with inside of THREE.JS


```javascript

var leap = new THREE.LeapMotion();
leap.handleFrame = function ( frame ) {

	window.currentFrame = frame;

	if ( frame.hasHandsVisible() ) {
		
		if ( frame.hasTwoHandsVisible() ) {
			
			if ( frame.getLeftHand().isClosed() ) {
				// Left Hand is closed
			}
			
		}
		
	}
	
};


```