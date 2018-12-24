module.exports = {
    sql_sentence: {
        show_all: 'select * from allfile',
        find_file: 'select * from allfile where file_name = ?;',
        user_verify: 'select * from user where user_name=?;',
        // admin_verify: 'select * from admin where admin_name=?',
        add_file: "insert into allfile (file_name,file_type,file_path) values(?,?,?)",
        register: 'insert into user (user_name,user_psw,isadmin) values (?,?,?)'
    }
}