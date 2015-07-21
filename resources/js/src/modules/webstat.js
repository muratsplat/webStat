
import Log			from './logger';
import SocketCon	from './socketcon';


/**
 * WebStat Class
 */
class WebStat extends Log {

	/**
	 * Constructor
	 *
	 * @param {Window.Cosole}
	 * @param {SocketCon}
	 * @param {EventEmitter2}
	 */
	constructor(console, connection, eventServer) {

		super(console);

		this.setConnecton(connection);

		this.setEventServer(eventServer);
	}

	/**
	 * To set connection object
	 * 
	 * @param {Object}
	 * @return void
	 */
	setConnecton(connection) {

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
}

module.exports = WebStat;
