const express = require('express');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const { User } = require('./models/index');
const bcrypt = require('bcrypt');
const app = express();

const prepareAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes)

    app.listen(3001, async()=>{
        console.log(`Server Started at port: ${PORT}`);
        const incomingPass = '123456';
        const user = await User.findByPk(2);
        const response = bcrypt.compareSync(incomingPass,user.password);
        console.log(response);

    })
}

prepareAndStartServer();