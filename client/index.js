
const apiUrl = 'http://localhost:3000';
let resultStatus; //boolean
let resultData;


const data =  {
    sum: 1,
    paymentsNum: 1,
    description: "The destination of the payment",
  }
  
const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify(data)
}

async function getPaymentLink (){
   const response = await fetch(`${apiUrl}/api/payment/getPaymentLink`, options);
   //response in format {isSuccess: boolean, message: string (link or error-message)}
   const data = await response.json();
   console.log(data.message);
  window.open(data.message);
}
