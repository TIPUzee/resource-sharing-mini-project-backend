const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {

    const age = req.body.age;

    res.send({
        message: "Hello World, " + age
    });
});

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    res.send({
        message: "Hello World, " + username + " " + password
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
