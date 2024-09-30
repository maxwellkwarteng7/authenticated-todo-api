const express = require('express'); 
const cors = require('cors'); 
const corsOptions = {
    origin : '*' 
}

const app = express(); 
require('dotenv').config(); 

//all imports here 
const mainRouter = require('./routes/main'); 
const sequelizeInstance = require('./config/database'); 

//middlewares 
app.use(express.json());
app.use(cors(corsOptions)); 

app.use('/api', mainRouter); 


// Hello bros what is going 


const port = process.env.PORT || 8000; 


app.listen(port, async () => {
    await sequelizeInstance.authenticate().then(() => console.log('the database has  connected ')).catch((e) => console.log(e.message)); 
    console.log(`app is listening on port ${port}`); 
}); 





