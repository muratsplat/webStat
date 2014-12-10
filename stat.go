// Copyright (C) 2014  Murat ÖDÜNÇ
// murat.asya@gmail.com, http://muratodunc.wordpress.com
// See LICENSES.md file to know details the license

package main

import (
	_ "fmt"
	"github.com/gorilla/websocket"
	_ "github.com/muratsplat/highLevelStat"
	_ "io"
	"log"
	"net/http"
	_ "strconv"
	_ "unicode/utf8"
)

// source: https://github.com/gorilla/websocket/blob/master/examples/chat/conn.go
const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second
	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second
	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10
	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

type Cpu struct {
	value string
}

type Mem struct {
	value string
}

type Message struct {
	Cpu

	Mem
}

// Upgreder Structer on websocket library
var upgrader = websocket.Upgrader{

	ReadBufferSize: 1048,

	WriteBufferSize: 1048,
}

var (
	adressAndPort string = ":8080"

	jsAppUrlPath string = "/js/app.js"

	webSocketPath string = "/ws"
)

// WebSocket Handler
func websocketHandler(w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)

	conn.SetPingHander(func(st) error)

	if err != nil {

		log.Println(err)

		return
	}

	for {

		messageType, p, err := conn.ReadMessage()

		if err != nil {

			return

		}

		log.Println("Message: ", string(p))

		log.Println("Type: ", messageType)
		if err = conn.WriteMessage(messageType, p); err != nil {

			return
		}
	}

}

// to get the percent of cpu(s) usage

func main() {
	// getting Cpu Status Data
	http.HandleFunc(webSocketPath, websocketHandler)
	// getting index file
	http.HandleFunc("/", Index)
	// getting Javascript library
	http.HandleFunc(jsAppUrlPath, Js)

	http.ListenAndServe(adressAndPort, nil)

}

// handler for Index file
func Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
	log.Print("index called")
}

// handler for js file..
func Js(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "js/app.js")
	log.Print("app.js called")
}
