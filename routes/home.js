const express = require('express');
const happ = new express();
const hrouter = express.Router();
happ.set('view engine','pug');
happ.set('views','./views');
hrouter.get((req,res) => {
    res.render('index',{title:'MexpressApp', body:'hello everybody'});
});
module.exports = hrouter;