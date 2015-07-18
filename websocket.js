/**
 * WebSocket Service Provider 
 */

class WebSocketServiceProvider {

	constructer() {

		this.msg = 'I am WebSocket Service Provider';
	}


	getMesg() {

		return this.msg;
	}

}

export var websocket = new WebSocketServiceProvider();

