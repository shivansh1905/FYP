
const express = require('express');
const uniqid = require('uniqid');
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
var wallet = web3.eth.accounts.privateKeyToAccount('0x4bab2b32e12d551b3877c5e2a8b677932b088f08460a6d852637e75ae5abb0c8');

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'sophia.cs.hku.hk',
  user     : 'tibrewal',
  password : 'KLIipPTB',
  database : 'tibrewal'
});

connection.connect();

app.post('/authenticate',upload.none(), (req, res) => {
    var details = req.body.jsonObject;

    var count = details.CountPOI;

    var query = "Insert Into POI(identity, purpose, poi_field, poi_value) VALUES";

    for(var i = 0; i < count; i++){
        if(i+1 == count){
            query = query + `('${details.identity}', '${details.idPurpose}', '${details.POI[i].type}', '${details.POI[i].value}');`
        } else {
            query = query + `('${details.identity}', '${details.idPurpose}', '${details.POI[i].type}', '${details.POI[i].value}'), `
        }
    }

    connection.query(query, (err, data) => {
        if(err) res.status(400).send({message:err});
        else{
            connection.query(`Select * from POI where Identity='${details.identity}'`, (err, data) => {
                if(err) res.status(400).send({message:err});
                else {
                    if(data.length > 0) {
                        var dataJSON = {};

                        dataJSON["Purpose-1"] = data[0].purpose;

                        var c = 2;
                        var lastP = data[0].purpose;

                        data.forEach(element => {
                            if(element.purpose != lastP){
                                dataJSON["Purpose-" + c] = element.purpose;
                                lastP = element.purpose;
                                c = c + 1;
                            }
                            dataJSON[element.poi_field] = element.poi_value;
                        });

                        var signedResponse = {
                            data: dataJSON,
                            UserPublicKey: req.body.jsonObject.UserPublicKey
                        }

                        console.log(web3.eth.accounts.sign(JSON.stringify(signedResponse), wallet.privateKey));

                        res.status(200).send(web3.eth.accounts.sign(JSON.stringify(signedResponse), wallet.privateKey));
                    }   else
                        res.status(400).send({data: false});
                }
            });
        }
    });
})


app.post('/checkID',upload.none(), (req, res) => {
    var details = {};
    details.identity = req.body.jsonObject.identity;

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


app.get('/getPOI',upload.none(), (req, res) => {

    connection.query(`Select * from POI where Identity='3035345784'`, (err, data) => {
        if(err) res.status(400).send({message:err});
        else {
            if(data.length > 0) {
                var dataJSON = {
                    data: []
                };

                var d = {};

                d["DID"] = uniqid();
                d["Purpose"] = data[0].purpose;

                var lastP = data[0].purpose;

                data.forEach(element => {
                    if(element.purpose != lastP){
                        dataJSON.data.push(d);
                        d = {};
                        d["DID"] = uniqid();
                        d["Purpose"] = element.purpose;
                        lastP = element.purpose;
                    }
                    d[element.poi_field] = element.poi_value;
                });

                dataJSON.data.push(d);

                res.status(200).send(dataJSON);
            }   else
                res.status(400).send({data: false});
        }
    });
        
})



app.listen(8002, (err) => {
    console.log(`Server is running on port 8002`);
});