import Users from "../models/users";

const getAllUsers = async () => {
    const allUsers = await Users.find()
    return allUsers
}

export {
    getAllUsers,
}