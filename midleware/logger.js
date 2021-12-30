function authentic(req,res,next){
    console.log('loading..');
}
function log(req,res,next){
    authentic();
    console.log('loading...');
    console.log('displaying the output');
next();
}
module.exports = log;