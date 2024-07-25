const mysql = require("mysql");

module.exports = {
    createUser: async (pool, username, userpwd, Fname, Lname, email, role_id) => {
        var sql = "INSERT INTO users ( user_name, user_pwd, first_name, last_name, email, role_id) "
            + "VALUES (?, MD5(?), ?, ?, ?, ?)";
        sql = mysql.format(sql, [username, userpwd, Fname, Lname, email, role_id]);

        return await pool.query(sql);
    },

    getByuserId: async (pool, UserId) => {
        var sql = "SELECT * FROM users WHERE user_id = ?";
        sql = mysql.format(sql, [UserId]);

        return await pool.query(sql);
    },

    updateUser: async (pool, UserId, username, password, Fname, Lname, email, role_id) => {
        var sql = "UPDATE users SET "
            + "user_name=?,"
            + "user_pwd=MD5(?),"
            + "first_name=?,"
            + "last_name=?,"
            + "email=? "
            + "WHERE users.user_id = ?";

        sql = mysql.format(sql, [username, password, Fname, Lname, email, role_id, UserId]);

        return await pool.query(sql);
    },

    deleteUser: async (pool, UserId) => {
        var sql = "DELETE FROM users WHERE user_id = ?";
        sql = mysql.format(sql, [UserId]);

        return await pool.query(sql);
    },

}