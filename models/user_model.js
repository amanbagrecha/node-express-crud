import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var user_model = mongoose.model('user_model', postSchema);

export default user_model;