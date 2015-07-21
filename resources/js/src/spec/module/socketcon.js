/**
 * Test file SocketCon module
 */

import SocketCon from '../../modules/socketcon.js';
import * as EventEmitter  from 'eventemitter2'; 

describe('SocketCon Simmple Test', () => {

	var console, driver, hostname, port, path, connection, webdrive, eventServer;
	
	beforeEach(() => {

		console= {

			error	: (msg) => {},
			info	: (msg) => {},
			log		: (msg) => {},	
		};				

	});
	   	
	it('Simple Constructor Test', () => {
		
		spyOn(console, 'error');

		connection  = new SocketCon(console);
		// It was no arguments for websocket driver,
		// expecting calling error method to send error message to client
		expect(console.error).toHaveBeenCalled();
	});
	
	it('With not valid websocket driver', () => {
	
		connection  = new SocketCon(console,driver, hostname, port, path );

		expect(connection.getReadyState()).toBe(null);
		expect(connection.isClosed()).toBe(true);
		expect(connection.isLive()).toBe(false);	
   });


	it('Simple Event Server Injecting Test' , () => {
		
		driver = () => {};
		driver.prototype = {

			onerror		: null,
			onopen		: null,
			onmessage	: null,
		};
		
		var  server = new EventEmitter.EventEmitter2();

	});


	it('Event Server Firing' , () => {
		
		driver = () => {};
		driver.prototype = {

			onerror		: null,
			onopen		: null,
			onmessage	: null,
		};
		var  server = new EventEmitter.EventEmitter2();

		var spy = {
			
			getFoo : () => {},
		};

		spyOn(spy, 'getFoo');

		server.on('stat.echo', (data) => {
	
			data.getFoo();
		});

		connection	= new SocketCon(console, driver, hostname, port, path, server);

		connection.fireEventOnEventServer('stat.echo', spy);

		expect(spy.getFoo).toHaveBeenCalled();

	});

	it('Event Server Firing with invalid event server object' , () => {
		
		driver = () => {};
		driver.prototype = {

			onerror		: null,
			onopen		: null,
			onmessage	: null,
		};

		var  server = null; // invalid server !!;

		connection	= new SocketCon(console, driver, hostname, port, path, server);

		try {
			connection.fireEventOnEventServer('stat.echo', 'test');

			fail('Expects  an exception! ');
		} catch (e) {

		}	

	});

});
