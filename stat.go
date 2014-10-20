// Copyright (C) 2014  Murat ÖDÜNÇ
// murat.asya@gmail.com, http://muratodunc.wordpress.com
// See LICENSES.md file to know details the license

package main

import (
	"encoding/json"
	"github.com/MURATSPLAT/highLevelStat"
	"io"
	"log"
	"net/http"
)

type CpuJson struct {
	Name  string
	Value int
}

// to get the percent of cpu(s) usage
func getCpuUsage() int {

	var test highlevelstat.SystemStatus

	return int(test.GetCpuUsage().CpuUsage)

}

func main() {
	// getting Cpu Status Data
	http.HandleFunc("/cpu", cpuStat)
	// getting index file
	http.HandleFunc("/", Index)
	// getting Javascript library
	http.HandleFunc("/js/smoothie.js", Js)

	http.ListenAndServe(":8080", nil)

}

// to get the percent of Cpu(s) usage by converting json format
func cpuStat(res http.ResponseWriter, req *http.Request) {

	res.Header().Set("Content-Type", "application/json")

	var js CpuJson

	js.setName("cpuUsage").setValue(getCpuUsage())

	io.WriteString(res, js.getJson())

}

// setter for CpuJson Struct
func (c *CpuJson) setName(s string) *CpuJson {

	c.Name = s
	return c

}

// getter for CpuJson Struct
func (c *CpuJson) setValue(s int) *CpuJson {

	c.Value = s

	return c
}

// to return json format
func (c *CpuJson) getJson() string {

	b, _ := json.Marshal(c)

	return string(b)

}

// handler for Index file
func Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "cartRealtime.html")
	log.Print("index called")
}

// handler for js file..
func Js(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "js/smoothie.js")
	log.Print("smoothie.js called")
}
