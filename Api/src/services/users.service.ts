import Users from "../models/users";

const getAllUsers = async () => {
    const allUsers = await Users.find()
    return allUsers
}

const UserByEmail = async (email:string) => {
    const userByEmail = Users.find({email:email})
    return userByEmail
}

const createUser = async (name:string, email:string, userName:string) => {
    const newUser = await Users.create({name, email, userName}) // otra opcion => new Users(....) return await newUser.save()
    return newUser
}

export {
    getAllUsers,
    UserByEmail,
    createUser
}