const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const landmarksRoutes = require('./endpoints/landmarks');
const routesRoutes = require('./endpoints/routes');
const { connectToDatabase, closeConnection } = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(express.json());

// endpoints
app.get('/', (req, res) => {
    res.send('hi,from backend');
});

app.use('/api/landmarks', landmarksRoutes);
app.use('/api/routes', routesRoutes);


// start server
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Failed to start server", error);
    process.exit(1);
});

// shutdown server
process.on('SIGINT', () => {
    closeConnection().then(() => {
        process.exit(0);
    }).catch(error => {
        console.error("Error closing connection on shutdown", error);
        process.exit(1);
    });
});







