require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error('MONGO_URI is not defined in .env file');
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

async function closeConnection() {
    try {
        await client.close();
    } catch (error) {
        console.error("Error closing MongoDB connection", error);
    }
}

module.exports = {
    connectToDatabase,
    closeConnection,
    client
};
