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

app.get('/', (req, res)=>{
 try{
  return res.status(200).json('apis runn for Mail sending..');
 }catch(error){
  return res.status(500).json('internal server error.. ');
 }
});




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
});