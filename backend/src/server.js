require("dotenv").config()
const connectDB = require('./db/db')
const app = require('./app')

const PORT = 3000;

const startServer = async () => {
    try {
        // await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start:", error.message);
        process.exit(1);
    }

};

startServer();