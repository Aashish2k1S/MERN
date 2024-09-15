import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import router from './routes/productRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fix to properly handle __dirname in ES module
const __dirname = path.resolve();

// Middleware to parse incoming JSON data
app.use(express.json());

// INITIAL ROUTE
// app.get('/', (req, res) => {
//     res.send('Welcome to API');
// });

// Middleware to access /products API
app.use('/api/products', router);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {

    // Serve static files from frontend/dist
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

    // Catch-all route for client-side routing in production
    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'), (err) => {
            if (err) {
                res.status(500).send(`Error: ${err.message}`);
            }
        });
    });
}

// Start the server
app.listen(PORT, async () => {
    try {
        await connectDB(); // Ensure DB connection is established
        console.log(`Server started at http://localhost:${PORT}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure in case of DB connection error
    }
});
