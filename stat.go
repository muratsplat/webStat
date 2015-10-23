// Copyright (C) 2014  Murat ÖDÜNÇ
// murat.asya@gmail.com, http://muratodunc.wordpress.com
// See LICENSES.md file to know details the license

package main

import (
	"github.com/gorilla/websocket"
	"github.com/muratsplat/highLevelStat"
	"log"
	"net/http"
	"strconv"
	"time"
)

// source: https://github.com/gorilla/websocket/blob/master/examples/chat/conn.go
const (
	// Time allowed to write a message to the peer.
	writeWait = 1 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 10000 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 1024
)

// Simple Message Data Structer
type Message struct {
	Type int

	Name string

	Value string

	Time int64
}

// Upgreder Structer on websocket library
var upgrader = websocket.Upgrader{

	ReadBufferSize: 1048,

	WriteBufferSize: 1048,
}

// Configurations
var (
	adressAndPort string = ":8080"
	jsAppUrlPath  string = "/assets/js/bundle.js"
	jsAppMapPath  string = "/assets/js/bundle.js.map"
	cssPath       string = "/assets/css/style.css"
	webSocketPath string = "/ws"

	timeOfRangeStat time.Duration = time.Duration(100 * time.Millisecond) // 0.5 second
)

// Types Of Message
const (
	sysStat = 9
)

// System CPU(s) Status Updater
func cpuUpdater(c chan<- Message) {
	// setting delay
	highlevelstat.SetTimeOfRangeForCpuStat(timeOfRangeStat)

	var msg Message

	msg.Type = sysStat

	msg.Name = "cpu"

	for {

		var status highlevelstat.SystemStatus

		msg.Value = float32ToString(status.GetCpuUsage().CpuUsage)

		msg.Time = time.Now().Unix()
		// sending a message that includes cpu status
		// to channel
		log.Println(msg)
		c <- msg

	}
}

//  System Memory Status Updater
func memUpdater(c chan<- Message) {

	var msg Message

	msg.Type = sysStat

	msg.Name = "mem"

	//	duration := time.Duration(timeOfRangeStat)

	for {

		memInfo := highlevelstat.GetMemInfo()

		msg.Value = float32ToString(memInfo.GetUsedMemForHuman())

		msg.Time = time.Now().Unix()
		// sending the message to channel
		log.Println(msg)
		c <- msg

		time.Sleep(timeOfRangeStat * time.Millisecond)
	}

}

// simple string converter helper for float32 types
func float32ToString(f float32) string {

	return strconv.FormatFloat(float64(f), 'f', 2, 32)
}

// let's writer collected data on the connection structer
func writerStat(ws *websocket.Conn) {

	cpuChan := make(chan Message)

	memChan := make(chan Message)

	// starting channels
	go cpuUpdater(cpuChan)
	go memUpdater(memChan)

	pingTicker := time.NewTicker(pingPeriod)

	// let's don't forgetting to close the connection
	defer func() {

		pingTicker.Stop()

		ws.Close()
	}()

	for {

		select {

		case cpu := <-cpuChan:

			ws.SetWriteDeadline(time.Now().Add(writeWait))

			if err := ws.WriteJSON(cpu); err != nil {

				log.Println("JSON data[CPU] could not sended to clilent")
			}

		case mem := <-memChan:

			ws.SetWriteDeadline(time.Now().Add(writeWait))

			if err := ws.WriteJSON(mem); err != nil {

				log.Println("JSON data[MEM] could not sended to clilent")
			}

		}
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

		tty, _, err := ws.ReadMessage()

		log.Println("Proto: ", tty)

		if err != nil {

			break

		}

	}
}

// WebSocket Handler
func websocketHandler(w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		if _, ok := err.(websocket.HandshakeError); !ok {

			log.Println(err)
		}

		return
	}

	go writerStat(conn)

	reader(conn)
}

// to get the percent of cpu(s) usage

func main() {
	// getting Cpu Status Data
	http.HandleFunc(webSocketPath, websocketHandler)

	// getting Javascript library and other assets
	http.HandleFunc(jsAppUrlPath, Js)

	// getting map for builded js file
	http.HandleFunc(jsAppMapPath, jsMap)

	// CSS file routes is registered
	http.HandleFunc(cssPath, cssHander)

	// getting index file
	http.HandleFunc("/", Index)

	http.ListenAndServe(adressAndPort, nil)

}

// handler for Index file
func Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
	log.Print("index called")
}

// handler for js file..
func Js(w http.ResponseWriter, r *http.Request) {

	http.ServeFile(w, r, "resources/js/dist/bundle.js")
	log.Print("bundle.js is called")
}

// Hander for js map file..
func jsMap(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "resources/js/dist/bundle.js.map")
	log.Print("build.j.map is called.")
}

// Handler for Style.css
func cssHander(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "resources/assets/css/style.css")
	log.Print("style.css is called")
}
