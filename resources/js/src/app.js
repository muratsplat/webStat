/**
 * Main file
 */

// importing modules..
import Connection from './modules/socketcon';
import * as EventEmitter from 'eventemitter2';
import WebStat from './modules/webstat.js';


(function(win, Connection, EventEmitter, WebStat ) {

	'use strict';
	// Cpu render callback
	var cpuRender  = (e) => {

		var refs = win.document.getElementById('cpu');

        refs.innerHTML = "%" + e;
        
        return;    
	};

    // Memory Render callback
    var memRender  = (e) =>  {

        var refs = win.document.getElementById('mem');

        refs.innerHTML = "%"+ e;
        
        return;
	};

    // Status render callback 
	var statusRender = (e) => {
    
	   	var refs = window.document.getElementById("conStat");
		
        refs.innerHTML	=  e.msg; // 'Closed', 'Online'...

		var color = '';

		switch(e.code) {

			case 0 :
			   	color = 'yellow';
				break;
			case 1 : 
				color = 'chartreuse';
				break;
			default:
				color = 'red';
		}

		refs.style.color= color;
	};	

	var path		= 'ws';
	var eventSrvOpts= {wildcard: true,maxListeners: 10};
	var eventServer = new EventEmitter.EventEmitter2(eventSrvOpts);
	var live		= new Connection(win, path, eventServer);

	var webstat		= new WebStat(win, live, eventServer);

	webstat.addRenderMethod('cpu', cpuRender);
	webstat.addRenderMethod('conStat', statusRender);

	webstat.addRenderMethod('mem', memRender);





})(window, Connection, EventEmitter, WebStat); 

