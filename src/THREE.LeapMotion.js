THREE.LeapMotion = function () {

	Leap.loop(this.handleLoop.bind(this));

    this.projector   = new THREE.Projector();
	this.isPaused    = false;
	this.handleFrame = function (frame) {
		// NOP - Implementer must override;
	};

};

THREE.LeapMotion.prototype = {

	handleLoop: function ( frame ) {
		
		if (frame.valid && !this.isPaused) {

			var currentFrame = new THREE.LeapMotion.Frame( frame );
			
			this.handleFrame( currentFrame );
			
		}
		
	}

};

THREE.LeapMotion.array3ToVector3 = function ( array ) {
	
	return new THREE.Vector3(
		array[0],
		array[1],
		array[2]
	);
	
};

THREE.LeapMotion.Frame = function ( frame ) {

	this.hands = [];
	
	while ( frame.hands.length ) {
		
		this.hands.push(
			new THREE.LeapMotion.Hand( frame.hands.pop() )
		);
		
	}
	
};

THREE.LeapMotion.Frame.prototype = {

	hasHandsVisible: function () {
		
		return (this.hands.length > 0);
		
	},
	
	hasOneHandVisible: function () {
		
		return (this.hands.length == 1);
		
	},
	
	hasTwoHandsVisible: function () {
		
		return (this.hands.length == 2);
		
	},
	
	getLeftHand: function () {
		
		if ( this.hasTwoHandsVisible() ) {
			
			if ( this.hands[0].x > this.hands[1].x ) {
				
				return this.hands[0];
				
			}
			
			return this.hands[1];
			
		}
		
	},
	
	getRightHand: function () {
		
		if ( this.hasTwoHandsVisible() ) {
		
			if ( this.hands[0].x < this.hands[1].x ) {
				
				return this.hands[0];
				
			}
			
			return this.hands[1];
			
		}
		
	}
	
};

THREE.LeapMotion.Palm = function ( palmNormal, palmPosition, palmVelocity, stabilizedPalmPosition ) {
	
	this.normal             = THREE.LeapMotion.array3ToVector3( palmNormal );
	this.position           = THREE.LeapMotion.array3ToVector3( palmPosition );
	this.stabalizedPosition = THREE.LeapMotion.array3ToVector3( stabilizedPalmPosition );
	this.velocity           = THREE.LeapMotion.array3ToVector3( palmVelocity );
	
};

THREE.LeapMotion.Pointable = function ( pointable ) {
	
	this.direction          = THREE.LeapMotion.array3ToVector3( pointable.direction );
	this.stabilizedPosition = THREE.LeapMotion.array3ToVector3( pointable.stabilizedTipPosition );
	this.position           = THREE.LeapMotion.array3ToVector3( pointable.tipPosition );
	this.speed              = THREE.LeapMotion.array3ToVector3( pointable.tipVelocity );

	this.length             = pointable.length;
	this.width              = pointable.width;
	this.touchDistance      = pointable.touchDistance;
	this.zone               = pointable.touchZone;
	this.timeVisible		= pointable.timeVisible;
	this.isFinger			= !pointable.tool;

	this.tip 				= new THREE.LeapMotion.Tip(
								  pointable.tipPosition,
								  pointable.stabilizedTipPosition,
								  pointable.tipVelocity
							  );

};

THREE.LeapMotion.Tip = function ( position, stabalizedPosition, velocity ) {

	this.position 			= THREE.LeapMotion.array3ToVector3( position );
	this.stabalizedPosition = THREE.LeapMotion.array3ToVector3( stabalizedPosition );
	this.velocity 			= THREE.LeapMotion.array3ToVector3( velocity );
	
};
		  
THREE.LeapMotion.Hand = function (hand) {
	
	this.fingers      = this.processFingers(hand.fingers);
	
	this.sphereCenter = THREE.LeapMotion.array3ToVector3( hand.sphereCenter );
	this.sphereRadius = hand.sphereRadius;
	this.timeVisible  = hand.timeVisible;
	
	this.palm         = new THREE.LeapMotion.Palm(
							hand.palmNormal,
							hand.palmPosition,
							hand.palmVelocity,
							hand.stabilizedPalmPosition
						);
	
};

THREE.LeapMotion.Hand.prototype = {
	
	isClosed: function () {
	
		return ( this.fingers.length == 0 );
		
	},
	
	fingerCount: function () {
		
		return this.fingers.length;
		
	},
	
	pitch: function () {
		
		return this.rawHand.pitch();
		
	},
	
	yaw: function () {
		
		return this.rawHand.yaw();
		
	},
	
	roll: function () {
		
		return this.rawHand.roll();
		
	},
	
	processFingers: function (fingers) {
		
		var results = [];
		
		while ( fingers.length ) {
			
			results.push(
				new THREE.LeapMotion.Pointable( fingers.pop() )
			);
			
		}
		
		return results;
		
	}
	
};
