const express = require('express');
const route = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');
const disposableDomains = require('disposable-email-domains');


const isValidEmail =  (email) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isDisposableEmail = (email)=>{
    const domain = email.split('@')[1];
    return disposableDomains.includes(domain);
}

route.post('/contact', async(req, res)=>{
    const { name, email, message } = req.body;
    const requiredFields = {name, email, message};
    const missingFields =[];

    for(const [key, value] of Object.entries(requiredFields)){
        if(!value) missingFields.push(key);
    }

    if(missingFields.length > 0){
        return res.status(400).json({
            messae: `Missing fields: ${missingFields.join(', ')}`
        });
    };
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if(isDisposableEmail(email)){
        return res.status(400).json({message: 'Disposable email addresses are not allowed'});
    }

 const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,

    },

 });
 const mailOptions = {
    from: email,
    to:process.env.TO_EMIAL,
    subject: `New Contact Message from ${name}`,
    text: `You have received a new message:\n\nName:${name}\nEmail:${email}\nMessage:${message}`,
    
 };
 try{
    await transporter.sendMail(mailOptions);
    res.status(200).json({message: 'Message send successfully!'});

 }catch(error){
    console.log(error);
    res.status(500).json({error: 'Failed to send message'});
 }

});


module.exports = route;
