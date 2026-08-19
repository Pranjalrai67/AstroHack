require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 5050;

app.listen(PORT, (error) => {
    if (error) {
        console.log("Server failed to start:", error);
        return;
    }

    console.log(`Server is running on http://localhost:${PORT}`);
});