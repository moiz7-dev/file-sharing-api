const path = require('path');
const express = require('express');
const app = express();
require('../src/db/mongoose')

const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Template/Views'))

// routers
app.get('/', (req, res) => {
    res.render('index')
})
app.use('/api', require('../src/routes/files'))
app.use('/files', require('../src/routes/show'))

app.listen(port, () => {
    console.log(`Server is up on ${port}`)
})