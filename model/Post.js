import  mongoose  from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        enum: ['technology', 'education', 'fashion'],
    },
    image: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const POST = mongoose.model("POST", postSchema);
// module.exports = BLOG;/
export default POST;
