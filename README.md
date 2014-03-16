THREE.LeapMotion
================

Interface adapter for the LeapMotion to make it easier to work with inside of THREE.JS

### Events
* HAND_CLOSED
* HAND_UPDSIDE_DOWN
* HAND_PUSHING_SCREEN
* NOTHING_TO_TRACK
* HAND_OPEN
* TRACKABLE_OBJECT_CAME_INTO_VIEW
* HAND_STOPPED_PUSHING_SCREEN
* TRACKABLE_OBJECT_LEFT_VIEW
* HAND_STARTED_PUSHING_SCREEN

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
