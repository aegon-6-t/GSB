const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const userRoute = require('./routes/user_route')
const authenticationRoute = require('./routes/authentication_route')
const billRoute = require('./routes/bill_route')
const cors = require('cors');

require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
db.on('error', (err) => { console.log('Error connecting to MongoDB', err) })
db.on('open', () => { console.log('Connected to MongoDB')})

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL de votre frontend
  credentials: true // Pour permettre l'envoi des cookies si nécessaire
}));

app.use(express.json())
app.use('/users', userRoute)
app.use('/auth', authenticationRoute)
app.use('/bills', billRoute)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});