const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/devopsdb')
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', ItemSchema);

app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const item = new Item({ name: req.body.name });
    await item.save();
    res.json(item);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
