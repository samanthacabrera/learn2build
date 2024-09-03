const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://samanthancabrera:iS1Q5FkG0zWktD7U@learn2build.wpvk6.mongodb.net/?retryWrites=true&w=majority&appName=learn2build";

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
