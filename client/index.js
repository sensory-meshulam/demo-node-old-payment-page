
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
   const response = await fetch(`${apiUrl}/api/Payment/GetPaymentLink`, options); //response in format {isSuccess: boolean, message: string (link or error-message)}
   const data = await response.json();
   console.log(data.message)
   growPayment.renderPaymentOptions(data.message)
}

window.addEventListener("growWalletChange", (result) => {
    console.log("result:", result.detail);
    let res = result.detail;
    if (res.status === 1) { //res.status === 1 it means that the payment was made successfully
      resultStatus = true;
      resultData = res.data;
    }
    if (res.state === "close" && resultStatus) {
      // Now you can access the success page, and also send data to it via the URL
      console.log(resultData);
      const searchParams = new URLSearchParams(resultData);      
      window.open(`http://localhost:4200/client/success.html?${searchParams.toString()}`)
    }
  });

  //blabla