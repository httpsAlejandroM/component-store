import Users from "../models/users";
import getUserInfo from "../utils/getUserInfo";

const getAllUsers = async () => {
    const allUsers = await Users.find()
    return allUsers
}

const loginUser = async (email:string, password:string) => {
    const userByEmail = await Users.findOne({email:email})
    if(userByEmail) {
        const correctPassword = await userByEmail.comparePassword(password, userByEmail.password)
        if(correctPassword){
            const accessToken = userByEmail.creacteAccessToken()
            const refreshToken = await userByEmail.creacteRefreshToken()
            return {
                accessToken,
                refreshToken,
                userInfo: getUserInfo(userByEmail)
            }
        }
        else{
            return "User or password incorrect"
        }
        
    }
    else {
        return "User not found"
    }


}


const createUser = async (name:string, email:string, userName:string, password:string) => {
    const newUser = new Users({name, email, userName, password}) //otra opcion const newUser = await Users.create({name, email, userName, password})
    const exist = await newUser.userNameExist(userName)
    
    if(exist) return "Username already exist"

    return await newUser.save()
}



export {
    getAllUsers,
    loginUser,
    createUser
}