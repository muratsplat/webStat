// Copyright (C) 2014  Murat ÖDÜNÇ
// murat.asya@gmail.com, http://muratodunc.wordpress.com
// See LICENSES.md file to know details the license

package main

import (
	_ "fmt"
	_ "github.com/muratsplat/highLevelStat"
	_ "io"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

// source: https://github.com/gorilla/websocket/blob/master/examples/chat/conn.go
const (
	// Time allowed to write a message to the peer.
	writeWait = 5 * time.Second

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

//
func writerStat(ws *websocket.Conn) {

	testMsg := []byte("test 121212")

	pingTicker := time.NewTicker(pingPeriod)

	// let's don't forgetting to close the connection
	defer func() {

		pingTicker.Stop()

		ws.Close()
	}()
	// setting deadline
	ws.SetWriteDeadline(time.Now().Add(writeWait))

	err := ws.WriteMessage(websocket.TextMessage, testMsg)

	if err != nil {

		log.Println("Error: It could not sended message to client!")

	}

}

// Simple reader for the required rule of  websocket
func reader(ws *websocket.Conn) {

	// for not forgetting to close the connection
	defer ws.Close()

	ws.SetReadLimit(512) // byte
	ws.SetReadDeadline(time.Now().Add(pongWait))
	ws.SetPongHandler(func(string) error {

		ws.SetReadDeadline(time.Now().Add(pongWait))

		return nil
	})

	for {

		_, _, err := ws.ReadMessage()

		if err != nil {

			break

		}

	}
}

// WebSocket Handler
func websocketHandler(w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {

		log.Println(err)

		return
	}

	go writerStat(conn)

	reader(conn)
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
