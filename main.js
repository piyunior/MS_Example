import express from 'express';
import bodyParser from 'body-parser'


let app = express();

app.listen(3000,()=>{
    console.log('Microservice: is listening on port ',3000)
})