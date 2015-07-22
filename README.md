webStat
=============

This app simply is web service. This service gives the status of CPU(s) and Memory of system which is the app works on.

I'm new in Go Language and this library is my first app in go. I want to improve my go skils by writing go code more and more.

This app was written by Go language and JavaScipt. 

The app has two main structer. These are a server is works on server side  and a client that works on browser. The server side is written in Go language. The client side is written in JavaScript(ES6).

The app shows system status which is server side.

Probably I will not support the package at long term support.

How to installs and works
------------

```sh

$ git clone https://github.com/muratsplat/webStat.git

$ go get github.com/muratsplat/highLevelStat

$ go get github.com/gorilla/websocket

$ cd webStat

$ npm install // to install all JavaScipt dependencies

$ gulp // to build assets

$ go build stat.go

$ ./stat

```
And than open 127.0.0.1:8080 by using a web browser. Now you can see the percent of cpu(s) usage at opened web page in real time..

ScreenShot
----------
![example](https://github.com/muratsplat/webStat/blob/master/screenshots/webstat.gif)

Dependencies
------------
* Go Language Offical Tools
* Git
* NodeJs
* GulpJS
 
Todos
----
* pinger and ponger features to client side
* pinger and ponger features to server side +1
* login and authorization to limit access
* simple test methods +1;

Thanks To
---------
A lot of Open Source tools, programs, and library is used in the project. Thank you for all of it..

License
--------
Copyright (C) 2014-2015 Murat ÖDÜNÇ  GPLv3

