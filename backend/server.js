require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;
const { logger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler')
const auth = require('./middlewares/auth')

app.use(cors({
    origin: process.env.HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));;
app.use(express.json()); //bodyban érkező json parseolásáért felel
app.use(logger); //minden hívásnál automatikusan lefut ez a middleware
// app.use(auth); //de ezt nem akarom minden endpointál meghívni, ezért elehlyezhetem másként, a (req, res) elé
// app.use(auth()); //így is használható

app.get('/api/public', (req, res) => {
    console.log('public');
    res.send('Hello world! - public');
})

app.get('/api/private', auth({ block: true }), (req, res) => {
    console.log('private');
    res.send(`Hello world! - private ${res.locals.userID}`);
})

app.get('/api/prublic', auth({ block: false }), (req, res) => {
    console.log('pRublic');
    if (!res.locals.userID) return res.send("Hello world! - pRublic");
    res.send(`Hello world! - pRublic ${res.locals.userID}`);
})

app.use(errorHandler) //utolsóként regisztráljuk, app.get és route se legyen már utána

app.listen(port, () => {
    console.log(`To do app is listening on port ${port}`)
})