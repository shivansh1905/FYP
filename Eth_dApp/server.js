
const express = require('express');
const uniqid = require('uniqid');
const route = require('express').Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const Web3 = require('web3');
const app = express();  
const multer = require('multer');
var upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

var web3 = new Web3('HTTP://127.0.0.1:8545');
var wallet = web3.eth.accounts.privateKeyToAccount('0x24fad87c53eab9e10b9f3b1b3b47706b342b14915f1fc2a2066011da36f219b2');

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'sophia.cs.hku.hk',
  user     : 'tibrewal',
  password : 'KLIipPTB',
  database : 'tibrewal'
});

connection.connect();

app.post('/create', function(req, res){
    var details = req.body.jsonObject;
    details.identity = uniqid();
    console.log(details);

    query = `Insert into UserIdentity(Identity,FirstName,LastName,PhoneNumber,AadharNumber,Email,Age) values('${details.identity}', '${details.fn}','${details.ln}','${details.phone}','${details.aadhar}','${details.mail}','${details.age}');`

    console.log(query);
    
    connection.query(`Insert into UserIdentity(Identity,FirstName,LastName,PhoneNumber,AadharNumber,Email,Age) values('${details.identity}', '${details.fn}','${details.ln}','${details.phone}','${details.aadhar}','${details.mail}','${details.age}');`, function(err,data){
        if(err) throw err;
        else res.status(200).send({identity: details.identity})
    });
         
})

function fn(details,data){
    return new Promise((resolve, reject)=>{
        if(details.fn){
            if(details.fn == data.FirstName)
            resolve()
            else
            reject("invalid firstname")
        }
        else
        resolve()    
    })
}
function ln(details,data){
    return new Promise((resolve, reject) => {
        if(details.ln){
            if(details.ln == data.LastName)
            resolve()
            else
            reject("invalid lastname");
        }
        else
        resolve();    
    })
    }
function mail(details,data){
    return new Promise((resolve, reject) => {
        if(details.mail){
            if(details.mail == data.Email)
            resolve()
            else
            reject("invalid mail");
        }
        else
        resolve();    
    })
}
function phone(details,data){
    return new Promise((resolve, reject) => {
        if(details.phone){
            if(details.phone == data.PhoneNumber)
            resolve()
            else 
            reject("invalid phone number");
        }
        else
        resolve();
    })
}
function aadhar(details,data){
    return new Promise((resolve, reject) => {
        if(details.aadhar){
            if(details.aadhar == data.AadharNumber)
            resolve()
            else
            reject("invalid aadhar number");
        }
        else
        resolve();
    })
}
function age(details,data){
    return new Promise((resolve, reject) => {
        if(details.age){
            if(details.age == data.Age)
            resolve()
            else
            reject("invalid age")
        }
        else 
        resolve();
    })
}

app.post('/authenticate',upload.none(), (req, res) => {
    var details = {};
    details.identity = req.body.jsonObject.identity;
    if(req.body.jsonObject.fn != '')
    details.fn = req.body.jsonObject.fn;
    
    if(req.body.jsonObject.ln != '')
    details.ln = req.body.jsonObject.ln;
    
    if(req.body.jsonObject.age != '')
    details.age = req.body.jsonObject.age;
    
    if(req.body.jsonObject.aadhar != '')
    details.aadhar = req.body.jsonObject.aadhar;
    
    if(req.body.jsonObject.mail != '')
    details.mail = req.body.jsonObject.mail;
    
    if(req.body.jsonObject.phone != '')
    details.phone = req.body.jsonObject.phone;

    console.log(details);

    console.log(`Select * from UserIdentity where Identity='${details.identity}'`);

    connection.query(`Select * from UserIdentity where Identity='${details.identity}'`, (err, data) => {
        if(err)throw err;
        else{
            console.log(data[0]);
           fn(details,data[0])
           .then( () => {return ln(details,data[0])})
           .then( () => {return mail(details,data[0])})
           .then( () => {return phone(details,data[0])})
           .then( () => {return aadhar(details,data[0])})
           .then( () => {return age(details,data[0])})
           .then( () => {
               var signedResponse = { 
                   data: details,
                   UserPublicKey: req.body.jsonObject.UserPublicKey
               }

               console.log(web3.eth.accounts.sign(JSON.stringify(signedResponse), wallet.privateKey));

               res.status(200).send(web3.eth.accounts.sign(JSON.stringify(signedResponse), wallet.privateKey));
            })
           .catch((err) => {res.status(400).send({message:err})})
        }
    });
})


app.post('/checkID',upload.none(), (req, res) => {
    var details = {};
    details.identity = req.body.jsonObject.identity;

    console.log(details.identity);

    connection.query(`Select * from UserIdentity where Identity='${details.identity}'`, (err, data) => {
        if(err) throw err;
        else{
            if(data.length > 0)
                res.status(200).send(data[0]);
            else
                res.status(400).send({data: false});
        }
    });
})



app.listen(8002, (err) => {
    console.log(`Server is running on port 8002`);
});