//tweenLite.js 

init = function(){
	var canvas, context, events, toRadian, toAngle, i;
	canvas = document.getElementById( 'stage' );
	context = canvas.getContext( '2d' );
	events = ['click', 'mousedown', 'mouseup', 'mouseover', 'mouseout']; //custom event
	toRadian = Math.PI/180;
	toAngle = 180/Math.PI;
	function EVENT( $e ){
		var event, i;
		event = Stage.events[$e.type];
		i = event.length;
		while( i-- ) event[i]( $e );
	}
	i = events.length;
	while( i-- ) canvas.addEventListener( events[i], EVENT ); //이벤트 위임.
	
	function bitmapRender(){
		var i, j, k, l;
		if( !this.visible )return;
		context.save();
		context.globalAlpha = this.alpha;
		context.translate( this.x, this.y );
		k = this.rotate;
		if( k ){
			i = this.pivotX, j = this.pivotY;
			l = i | j;
			if( l ) context.translate( i, j );
			context.rotate( toRadian * k );
			if( l ) context.translate( -i, -j );
		}
		context.drawImage( this.src, 0, 0, this.width, this.height );
		context.restore();
	}
	function bitmapSet(){
		var i, j, key, val;
		i = 0, j = arguments.length;
		while( i < j ){
			key = arguments[i++];
			val = arguments[i++];
			switch( key ){
			case'px':case'pivotX':
				switch( val ){
				case'c':case'center': this.pivotX = this.width * .5; break;
				case'r':case'right': this.pivotX = this.width; break;
				default: this.pivotX = val;
				}
				break;
			case'py':case'pivotY':
				switch( val ){
				case'c':case'center': this.pivotY = this.height * .5; break;
				case'b':case'bottom': this.pivotY = this.height; break;
				default: this.pivotY = val;
				}
				break;
			case'w': this.width = val; break;
			case'h': this.height = val; break;
			default: this[key] = val;
			}
		}
		return this;
	}
	function Bitmap( $img, $width, $height ){
		return {
			visible:1, alpha:1, rotate:0, pivotX:0, pivotY:0,
			x:0, y:0, width:$width, height:$height,
			src:$img,
			render: bitmapRender, set: bitmapSet
		};
	}
	var Stage = {
		children:[],
		width: 700,
		height: 500,
		render: function(){
			var i, j, children;
			context.clearRect( 0, 0, Stage.width, Stage.height );
			children = Stage.children;
			for( i = 0, j = children.length ; i < j ; i++ ) children[i].render();
		},
		addChild: function( $child ){
			this.children.push( $child );
		},
		_intervalKey: null,
		start: function(){
			if( !this._intervalKey ) this._intervalKey = setInterval( Stage.render, 1 ); 
			//함수를 감쌓지 않은건 비용을 감소하기 위해. 특히 interval, for, loop은 최적화가 매우 중요.
		},
		end: function(){
			if( this._intervalKey ){
				clearInterval( this._intervalKey );
				this._intervalKey = null;
			}
		},
		events:{click:[], mousedown:[], mouseup:[], mouseover:[], mouseout:[]},
		addEventListener: function( $type, $listener ){
			var i, j, events;
			events = this.events[$type];
			i = events.length;
			while( i-- ){
				if( events[i] == $listener ) return;
			}
			events.push( $listener );
		},
		removeEventListener: function( $type, $listener ){
			var i, j, events;
			events = this.events[$type];
			i = events.length;
			while( i-- ){
				if( events[i] == $listener ) return events.splice( i, 1 );
			}
		}
	};
	delete init; //한번호출하면 삭제하면서 메모리에서 제거한다.
	return {Stage:Stage, Bitmap:Bitmap};
};

//----------------------------------------------------------------------
//host code side
