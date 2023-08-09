const {db} = require('../config/db_SQL.js');

const Login = async (props) =>{

    console.log(props);
    const {username,password} = props
    try{
        console.log('my props are:', username,password);
        return  db('users')
        .select("*")
        .where({username,password})
        .returning('*')
        
    }
    catch(err) {
        console.log(`from registe_new_user:`, err);
    }
}
module.exports = Login