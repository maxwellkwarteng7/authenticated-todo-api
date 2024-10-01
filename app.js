const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const corsOptions = {
    origin: '*'
}



//all imports here 
const mainRouter = require('./routes/main');
const dashboardRouter = require('./routes/dashboard'); 
const { sequelize } = require('./models');
const { errorHandlingMiddleWare } = require('./middleware/errorhandler'); 
const authenticator = require('./middleware/authenticator');


//middlewares 
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api', mainRouter);
app.use('/api', authenticator ,  dashboardRouter); 



// the error middleware 
// notFo
// app.use(errorHandlingMiddleWare);


const port = process.env.PORT || 8000;


app.listen(port, async () => {
    await sequelize.authenticate().then(() => console.log('database connected')).catch((error) => console.log(error));
    console.log(`app is listening on port ${port}`);
});





