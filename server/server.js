const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
 

var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/db',
  collection: 'sessions'
});
 
// Catch errors
store.on('error', function(error) {
  console.log(error);
});


const server = express();

server.use(require('express-session')({
    secret: 'hello wrold',
    name: 'SESSION',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));


server.use('/api/home', require('./routers/homeRouter'));
server.use('/api/menu', require('./routers/menuRouter'));

server.use('/api/user', require('./routers/userRouter'));


mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true}, (error)=>{
    if(!error){
        //数据库连接成功
        console.log('数据库连接成功');
        server.listen(9000, 'localhost', (error)=>{
            error || console.log('启动成功');
        })
    }else{
        console.log('数据库连接失败');
    }
})

