const express = require('express')
const app = express();
const axios = require('axios');
const path = require('path');
const FormData = require('form-data');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;  
app.use('/client', express.static(path.join(__dirname, 'client')));

const MESHULAM_PAGE_CODE = 'b73ca07591f8';
// const MESHULAM_API_KEY = 'b60e1d4cbd29';
const MESHULAM_USER_ID = '4ec1d595ae764243';
const MESHULAM_API_URL = 'https://sandbox.meshulam.co.il/api/light/server/1.0/';

app.post('/api/payment/getPaymentLink', async (req, res) => {
  const { sum, paymentsNum, description} = req.body;

  const formData = {
    pageCode: MESHULAM_PAGE_CODE,
    userId: MESHULAM_USER_ID,
    // apiKey: MESHULAM_API_KEY,
    sum: sum.toString(),
    paymentNum: paymentsNum.toString(),
    description: description,
    transactionTypes: ['1', '6', '13', '14'],
        //[Credit, Bit, ApplePay, GooglePay]
        //If you don't need one of them, give it a value of '1'
    successUrl: "http://localhost:3000/client/success.html?success=1",
    cancelUrl: "http://localhost:3000/client/failure.html?failure=1",
        // With the help of cFields you can transfer information that will be retrieved on the success page (limited to 5 cFields)
    cField1: MESHULAM_PAGE_CODE,
    cField2: 'blabla',
    cField3: 'blabla',
    cField4: 'blabla',
    cField5: 'blabla',   
        // Here you can use the two parameters you chose for your payment-page.
        // In this case full name and phone number.
        // You can send them here, or not and the user will fill them in
    "pageField[fullName]": 'John Smit',
    "pageField[phone]": '0500000000',
  };
  
  const form = new FormData();
for (const [key, value] of Object.entries(formData)) {
  if (Array.isArray(value)) {
    for (const item of value) {
      form.append(`${key}[]`, item);
    }
  } else {
    form.append(key, value);
  }
}

  const config = {   
    headers: { 'content-type': 'multipart/form-data' }
    }

    try {
        const response = await axios.post(MESHULAM_API_URL + 'createPaymentProcess', formData, config);
        const data = response.data;
        console.log(data)
        const result = {
          isSuccess: data.status > 0,
          message: data.status > 0 ? data.data.url : data.err.message,
        };
        res.json(result);
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      }
});

app.listen(PORT, (error) =>{
  if(!error)
      console.log("Server is Successfully Running,and App is listening on port "+ PORT)
  else 
      console.log("Error occurred, server can't start", error);
  }
);


