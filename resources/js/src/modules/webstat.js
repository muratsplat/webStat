
import Log			from './logger';
import SocketCon	from './socketcon';


/**
 * WebStat Class
 */
class WebStat extends Log {

	/**
	 * Constructor
	 *
	 * @param {Window}			win
	 * @param {SocketCon}		connection
	 * @param {EventEmitter2}	eventServer
	 */
	constructor(win, connection,  eventServer) {

		super(win.console);

		this.setConnection(connection);

		this.setEventServer(eventServer);
		this.init();
	}

	/**
	 * To set connection object
	 * 
	 * @param {Object}
	 * @return void
	 */
	setConnection(connection) {

		this.con = connection;
	}

	/**
	 * To set Event Server
	 *
	 * @param {EventEmitter2}
	 * @return void
	 */
	setEventServer(server) {

		this.eventServer = server;
	}

	/**
	 * To call Firstly jobs
	 *
	 * @return void
	 */
	init() {

		this.addDefaultListenerOn();
		
		this.renders = [];
	}

	/**
	 * To adds wildcardlistener
	 *
	 * This listener is called by each one of all 'stat.*' events
	 *
	 * @return void
	 */ 
	addDefaultListenerOn() {

		this.addListener('webstat.stats.*', (e) => {
		
			// it likes as JSON 
			// {'Name':'cpu', 'Value': '12'}
			this.callRenders(e.Name, e.Value);
		});

		this.addListener('webstat.connection', (e) => {
			
			/**
			 * WebSocket API
			 * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
			 *
			 * -------------------------------------------------------------
			 * Constant	Value	Description
			 * CONNECTING	0	The connection is not yet open.
			 * OPEN	1	The connection is open and ready to communicate.
			 * CLOSING	2	The connection is in the process of closing.
			 * CLOSED	3	The connection is closed or couldn't be opened.
			 */
			var msg = null;

			switch (e) {

				case 0 : 
					msg = 'Connecting...';
					break;
				case 1 :
					msg	= 'Online';
					break;
				case 2 :
					msg = 'Current connection is closing..';
					break;
				case 3 :
					msg = 'Closed';
					break;
				default:
					msg= 'Unknown';
			}

			var data =  {
				code : e,
				msg  : msg,
			};

			this.callRenders('conStat',data);
		});
	}
	
	/**
	 * To add listener
	 *
	 * @param {String|Array}	listener
	 * @param {Function}		event
	 * @return void
	 */ 
	addListener(listener, event) {

		this.eventServer.on(listener, event);
	}

	/**
	 * To call renders method by given channel 
	 *
	 * @param {String}	channel
	 * @param {Object}	value
	 */ 
	callRenders(channel, value) {

		var chanName	= channel;
		var val			= value;

		var renders = this.getRendersByChannel(chanName);

		for (var i = 0, len = renders.length; i < len; i++) {

			var callback = renders[i].call;

				callback(value);			
		}
	}

	/**
	 * To add reander method by channel name
	 *
	 * @param {String}				channel
	 * @param {Array|callback}		callback or callbacks 
	 * @return void
	 */
	addRenderMethod(channel, callback) {
		
		var name = String(channel);
			
		var render = {
				chan : name,
				call : callback,
		};

		this.renders.push(render);		
	}

	/**
	 * To get number of renders
	 *
	 * @return int
	 */
	getNumberOfRenders() {

		return this.renders.length;
	}

	/**
	 * To delete items by given channel
	 *
	 * @param {String}		channel
	 * @return {Number}
	 */ 
	deleteRendersByChannel(channel) {
		
		var chanName		= channel;
		var old				= this.renders;
		var newCollection	= [];
		var deletedItems	= 0;
		
		for (var i = 0, len = old.length; i < len; i++) {
			
			var item = old[i];

			if (item.chan === chanName) { 
				
				deletedItems++;

				continue; 
			}

			newCollection.push(item);				
		}

		this.renders = newCollection;

		return deletedItems;		
	}
	
	/**
	 * To get renders by channel name
	 *
	 * @param {String}		channel
	 * @return {Array}
	 */
	getRendersByChannel(channel) {
	
		var chanName = channel;

		return this.renders.filter((i) => {
			
			return chanName === i.chan;
		});
	}
}


module.exports = WebStat;
