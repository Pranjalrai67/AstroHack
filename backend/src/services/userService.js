const User = require('../models/user');

const createUser = async(userData) => {
    const {name, email, passwordHash} = userData;

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error("user already exist")
    }

    const user = await User.create({
        name,
        email,
        passwordHash,
    });

    return user;
}

module.exports = {
    createUser,
}