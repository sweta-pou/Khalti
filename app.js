
var express = require ("express"),
    app= express(),
    bodyParsor = require("body-parser");
const axios = require('axios');
require("dotenv").config();


app.set("view engine","ejs");
app.use(bodyParsor.urlencoded({extended:true}));



//================
//Routes
//=======================
app.get("/payment",function(req,res)
{
    res.render("payment",{publickey:process.env.PUBLIC_KEY});
}
);
app.post("/payment",function(req,res)
{
   
    let data = {
        "token": (req.body.token),
        "amount": (req.body.amount)
            };
          console.log('key'+process.env.SECRETE_KEY);
          
        let config = {
        headers: {'Authorization': 'Key '+process.env.SECRETE_KEY}
       };
       axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
          .then(response => {
              console.log(response.data);
              console.log(response.data.merchant.email);
              console.log(response.data.user.email)
              
          })
          .catch(error => {
              console.log(error);
          });
  
          res.json({
              'message': "transaction completed"
          });
    
})



app.listen("2000",function()
{
    console.log("started");
}
)