import { db } from "../../backend/config/db_SQL";

const test_for_db = async() =>{
    return db(`users`)
            .select('*')
            .returning("*")
}
module.exports = {test_for_db};