const express = require('express');
const github = require('../helpers/github');
const db = require('../database/index');
const bodyParser = require('body-parser');



let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.post('/repos', function (req, res) {
  const username = req.body.username;

  github.getReposByUsername(username, (data) => {
    db.save(data);
    res.status(200).send('GOT IT');
  });
 
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find(
    (error, data) => {
      res.status(200).send(data);
    }
  );

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

