/**
 * Test file SocketCon module
 */

import SocketCon from '../../modules/socketcon.js';


describe('SocketCon Simmple Test', () => {

	var console, driver, hostname, port, path, connection, webdrive;
	
	beforeEach(() => {

		console= {

			error	: (msg) => {},
			info	: (msg) => {},
			log		: (msg) => {},	
		};			

	});
	   	
	it('Simple Constructor Test', () => {
	
		connection  = new SocketCon(console);
	});
	
	it('Not enough args for the constructor', () => {
	
		connection  = new SocketCon(console,driver, hostname, port, path );

		expect(connection.getReadyState()).toBe(null);
		//expect(connection.isClosed()).toBe(false);
		
   });




});
