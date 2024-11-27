const express = require('express');
const cors = require('cors');
const { authRoutes, contactRoutes, profileRoutes, ProductRoutes, MediaManagerRoutes, OrderRoutes, cartRoutes } = require('./routes');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/auth', authRoutes);
app.use('/Contact', contactRoutes)
app.use('/profile', profileRoutes)
app.use('/product', ProductRoutes)
app.use('/media', MediaManagerRoutes)
app.use('/orders', OrderRoutes);
app.use('/cart', cartRoutes);


app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
