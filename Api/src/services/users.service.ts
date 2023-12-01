import users from "../models/users";
import Users from "../models/users";

const getAllUsers = async () => {
    const allUsers = await Users.find()
    return allUsers
}

const UserByEmail = async (email:string, password:string) => {
    const userByEmail = Users.find({email:email})
    return userByEmail
}


const createUser = async (name:string, email:string, userName:string, password:string) => {
    const newUser = new Users({name, email, userName, password}) //otra opcion const newUser = await Users.create({name, email, userName, password})
    const exist = await newUser.userNameExist(userName)
    
    if(exist) return "Username already exist"

    return await newUser.save()
}



export {
    getAllUsers,
    UserByEmail,
    createUser
}