// module
import express from 'express';
import mongoose from 'mongoose';


// model
import POST from './model/Post.js';

const username = "rafebhai0";
const password = "ASDFGHJKL";
const PORT = process.env.PORT ||8000

const app = express();
app.use(express.json())

// data bash connaction
const DB = `mongodb+srv://${username}:${password}@blog.ut2ifig.mongodb.net/blog?retryWrites=true&w=majority`;
mongoose.connect(DB, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connection established.')).catch((error) => console.error("MongoDB connection failed:", error.message))




// start
const CREATE_POST = async (req, res) => {
    const { title, tag, image } = req.body;
    console.log(req.body)
    if (!title || !tag || !image) { //user should fill all feild 
        return res.status(422).json({ error: "plz fill all feild" })
    }
    try {

        console.log("Sssssssssss")
        const CREATE_POST = new POST({ title, tag, image });
        await CREATE_POST.save();
        console.log("Sssssssssss")

        res.status(200).json({ message: 'post are saved successfully' });



    } catch (error) {
        res.status(500).json(error);
    }
}
const GET_POST = async (req, res) => {
    try {
        const GET_POST = await POST.find();
        res.status(200).send(GET_POST);
        console.log("gdfgfhgfd")
    } catch (e) {
        res.status(401).send(e, "Error is Get");
    }
}
const GET_POST_TAG = async (req, res) => {
    let tag = req.params.tag;
    try {
        const GET_POST_TAG = await POST.find({ tag });
        res.status(200).send(GET_POST_TAG);

    } catch (e) {
        res.status(401).send(e, "Error is Get");
    }
}
const DELETE_POST = async (req, res) => {
    try {
        const _id = req.params.id;
        const Delete = await POST.findByIdAndDelete(_id);
        res.status(200).send(Delete);
    } catch (e) {
        res.status(500).send(e);
    }
}
const UPDATE_POST = async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(req.body)
        const Update = await POST.findByIdAndUpdate(_id, req.body, { new: true });
        console.log(req.body)
        res.status(200).send(Update);
    } catch (e) {
        res.status(500).send(e);
    }
}
//  API'S ROUTE
// ----||  ROUTE : CONTACT
app.get('/apis/post', GET_POST)
app.post('/apis/post', CREATE_POST)
app.get('/apis/post/:tag', GET_POST_TAG)
app.delete('/apis/post/:id', DELETE_POST)
app.patch('/apis/post/:id', UPDATE_POST)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
