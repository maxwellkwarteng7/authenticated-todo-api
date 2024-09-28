const express = require('express'); 
const cors = require('cors'); 
const corsOptions = {
    origin : '*' 
}

const app = express(); 
require('dotenv').config(); 

//all imports here 
const mainRouter = require('./routes/main'); 

//middlewares 
app.use(express.json());
app.use(cors(corsOptions)); 

app.use('/api', mainRouter); 



const port = process.env.PORT || 8000; 


app.listen(port, () => console.log(`listening on port ${port}`)); 



