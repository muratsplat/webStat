
/**
 * Test for /module/logger
 */

import Logger from '../../modules/logger.js';


describe('Simple Test Loaded Module', () => {
	
	var logger, console;

	beforeEach(() => {
		console = {

			error	: (msg) => {},
			info	: (msg) => {},
			log		: (msg) => {},	
		};

		spyOn(console, 'error');
		spyOn(console, 'info');
		spyOn(console, 'log');

	    logger = new Logger(console);
	});

	it('Expects Logger Module is loaded', () => {
	
		 expect(logger).toEqual(jasmine.any(Object));
	});

	it('console object tests', () => {

		logger.sendInfo('test');
		logger.sendError('test');
		logger.sendLog('test');

		expect(console.error).toHaveBeenCalled();	
		expect(console.info).toHaveBeenCalled();	
		expect(console.log).toHaveBeenCalled();	

	});

});

