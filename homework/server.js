const express = require('express');
require ('dotenv').config();
const app = express();
const port = process.env.PORT || 3003;

// const responses = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"]

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


  app.get('/tip/:total/:percentage', (req, res) => {
    let tip = req.params.total * (req.params.percentage/100)
    res.render('template', { title: 'TIP', message: 'your subtotal is $' + req.params.total + ' tip will be $' + tip})
  })

  const responses = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"]

  app.get ('/magic/:question',(req,res) => {
   const response = responses[Math.floor(Math.random() * responses.length)]
      
    res.render('magic', { title: 'Magic', message: response})
})


app.listen(port,() => {
    console.log('i am listening on port ', port)
})