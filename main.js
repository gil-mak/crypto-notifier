const express = require('express')
var nodemailer = require('nodemailer');
var bittrex = require('node.bittrex.api');
const app = express()

var mail = "";
var password="";
var mailAddresses = ["",""]


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mail,
    pass: password
  }
});


setInterval(senderTimer, 10000);

app.get('/', function (req, res) {
  res.send('Hello World!');
	 
})


function senderTimer() {

  bittrex.getmarketsummary( { market : 'USDT-BCC'}, function( data, err ) {

            console.log(data.result[0].Last);

            if(data.result[0].Last > 1000){

                  mailAddresses.forEach(function(address) {
                        
                      var mailOptions = {
                            from: mail,
                            to: address,
                            subject: 'Notification - Sending Email using Node.js',
                            text: 'BCC is: '+data.result[0].Last+'$'
                      };

                      transporter.sendMail(mailOptions, function(error, info){
                          if (error) {
                            console.log(error);
                          } else {
                            console.log('Email sent: ' + info.response);
                          }
                      });

                }, this);

                process.exit();
            }
  });

}


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})