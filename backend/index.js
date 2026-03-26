const express = require('express');
const connectDB = require('./database/db');
 const dotenv = require('dotenv');
 const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();


const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users',userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});

