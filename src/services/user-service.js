const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { JWT_KEY } = require('../config/serverConfig')

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name=='SequelizeValidationError'){
                throw error;
            }
            console.log("Something went wrong in the service layer");
            throw {error};
        }
    }

    async signIn(email, plainPassword){
        try {
            //step 1 - get user by email
            const user = await this.userRepository.getByEmail(email);
            //step 2 - compare incoming plain password with stored encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);
            //if passwords doesn't match
            if(!passwordsMatch){
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            //if passwords match
            const newJWT = this.createToken({email:user.email, id:user.id});
            return newJWT;
        } catch (error) {
            if(error.name=='AttributeNotFound'){
                throw error;
            }
            console.log("Something went wrong in sign in process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw{error:'Invalid Token'};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id
        } catch (error) {
            console.log("Something went wrong in authentication");
            throw error;
        }

    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation");
            throw {error};
        }
    }
    checkPassword(userInputPass, encryptedPass){
        try {
            return bcrypt.compareSync(userInputPass, encryptedPass);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in Admin verification");
            throw error;
        }
    }
}

module.exports = UserService;