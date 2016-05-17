var express = require('express')
var app = express()
var mongoose = require('mongoose')
var methodOverride = require('method-override')
var morgan = require("morgan")
var bodyParser = require("body-parser")
var port = process.env.PORT || 8080

app.use(express.static(__dirname)); // To be able to return static objects - such as images, html, js files kept locally

app.get('*', function(req, res){
	res.sendFile(__dirname + '/index.html')
})

app.listen(port)
console.log('This is a basic show of hands that the server is working')