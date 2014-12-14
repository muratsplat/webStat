webStat
=============

This app simply is web service. This service gives the status of CPU(s) and Memory of system which is the app works on.


I'm new in Go Language and this library is my first app in go. I want to improve my go skils by writing go code more and more.

This app was written by Go language and JavaScipt. It is used any Js library such as Jquery on the client side. 

The app has two main structer. These are a server is works on server side  and a client that works on browser. The server side is written in Go language. The client side is written in JavaScipt  and it is so simply.

The app shows system status which is server side.

Probably I will not support the package at long term support.

How to installs and works
------------

```sh

$ git clone https://github.com/muratsplat/webStat.git

$ go get github.com/muratsplat/highLevelStat

$ go get github.com/gorilla/websocket

$ cd webStat

$ go build stat.go

$ ./stat

```
And than open 127.0.0.1:8080 by using a web browser. Now you can see the percent of cpu(s) usage at opened web page in real time..

ScreenShot
----------
![example](https://github.com/muratsplat/webStat/blob/master/screenshots/webstat.gif)


Todos
----
* pinger and ponger features to client side
* pinger and ponger features to server side
* login and authorization to limit access
* simple test methods

Thanks To
---------
[Gorilla Team](https://github.com/gorilla/websocket) for websocket

License
--------
Copyright (C) 2014 Murat ÖDÜNÇ  GPLv3

