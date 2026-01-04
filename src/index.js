const express = require('express');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const {User, Role} = require('./models/index')

const app = express();

const prepareAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes)

    app.listen(3001, async()=>{
        console.log(`Server Started at port: ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
        // const u1 = await User.findByPk(3);
        // const r1 = await Role.findByPk(1);
        // u1.addRole(r1);
        
          
    })

    
}

prepareAndStartServer();