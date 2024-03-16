import mongoose from 'mongoose';

require('dotenv').config();

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: process.env.USER_ROLE || 'user' }
});

const User = mongoose.model('User', userSchema);

export default User;