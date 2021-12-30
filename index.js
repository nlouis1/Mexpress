const express =require('express');
const config = require('config');
const morgan =require('morgan');
const Joi = require('joi');
const logger = require('./midleware/logger');
const app = new express();
const courses = require('./routes/courses');
app.set('view engine','pug');
app.set('views','./views')
console.log(`running on ${app.get('env')} mode`);
app.use(express.json());
console.log('welcome to '+config.get('name'));
console.log('server: '+config.get('mail.host'));
//console.log('password: '+config.get('mail.password'));
app.use(logger);
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use('/api/courses',courses);
app.get('/',(req,res) => {
    res.render('index',{title:'MexpressApp', body:'hello everybody'});
});  
const port = process.env.PORT || 8000;
app.listen(port,()=>console.log(`server is running on port`,port));