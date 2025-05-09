// import {express} from 'express';
// import {} from 'cors';
// import {mongoose} from 'mongoose';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Ensure the uploads directory exists
if (!fs.existsSync('uploads/')) {
    fs.mkdirSync('uploads/');
}


const app = express();
const port = 3000;

app.use(express.json())
app.use(cors());
app.use('/uploads', express.static('uploads'));

// zsldkjfsf
// sdfoisrofsor
mongoose.connect('mongodb+srv://zsldkjfsf:sdfoisrofsor@cluster0.iwz5if1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


//
//
// Database Schema
//
//

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    title: String,
    caption: String,
    location: String,
    people: String,
    date: String,
    imageOrVideo: String
});

const Post = mongoose.model('Post', postSchema);

//
//
// APIs
//
//

app.get('/', (req, res) => {
    res.send({
        message: "Hello, you are on the home api"
    });
});

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email, password});

    if (user) {
        res.send({
            login: true,
            user
        });
    } else {
        res.status(401).send({
            login: false
        });
    }
});

app.post('/signup', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const id = await User.countDocuments() + 1;


    const user = new User({
        id,
        name,
        email,
        password
    });

    await user.save();

    res.send({
        user
    });
});


app.get('/posts', async (req, res) => {
    const posts = await Post.find({});

    res.send({
        posts
    });
});


app.post('/make-post', upload.single('imageOrVideo'), async (req, res) => {
    console.log(req.body)
    console.log(req.file);

    const userId = req.body.userId;
    const title = req.body.title;
    const caption = req.body.caption;
    const location = req.body.location;
    const people = req.body.people;
    const imageOrVideo = req.file ? req.file.path : null;

    const id = await Post.countDocuments() + 1;

    const post = new Post({
        id,
        userId,
        title,
        caption,
        location,
        people,
        date: new Date(),
        imageOrVideo
    });

    await post.save();

    res.send({
        post
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
