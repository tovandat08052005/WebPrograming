const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/products', (req, res) => {
    res.send('GET request - Retrieve list of products');
});

app.post('/products', (req, res) => {
    const newProduct = req.body;
    res.send(`POST request - Add a new product: ${JSON.stringify(newProduct)}`);
});

app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    res.send(`PUT request - Update product with ID: ${productId}, Data: ${JSON.stringify(updatedProduct)}`);
});

app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    res.send(`DELETE request - Delete product with ID: ${productId}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
