const express = require('express');
require ('dotenv').config();
const app = express();
const port = process.env.PORT || 3003;

const fs = require('fs') // this engine requires the fs module like we did Saturday
app.engine('hypatia', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine

app.get('/greeting',(req,res) => {
    res.send('Hello, Stranger')
})

app.get ('/greeting/:name',(req,res) => {
    res.send("Hello " + req.params.name)
})


app.listen(port,() => {
    console.log('i am listening on port ', port)
})