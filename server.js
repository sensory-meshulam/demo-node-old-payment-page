const express = require('express')
const app = express();
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;  

const MESHULAM_PAGE_CODE = '539888f537b7';
const MESHULAM_API_KEY = 'b60e1d4cbd29';
const MESHULAM_USER_ID = 'cf2ebf779f618e59';
const MESHULAM_API_URL = 'https://sandbox.meshulam.co.il/api/light/server/1.0/';

app.post('/api/payment/getPaymentLink', async (req, res) => {
  const { sum, paymentsNum, description } = req.body;

  const formData = {
    pageCode: MESHULAM_PAGE_CODE,
    userId: MESHULAM_USER_ID,
    apiKey: MESHULAM_API_KEY,
    sum: sum.toString(),
    paymentNum: paymentsNum.toString(),
    description: description,
    transactionTypes: ['1', '6', '13', '14'], //[Credit, Bit, ApplePay, GooglePay] If you don't need one of them, give it a value of '1'
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
    const { status, data: { authCode }, err: { message } } = response.data;
    const result = {
      isSuccess: status > 0,
      message: status > 0 ? authCode : message,
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


