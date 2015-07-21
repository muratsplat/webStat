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

        var on = "Online";

        refs.innerHTML	=  on;
		refs.style.color= 'chartreuse';
	};

	 // Status render timer  callback 
	setInterval((e) => {

        var refs = window.document.getElementById("conStat");

        var on = "Offline";

        refs.innerHTML =  on;
		refs.style.color = 'red';
	
	},3000);	

	var path		= 'ws';
	var eventSrvOpts= {wildcard: true,maxListeners: 10};
	var eventServer = new EventEmitter.EventEmitter2(eventSrvOpts);
	var live		= new Connection(win, path, eventServer);

	var webstat		= new WebStat(win, live, eventServer);

	webstat.addRenderMethod('cpu', cpuRender);
	webstat.addRenderMethod('cpu', statusRender);

	webstat.addRenderMethod('mem', memRender);





})(window, Connection, EventEmitter, WebStat); 

