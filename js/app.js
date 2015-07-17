/* 
 * WebSocket Client 
 *
 * Copyright (C) 2014 Murat Ödünç
 *
 * @author murat.asya@gmail.com
 * @license GPL 3.0
 */
(function(window) {

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

                 window.document.connStatUpdater(0);


			};

			socket.onopen =  function() {

				console.log("Connection is live!");

                window.document.connStatUpdater(1);

								
			};

			socket.onmessage= function(event) {
				
               console.log(event.data);

                   var jsonObj = JSON.parse(event.data);

                   switch (jsonObj.Name) {

                       case "cpu":

                           window.document.cpuUpdater(jsonObj.Value);

                            break;

                       case "mem":
                            
                            window.document.memUpdater(jsonObj.Value);

                            break;                   
                   
                   }
    
                                        
			};

			window.socket = socket;
			
		} catch(Error) {
            
           window.document.connStatUpdater(0);

			console.warn(Error);	
		}

		
	}

    //Cpu Updater 
    window.document.cpuUpdater = function() {

        var refs = window.document.getElementById('cpu');

        refs.innerHTML = "%" + arguments[0];
        
        return;    
    
    }

    // Mem Updater
     window.document.memUpdater = function() {

        var refs = window.document.getElementById('mem');

        refs.innerHTML = "%"+ arguments[0];
        
        return;    
    
    }

     // Connection Status Updater
     window.document.connStatUpdater = function(arg) {

        var refs = window.document.getElementById("conStat")

        var off = "Offline";

        var on = "Online";

        refs.innerHTML = (arg === 1)  ? on : off; 
    }

	
}
 
 (window));

