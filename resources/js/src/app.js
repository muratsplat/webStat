/**
 * Main file
 */

// importing modules..
import connection from "./modules/socketcon";


(function(win, socket, connection) {

	var port		= win.location.port;
	var hostname	= win.location.hostname;
	var console		= win.console;
	var live		= new connection(console, socket, hostname, port);
	win.webStat		= live;

})(window, WebSocket,connection); 

