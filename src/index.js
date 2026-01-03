const express = require('express');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const UserService = require('./services/user-service')

const app = express();

const prepareAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes)

    app.listen(3001, async()=>{
        console.log(`Server Started at port: ${PORT}`);

        const service = new UserService();
        // const newToken = service.createToken({email:'pulkit@admin.com', id:1});
        // console.log(newToken);
        
        // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InB1bGtpdEBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNzY3NDYzNzk2LCJleHAiOjE3Njc0NjczOTZ9.doS-OXEjbzjfZRZutSc-K_AUr7RuB-Udj_hJLwmvDcQ';
        // const response = service.verifyToken(token);
        // console.log(response);

        

    })
}

prepareAndStartServer();