const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const connection = mongoose.connection

connection.once('open', () => {
 
    console.log('Connected to database!')

}).catch((e) => {

    console.log('connection failed')

})