/**
 * A test file for  WebStat 
 */

import WebStat from '../../modules/webstat.js';

describe('WebStat Class', () => {

	var webstat, 
		win, 
		path, 
		eventServer,
		connection;
		

	beforeEach(() => {
	
		eventServer = {

			on : () => {},
		};

		win = {

			console : {

				error	: null,
				log		: null,
				info	: null,
			},

			WebSocket : () => {

			},		
		};	
	});



	it('Simple Test', () => {
		
		connection = {};	
		spyOn(eventServer, 'on');	
		
		webstat = new WebStat(win, connection, eventServer);

		expect(eventServer.on).toHaveBeenCalled();
	
	});
	
	it('AddRenderMethod test ', () => {

		connection = {};		
		webstat = new WebStat(win, connection, eventServer);

		var callback = () => {};
		
		webstat.addRenderMethod('cpu', callback);
		
		expect(webstat.getNumberOfRenders()).toEqual(1);	
	});
	
	it('getRendersByChannel Test', () => {

		connection = {};		
		webstat = new WebStat(win, connection, eventServer);

		var callback = () => {};
		
		webstat.addRenderMethod('cpu', callback);

		webstat.addRenderMethod('mem', callback);
		
		expect(webstat.getNumberOfRenders()).toEqual(2);

		var results = webstat.getRendersByChannel('cpu');

		expect(results.length).toEqual(1);

	});

	it('deleteRendersByChannel Test', () => {

		connection = {};		
		webstat = new WebStat(win, connection, eventServer);

		var callback = () => {};
		
		webstat.addRenderMethod('cpu', callback);

		webstat.addRenderMethod('mem', callback);
		
		expect(webstat.getNumberOfRenders()).toEqual(2);

		var deleteFirst = webstat.deleteRendersByChannel('cpu');

		expect(deleteFirst).toEqual(1);
		
		expect(webstat.getNumberOfRenders()).toEqual(1);			
			
	});

	it('callRenders Test', () => {

		connection = {};		
		webstat = new WebStat(win, connection, eventServer);
		
		var data = {
			
			getFoo : null,
		};

		spyOn(data, 'getFoo');

		var callback = (e) => {

			e.getFoo();		
		};
		
		webstat.addRenderMethod('cpu', callback);
		
		expect(webstat.getNumberOfRenders()).toEqual(1);

		webstat.callRenders('cpu', data);	
		
		expect(data.getFoo).toHaveBeenCalled();	
			
	});

});
