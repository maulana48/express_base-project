const responseHelper = require('express-response-helper').helper();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/models/index');

const app = express()
const port = 3000

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// attach the middleware before any route definition
app.use(responseHelper);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to bezkoder application."
    });
});

app.get('/', (req, res) => {
    res.send('test')
})

app.get('/user', async (req, res) => {
    // The usual way (without express-response-helper)
    // res.status(200).json({ name: 'john' });

    // But with express-response-helper;
    res.respond({
        users: await db.User.findAll()
    }, 200);
});

app.get('/404', function (req, res) {
    // The usual way (without express-response-helper)
    // res.status(404).send('Resoure Not Found');

    // But with express-response-helper;
    res.failNotFound('Resource Not Found');

    // This returns a response like this:
    /*
      {
        "status": 404,
        "error": "404",
        "messages": "Resoure Not Found"
      }
    */
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})