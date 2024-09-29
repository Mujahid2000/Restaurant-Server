const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const Menu = require('./src/Schema/Menu');
const MenusItems = require('./src/Schema/MenuItems');
const Package = require('./src/Schema/Package');
const MenuItemSingle = require('./src/Schema/PackageSingleData');
const PackageSchema = require('./src/Schema/Data');
const CartSchema = require('./src/Schema/Cart');
// const e = require('express');
const { ObjectId } = require('mongodb');
const WishList = require('./src/Schema/WishList');
const OrderSchema = require('./src/Schema/Proceed');



dotenv.config();


const app = express();
connectDB();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Restaurant Server is running ');
 });


 app.get('/recipe', async (req, res) => {
    try {
        const result = await Menu.find();
       
        res.json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
 app.get('/menus', async (req, res) => {
    try {
        const result = await MenusItems.find();
        
        res.json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

app.get('/allMenus', async(req, res) =>{
    try {
        const menu = MenuItemSingle.aggregate([
            {
                $project:{
                    combineArray: {
                        $concatArrays: ["$breakfast", "$lunch", "$dinner", "$starters", "$beverages"]
                    }
                }
            }
        ])
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

app.get('/allMenu', async (req, res) => {
    try {
      const menus = await MenuItemSingle.find(); // Get all items
      res.json(menus);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  
app.get('/dataMenu/:category', async(req, res) =>{
    try {
        const category = req.params.category;
        const packageData = await PackageSchema.find({category : category});
        res.json(packageData)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

app.get('/dataMenu', async(req, res) =>{
    try {
        const packageData = await PackageSchema.find();
        res.json(packageData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})


app.get('/newMenu/:id', async(req, res) =>{
    try {
        const id = req.params.id;
        const response = await PackageSchema.findById(id);
        res.json(response)
    } catch (error) {
        console.error(error, 'server error')
    }
})




app.get('/recipe/:id', async(req, res) =>{
    try {
        const id = req.params.id;  
        const result = await Menu.findById(id);        
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
})

app.post('/cart', async(req, res) =>{
    const { itemId, name, price,quantity, image, Email,CustomerName } = req.body;
    if (!itemId || !name || !price || !image || !Email || !CustomerName) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }
    try {
        const newCartItem = new CartSchema({itemId, name, price, image, Email, CustomerName});
        // Save to the database
        await newCartItem.save();
        // Send success response
        res.status(201).json({ message: 'Item added to cart successfully!', cartItem: newCartItem });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
})


app.post('/wishList', async(req, res) =>{
    const { itemId, name, price, quantity, image, Email,CustomerName } = req.body;
    if (!itemId || !name || !price || !quantity|| !image || !Email || !CustomerName) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }
    try {
        const newCartItem = new WishList({itemId, name, price, image, Email, CustomerName});
        // Save to the database
        await newCartItem.save();
        // Send success response
        res.status(201).json({ message: 'Item added to cart successfully!', cartItem: newCartItem });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
})


app.post('/proceed', async(req, res) =>{
    const {email, payment, CardNumber, SecurityCode, CouponCode,finalTotal,total, data} = req.body;


    if(!email, !payment, !CardNumber, !SecurityCode, !CouponCode, !finalTotal, !total, !data){
        console.log('please give the valid data');
        return res.status(400).json({message: 'please provide all requirements field'})
    }
    try {
        const orderData = new OrderSchema({email, payment, CardNumber, SecurityCode, CouponCode,finalTotal,total, data});
        await orderData.save();
        res.status(201).json({message: 'data added success'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
})


app.get('/cart/:email', async(req, res) =>{
    const email = req.params.email;
    try {
        const result = await CartSchema.find({Email: email});
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
})


app.get('/wishList/:email', async(req, res) =>{
    const email = req.params.email;
    try {
        const result = await WishList.find({Email: email});
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
})



app.delete('/cartDataDelete/:id', async (req, res) => {
    const id = req.params.id;
   
    try {
      const filter = { _id: new ObjectId(id) };
      const result = await CartSchema.deleteOne(filter);
  
      if (result.deletedCount === 1) {
        res.send({ message: 'Item successfully deleted' });
      } else {
        res.status(404).send({ message: 'Item not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });


  app.delete('/wishListDataDelete/:id', async(req, res) =>{
    const id = req.params.id;

    try {
        const filter = {_id : new ObjectId(id) };
        const result = await WishList.deleteOne(filter);
        if(result.deletedCount === 1){
            res.send({message: 'Item successfully deleted'})
        }else{
            res.status(404).send({message: 'Item not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
  })

app.post('/recipe', async (req, res) => {
    try {
        const { name, price, description, image } = req.body;

        // Validation: Check if all required fields are provided
        if (!name || !price || !description || !image) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        const newMenuItem = new Menu({
            name,
            price,
            description,
            image
        });

        const result = await newMenuItem.save();
        res.status(201).json(result);  // 201 indicates resource created
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});


