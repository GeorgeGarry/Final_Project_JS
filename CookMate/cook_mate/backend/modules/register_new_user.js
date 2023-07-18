const {db} = require('../../config/db_SQL.js');


const Register_new_user = async (props) =>{
    console.log(props);
    const {email,username,password} = props
    try{
        return  db('users')
        .insert({email,username,password})
        .returning("*")
        
    }
    catch(err) {console.log(`from DB:`, err)}

}

module.exports = Register_new_user;