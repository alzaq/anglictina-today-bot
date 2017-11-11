const express = require('express');

const app = express();
//app.set('trust proxy', 1); // trust first proxy 
//app.use(express.static('public'));

app.get('*', (req, res) => {
  const path = req.path; // string
  const url = path.substr(1).split('/'); // array
  const params = req.query; // object

  
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "qsHVJvSYKC1fNClouwxzH62ERud9syhFakc7RBAH"
  
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }

});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is listening on ' + (process.env.PORT || 5000));
});

