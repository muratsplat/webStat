/**
 * Simple Logger Class 
 */
class Logger {
	
	/**
	 * Constructor
	 *
	 * @param window.console
	 */
	constructor(cons) {

		this.cons = cons;
	}

	/**
	 * To send error mesage to console
	 * 
	 * @param mixed
	 */
	sendError(message) {

		this.cons.error(message);
	}

	/**
	 * To send info message to console
	 * 
	 * @param mixed
	 * @return void
	 */
	sendInfo(message) {

		this.cons.info(message);
	}

	/**
	 * To send log message to console
	 * 
	 * @param mixed
	 * @return void
	 */
	sendLog(message) {

		this.cons.log(message);
	}
}

module.exports = Logger;
