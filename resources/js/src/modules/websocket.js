import Logger from './logger.js';


/**
 * Simple Connection Class 
 * 
 * This class creates websocket connection to connect to server side in real-time
 */
class Connection extends Logger  {

	/**
	 * Constructor
	 */
	constructor(console, driver, hostname, port, path) {
		
		super(console);
		this.hostname	= hostname || 'localhost';
		this.port		= port || 80;
		this.path		= path || 'ws';
		this.driver		= driver || WebSocket;
		
		// connection to server side
		this.makeConnection();
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
	 */
	addsDefaultEventOnConnection() {

		this.connection.onerror = function() {
		   
			super.sendError('The connection is broken');
		};

		this.connection.onopen	= function() {
		   
			super.sendInfo('The connection is established..'); 
		};
	}
	
	/**
	 * To get connection parameters
	 * @return String
	 */
	getConnectionArgs() {

		return 'ws://' + this.hostname + ":" + this.port + "/" + this.path;
	}
}

module.exports = Connection;
