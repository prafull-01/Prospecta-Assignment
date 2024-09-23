const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const FAKE_STORE_API_URL = 'https://fakestoreapi.com';

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Task 1: List product details by category
app.get('/products/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const response = await axios.get(`${FAKE_STORE_API_URL}/products/category/${category}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
});

// Task 2: Add a new product
app.post('/products/add', async (req, res) => {
    const newProduct = req.body;
    try {
        const response = await axios.post(`${FAKE_STORE_API_URL}/products`, newProduct);
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
