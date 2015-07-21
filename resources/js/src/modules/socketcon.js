import Logger from './logger';


/**
 * Simple Connection Class 
 * 
 * This class creates websocket connection to connect to server side in real-time
 */
class SocketCon extends Logger {
	
	/**
	 * Constructor
	 *
	 * @param {window.Console} 
	 * @param {WebSocket}
	 * @param {String}
	 * @param {String} host name
	 * @param {String} port number 
	 * @param {String} protocol name
	 */
	constructor(console, driver, hostname, port, path, events) {
		
		super(console);			
		
		this.hostname	= hostname || 'localhost';
		this.port		= port || 80;
		this.path		= path || 'ws';
		this.driver		= driver || {} ;
		
		// connection to server side
		this.makeConnection();

		this.events		= events;
	}
	
	/**
	 * To connect to server via native websocket 
	 *
	 * @return void
	 */
	makeConnection() {

		var args = this.getConnectionArgs();
		
		try {
			
			this.connection = new this.driver(args);
			
			this.addsDefaultEventOnConnection();

		} catch(Error) {

			super.sendError('Connection is not estabished! ' + Error);
		}
	}
	
	/**
	 * To adds default event on current connection
	 *
	 * @return void
	 */
	addsDefaultEventOnConnection() {

		this.connection.onerror		= () => {
		   
			super.sendError('The connection is broken');
		};

		this.connection.onopen		= () =>  {
		   
			super.sendInfo('The connection is established..'); 
		};

		this.connection.onmessage	= (e) => {

			var jsonObj		= JSON.parse(e.data);

			var fireName	= 'stat.' + jsonObj.Name;

			this.fireEventOnEventServer(fireName, jsonObj.Value);
		};	
	}
	
	/**
	 * To get connection parameters
	 * @return String
	 */
	getConnectionArgs() {

		return 'ws://' + this.hostname + ":" + this.port + "/" + this.path;
	}

	/**
	 * To get the readyState property of injected websocket object
	 *
	 * @return int
	 */
	getReadyState() {

		if (typeof this.connection === 'undefined') {

			return null;
		}

		return this.connection.readyState;
	}

	/**
	 * To determine current connection is live
	 *
	 * @return bool
	 */
	isLive() {

		var state = this.getReadyState();
		
		return 1 === state;
	}

	/**
	 * To determine current connection is closed
	 *
	 * @return bool
	 */
	isClosed() {

		return ! this.isLive();
	}

	/**
	 * Add Event to event server
	 *
	 * @param {String||Array}	event
	 * @param {Object}			obj
	 */ 
	addEventOnEventServer(event, obj) {

		if(event.isArray()) {

			this.events.many(event,obj);
			
			return;
		}

		this.events.on(event, obj);
	}

	/**
	 * To fire event
	 *
	 * @param {String|Array}	e
	 * @param {Object}			data
	 */
	fireEventOnEventServer(e, data) {

		if (this.events  === null || typeof this.events === 'undefined') {

			throw new Error('It looks EventEmitter2 server is not injected this object');

		}

		this.events.emit(e, data);
	}

	


}

module.exports = SocketCon;
