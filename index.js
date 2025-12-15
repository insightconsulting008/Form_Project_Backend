const express = require('express')
const cors = require('cors')
const app = express()
const masterFields = require('./src/Dashboard/masterFields')
const form = require('./src/Dashboard/form')
const users = require('./src/UserRoutes/user')

app.use(cors());              // Enable CORS
app.use(express.json());      // Parse JSON body

// Test Route
app.get('/api/test', (req, res) => {
    res.json({
        message: "API is working fine!"
    });
});

app.use('/api/dashboard/master-fields',masterFields)
app.use('/',form)
app.use('/',users)



// Server
app.listen(7001, () => {
    console.log("🚀 Server is running on port 7001");
    console.log("🌐 API Base URL: http://localhost:7001");
});
