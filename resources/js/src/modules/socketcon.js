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
	 * @param {window}			win
	 * @param {String}			path 
	 * @param {EventEmitter2}	events
	 */
	constructor(win, path, events) {
		
		super(win.console);

		this._window	= win || {};

		this.path		= path || 'ws';		
		
		// connection to server side
		this.makeConnection();

		this.events		= events;
	}

	/**
	 * To get socket driver
	 *
	 * @return {Object}  the object must implements Standart WebSocket 
	 */
	getDriver() {

		var defSocket = this._window.WebSocket;

		var altSocket = this.socket;

		return  altSocket || defSocket;
	}
	
	/**
	 * To set websocket driver
	 *
	 * @param {Object} websocket driver
	 * @return void
	 */
	setSocketDriver(driver) {

		if (driver === null || typeof driver === 'undefined') {

			throw new TypeError('Invalid argument!');
		}

		this.socket = driver;
	}
	
	/**
	 * To connect to server via native websocket 
	 *
	 * @return void
	 */
	makeConnection() {

		var args	= this.getConnectionArgs();		
		var driver	= this.getDriver();

		try {
			
			this.connection =  new driver(args);
			
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

		var state = this.getReadyState();

		this.connection.onerror		= () => {
		   
			super.sendError('The connection is broken');	
				
			this.fireEventOnEventServer('stat.status', state);
		};

		this.connection.onopen		= () =>  {
		   
			super.sendInfo('The connection is established.');
			
			this.fireEventOnEventServer('stat.status', state);					 
		};

		this.connection.onmessage	= (e) => {

			var jsonObj		= JSON.parse(e.data);

			var fireName	= 'stat.' + jsonObj.Name;

			this.fireEventOnEventServer(fireName, jsonObj);
		};	
	}
	
	/**
	 * To get connection parameters
	 * @return String
	 */
	getConnectionArgs() {

		return 'ws://' + this.getHostname() + ":" + this.getPort() + "/" + this.path;
	}

	/**
	 * To get hostname of current Window object
	 *
	 * @return {String}
	 */
	getHostname() {

		return this._window.location.hostname || 'localhost';
	
	}

	/**
	 * To get port number of current Window Object
	 *
	 * @return {string}
	 */
	getPort() {
		return this._window.location.port || '80';
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
