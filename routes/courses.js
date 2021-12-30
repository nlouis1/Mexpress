const express = require('express');
const router = express.Router();
const courses=[ 
    {id: 1, name:'english'},
    {id: 2, name:'mathematics'},
    {id: 3, name:'french'}
];
router.get('/:id',(req,res)=>{
    let course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send('the course with given Id not found');
        res.send(course);
});
router.post('/',(req,res)=>{
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
router.put('/:id',(req,res)=>{
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
router.delete('/:id',(req,res)=>{
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
module.exports = router;