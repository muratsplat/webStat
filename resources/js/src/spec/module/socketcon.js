/**
 * Test file SocketCon module
 */
import SocketCon from '../../modules/socketcon.js';
import * as EventEmitter  from 'eventemitter2'; 

describe('SocketCon Test', () => {

	var win, path, eventServer, _console;
	
	beforeEach(() => {

		 _console = {
				error	: (msg) => {},
				info	: (msg) => {},
				log		: (msg) => {},
		};

		win = {			
			console: _console,

			location: {
				hostname	: 'localhost',
				port		: '80',
			},

			WebSocket : () => {

				throw new Error('Test');			
			},				
			
		};

	});
	   	
	it('Simple Constructor Test', () => {
		
		var connection  = new SocketCon(win, path, eventServer);
		
		expect(connection.getDriver()).toEqual(win.WebSocket);

		expect(connection.getConnectionArgs()).toEqual('ws://localhost:80/ws');
		
	});
	
	it('With not valid websocket driver', () => {
	
		var connection  = new SocketCon(win, path );

		expect(connection.getReadyState()).toBe(null);
		expect(connection.isClosed()).toBe(true);
		expect(connection.isLive()).toBe(false);	
   });


	it('Simple Event Server Injecting Test' , () => {
				
		var  server = new EventEmitter.EventEmitter2();
		
		var connection  = new SocketCon(win, path, server);

	});


	it('Event Server Firing' , () => {
		
	
		var  server = new EventEmitter.EventEmitter2();

		var spy = {
			
			getFoo : () => {},
		};

		spyOn(spy, 'getFoo');

		server.on('stat.echo', (data) => {
	
			data.getFoo();
		});

		var connection	= new SocketCon(win,  path, server);

		connection.fireEventOnEventServer('stat.echo', spy);

		expect(spy.getFoo).toHaveBeenCalled();

	});

	it('Event Server Firing with invalid event server object' , () => {
		
		var  server = null; // invalid server !!;

		var	connection	= new SocketCon(win, path, server);

		try {
			connection.fireEventOnEventServer('stat.echo', 'test');

			fail('Expects  an exception! ');
		} catch (e) {

		}	

	});

});
