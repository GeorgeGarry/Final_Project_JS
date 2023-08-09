const {db} = require('../config/db_SQL.js');


const Register_new_user = async (props) =>{
    console.log("Register_new_user.js",props);
    const {email,username,password} = props
    try{
        return  db('users')
        .insert({email,username,password})
        .returning("*")
        
    }
    catch(err) {
        console.log(`from registe_new_user:`, err);
    }

}

module.exports = Register_new_user;