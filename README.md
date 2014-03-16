THREE.LeapMotion
================

Interface adapter for the LeapMotion to make it easier to work with inside of THREE.JS


```javascript

var leap = new THREE.LeapMotion();

leap.registerEventHandler(
	THREE.LeapMotion.Events.HAND_CLOSED,
	function ( frame ) {
		document.body.innerHTML = "HAND_CLOSED";
	}
);

leap.registerEventHandler(
	THREE.LeapMotion.Events.HAND_UPDSIDE_DOWN,
	function ( frame ) {
		document.body.innerHTML = "HAND_UPDSIDE_DOWN";
	}
);

leap.registerEventHandler(
	THREE.LeapMotion.Events.HAND_PUSHING_SCREEN,
	function ( frame ) {
		document.body.innerHTML = "HAND_PUSHING_SCREEN";
	}
);

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