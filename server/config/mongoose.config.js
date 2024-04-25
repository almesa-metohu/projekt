const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/bookingApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Something went wrong when connecting to the database", err))