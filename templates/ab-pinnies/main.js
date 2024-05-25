// This function runs before a transaction.
//Merchant codes for pinnies
//5499 : "Checkers"
//5541 : "Engin
//5172 : "Willow Way fitness"
//5542 : "Luckies"
const fuelCodes = ['5499', '5541', '5172', '5542'];
const beforeTransaction = async (authorization) => {  
  console.log(authorization);
  if (fuelCodes.indexOf(authorization.merchant.category.code) > -1) {
    return true;
  }
  return false;  
};


// This function runs after a transaction was successful.
const afterTransaction = async (transaction) => {
  await notifyabpinnies(transaction);
  console.log(transaction);
};


// This function runs after a transaction was declined.
const afterDecline = async (transaction) => {
  console.log(transaction);
};

//custom AB-pinnies call
async function notifyabpinnies(authorization) { 
        const apiUrl = process.env.abpinniesURL;

        // API key to identify user in transaction rewards system
        const apiKey = process.env.apiKey;

        // Create a JSON object to be sent as a parameter
        const jsonObject = {
            transactionId: authorization,
            //amount: 100000,
        };

        // Convert the JSON object to a string
        const jsonString = JSON.stringify(jsonObject);

        // Define the request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: jsonString,
        };

        // Make the API call
        fetch(apiUrl, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Response from Transaction rewards system:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
}


