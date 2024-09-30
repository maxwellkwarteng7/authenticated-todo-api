const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const corsOptions = {
    origin: '*'
}



//all imports here 
const mainRouter = require('./routes/main');
const sequelizeInstance = require('./config/database');
const errorhandler = require('./middleware/errorhandler');
const NotExist = require('./errors/NotExist');

//middlewares 
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api', mainRouter);




// the error middleware 
app.use(NotExist);
app.use(errorhandler);


const port = process.env.PORT || 8000;


app.listen(port, async () => {
    await sequelizeInstance.authenticate().then(() => console.log('the database has  connected ')).catch((e) => console.log(e.message));
    console.log(`app is listening on port ${port}`);
});





