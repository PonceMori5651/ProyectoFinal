module.exports = ()=>{
    return {
        db_user : process.env.DB_USER,
        db_name : process.env.DB_NAME,
        db_password: process.env.DB_PASSWORD,
        db_host: process.env.DB_HOST
    }
}
