const express = require('express');
const apiRouter = require('./routes');
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use('/api/birdie', apiRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('HEY!')
  })

app.listen(process.env.PORT || '3000', () =>{
    console.log (`Server is running on port: ${process.env.PORT || '3000'}`);
});

