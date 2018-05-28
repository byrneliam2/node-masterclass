const Twitter = require('twitter');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const subjects = [];

// this was public already, oh well...
var client = new Twitter({
    consumer_key: '<ckey>',
    consumer_secret: '<csecret>',
    access_token_key: '<atk>',
    access_token_secret: '<ats>'
  });

  // Middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/subjects', (request, response) => {
    response.json(subjects);
});

app.post('/api/subjects', (request, response) => {
    let newSubject = request.body.subject;
    subjects.push(newSubject);

    response.redirect('/'); // Refresh page
});

// app.get('/', (req, res) => res.send('Hello World!'));
// app.get('/whosthere', (req, res) => res.send('What are you looking here for?'));

app.get('/api/results', (req, res) => {
    client.get('search/tweets', { q: subjects.join(' OR '), count: 25 }, function(error, tweets, response) {
        res.json(tweets);
    });
});

app.listen(3000, () => console.log('Our app is listening on port 3000!'));