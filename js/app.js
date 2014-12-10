/* 
 * App Js Codes
 * 
 *
 * Copyright (C) 2014 Murat Ödünç
 *
 * @author murat.asya@gmail.com
 * @license GPL 3.0
 */
(function(window) {

	

	var socketRef = null;


	// when DOM is ready
	window.onload= function() {

		var port = window.location.port;

		var hostname = window.location.hostname;

		var websocArg = "ws://" + hostname + ":" + port +"/ws";

		
		try {

			var socket = new WebSocket(websocArg);
			
			// adding onerror event
			socket.onerror=  function() {
				
				console.error("WebSocket is failed");

			};

			socket.onopen =  function() {

				console.log("Connection is live!");

				socket.send("Echo, alfa, teda, and beta!");
				
				console.log("Now a message was sended to server!");
								
			};

			socket.onmessage= function(event) {
					console.log(event.data);	
			};

			window['socket'] = socket;
			
		} catch(Error) {

			console.warn(Error);
		
		}

		
	}

	
}
 
 (window));




