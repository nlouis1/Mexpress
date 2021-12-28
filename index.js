const express =require('express');
const config = require('config');
const morgan =require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const app = new express();
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
app.get('/',(req,res) => {
    res.send('welcome');  

})
const courses=[ 
    {id: 1, name:'english'},
    {id: 2, name:'mathematics'},
    {id: 3, name:'french'}
];
app.get('/api/courses/:id',(req,res)=>{
    let course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send('the course with given Id not found');
        res.send(course);
});
app.post('/api/courses',(req,res)=>{
const result = validateCourse(req.body);
const {error} =validateCourse(req.body);
if(error) {res.status(400).send(result.error.details[0].message);
        return;}

const course={
    id:courses.length+1,
    name:req.body.name,

};
courses.push(course);
res.send(course);
console.log('done');
});
app.put('/api/courses/:id',(req,res)=>{
    const result = validateCourse(req.body);
    const {error} =validateCourse(req.body);
    if(error){ res.status(400).send(result.error.details[0].message);
    return;}

let course = courses.find(c=>c.id === parseInt(req.params.id));
if(!course)
res.status(404).send('the course with given Id not found');
course.name= req.body.name;
res.send(course);
console.log('done');

});
app.delete('/api/courses/:id',(req,res)=>{
    let course = courses.find(c=>c.id === parseInt(req.params.id));
if(!course){
res.status(404).send('the course with given Id not found');}

const index= courses.indexOf(course);
courses.splice(index,1);
res.send(courses);
console.log('done');

});
function validateCourse(all){
    const schema =Joi.object({
        name: Joi.string().min(3).required()
    
    });
    return schema.validate(all);
}
// function Validator(inputs){
//     const result = validateCourse(inputs);
// const {error} =validateCourse(inputs);
// if(error){ res.status(400).send(result.error.details[0].message);
// return;}
//     }

const port = process.env.PORT || 8000;
app.listen(port,()=>console.log(`server is running on port`,port));