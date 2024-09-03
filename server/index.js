const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToDatabase, closeConnection } = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Failed to start server", error);
    process.exit(1);
});

process.on('SIGINT', () => {
    closeConnection().then(() => {
        process.exit(0);
    }).catch(error => {
        console.error("Error closing connection on shutdown", error);
        process.exit(1);
    });
});


app.get('/', (req, res) => {
    res.send('Welcome to the learn2build API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});










