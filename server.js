const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemialer = require('nodemailer');

require('dotenv').config();

const mailtest = require('./api/mailsend');


app.use(bodyParser.json());
app.use(cors());



app.use('/api', mailtest);

app.get('/', req, res){
     return res.status(200).json('api runn successful.. for mail send');


}



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
});