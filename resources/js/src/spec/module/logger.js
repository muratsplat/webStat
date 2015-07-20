/**
 * Test file for /module/logger
 */

import Logger from '../module/logger';


var console = {

	error	: (msg) => {},
	info	: (msg) => {},		
};


describe('Simple Test Loaded Module', () => {

	it('Expects Logger Module is loaded', () => {
	
		expect(Logger).toEqual(jasmine.any(Object));
	});

});

