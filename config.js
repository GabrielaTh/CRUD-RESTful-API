var mongoose = require('mongoose');
var dbUrl ='mongodb://127.0.0.1:27017/mydata1';
mongoose.connect(dbUrl,{useNewUrlParser:true});
module.exports ={
    'secret':'ilovescotchyscoth',
    'database':dbUrl
};