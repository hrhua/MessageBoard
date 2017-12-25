var db_conf = require('./db_conf');
var connection = db_conf.getConnection();

/**
 * 查询数据接口
 * @param req
 * @param res
 */
exports.getData = function (req, res) {
    var sql = "select * from tb_user";
    var data = {};  /*新建对象*/

    connection.query(sql, function (err, rows, fields) {
        /*rows为查询出的数据，可通过rows[i].字段 访问数据*/

        // if (err) throw err;

        for (var i = 0; i < rows.length; i++) {
            /*绑定对象*/
            data["user" + i] = {
                User : rows[i].User,
                Password : rows[i].Password
            }
        }
        return res.json(data);
    })
};

/**
 * 添加数据接口
 * @param req
 * @param res
 * @returns {*}
 */
exports.postData = function (req, res) {
    var sql = "insert into tb_user(User,Password) values('" + req.body.User + "','" + req.body.Password + "')";
    console.log(sql);
    connection.query(sql, function (err, result) {
        // if (err) {
        //     return res.send("ERROR");
        // }
    });
    return res.send(req.body.User + " : " + req.body.Password);
};

exports.getDataByID = function (req, res) {
    return res.send("get data by ID");
}

exports.putData = function (req, res) {

    // console.log(req.params.id);
    var sql = "update tb_user set Password='" + req.body.Password + "' where User='" + req.params.id + "'";
    // console.log(sql);
    connection.query(sql, function (err, result) {
        // if (err) {
        //     return res.send("ERROR:" + err);
        // }
    });
    return res.send("PUT API: " + req.params.id + " : " + req.body.Password);

}

exports.deleteData = function (req, res) {
    var sql = "delete from tb_user where User='" + req.params.id + "'";
    // console.log(sql);
    connection.query(sql, function (err, result) {
        // if (err) {
        //     return res.send("ERROR:" + err);
        // }
    });
    return res.send("DELETE API");
}

/*登陆*/
exports.signIn = function (req, res, next) {
    console.log(req.body);
    console.log(" 账号： " +req.body.User + " ,密码： " + req.body.Password);
    var sql = "select * from tb_user where User=" + "'" + req.body.User + "'" + " and Password=" + "'" +req.body.Password + "'";
    console.log(sql);

    connection.query(sql, function (err, rows, fields) {
        /*rows为查询出的数据，可通过rows[i].字段 访问数据*/
        if (rows.length > 0) {
            //<%=session.getAttribute("username")%>
            // 设置session传递用户名
            //session.setAttribute("username", username);
            return res.send("http://localhost:3000/login_state/" + req.body.User);
        } else {
            return res.send("账号或密码错误");
        }
    })
}

/*登陆*/
exports.systemLogIN = function (req, res, next) {
    console.log(req.body);
    console.log(" 账号： " +req.body.User + " ,密码： " + req.body.Password);
    var sql = "select * from tb_sys where User=" + "'" + req.body.User + "'" + " and Password=" + "'" +req.body.Password + "'";
    console.log(sql);

    connection.query(sql, function (err, rows, fields) {
        /*rows为查询出的数据，可通过rows[i].字段 访问数据*/
        if (rows.length > 0) {
            //<%=session.getAttribute("username")%>
            // 设置session传递用户名
            //session.setAttribute("username", username);
            return res.send("http://localhost:3000/system");
        } else {
            return res.send("账号或密码错误");
        }
    })
}

/*注册-查看是否有重复id*/
exports.searchUserByID = function (req, res) {
    var sql = "select * from tb_user where User=" + "'" + req.params.id + "'";
    console.log(sql);
    connection.query(sql, function (err, rows, fields) {
        /*rows为查询出的数据，可通过rows[i].字段 访问数据*/
        if (rows.length) {
            return res.send("1");
        } else {
            return res.send("0");
        }
    })
};
/*注册-添加用户*/
exports.addUser = function (req, res) {
    var sql = "insert into tb_user(User,Password) values('" + req.body.User + "','" + req.body.Password + "')";
    // console.log(sql);
    connection.query(sql, function (err, result) {
        // if (err) {
        //     return res.send("ERROR");
        // }
        return res.send("http://localhost:3000/login");
    });
};

/*插入留言*/
exports.postNote = function (req, res) {
    console.log(req.body);
    var note = req.body.Note.replace("'","''");
    console.log(req.body.Check);
    var sql = "insert into tb_notes(User,Note,Date,Param,pass) values('" + req.body.User + "','" + note + "','" + req.body.Date + "','" + req.body.Param +"','"+ req.body.Check + "')";
    console.log(sql);
    connection.query(sql, function (err, result) {
        // if (err) {
        //     return res.send("ERROR");
        // }
        return res.send("留言成功！");
    });
};

/*插入匿名留言*/
exports.postnimingNote = function (req, res) {
    console.log(req.body);
    var note = req.body.Note.replace("'","''");
    console.log(req.body.Check);
    var sql = "insert into tb_notes(User,Note,Date,Param,pass) values('" + req.body.User + "','" + note + "','" + req.body.Date + "','" + req.body.Param +"','"+ req.body.Check + "')";
    console.log(sql);
    connection.query(sql, function (err, result) {
        // if (err) {
        //     return res.send("ERROR");
        // }
        return res.send("留言成功！");
    });
};

/*查看个人历史留言*/
exports.getNoteByID = function (req, res) {
    var sql = "select User,Date,Note,Param,pass from tb_notes where User='" + req.params.id + "' order by Date desc";
    console.log(sql);
    var data = {};  /*新建对象*/
    var date;
    var getDate;
    connection.query(sql, function (err, rows, fields) {


        for (var i = 0; i < rows.length; i++) {
            date = new Date(rows[i].Date);
            getDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            /*绑定对象*/
            data[getDate] = {
                User : rows[i].User,
                Note : rows[i].Note,
                pass : rows[i].pass,
                Param : rows[i].Param
            }
        }
        console.log(data);
        return res.json(data);
    });
};

/*查看所有留言*/
exports.getAllNote = function (req, res) {
    var pass = 1;
    var sql = "select User,Date,Note,Param,pass from tb_notes where pass='"+pass+"' order by Date desc";
    //console.log(sql);
    var data = {};  /*新建对象*/
    var date;
    var getDate;
    connection.query(sql, function (err, rows, fields) {

        for (var i = 0; i < rows.length; i++) {
            date = new Date(rows[i].Date);
            getDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            /*绑定对象*/
            data[getDate] = {
                User : rows[i].User,
                Note : rows[i].Note,
                Param : rows[i].Param,
                pass : rows[i].pass
            }
        }
        //console.log(data);
        return res.json(data);
    });
};

/*查看未通过审核的留言*/
exports.getNoteUnpass = function (req, res) {
    var pass = 0;
    var sql = "select User,Date,Note,Param,pass from tb_notes where pass='" + pass + "' order by Date desc";
    console.log(sql);
    var data = {};  /*新建对象*/
    var date;
    var getDate;
    connection.query(sql, function (err, rows, fields) {


        for (var i = 0; i < rows.length; i++) {
            date = new Date(rows[i].Date);
            getDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            /*绑定对象*/
            data[getDate] = {
                User : rows[i].User,
                Note : rows[i].Note,
                pass : rows[i].pass,
                Param : rows[i].Param
            }
        }
        console.log(data);
        return res.json(data);
    });
};

/*删除留言通过用户名和留言时间*/
exports.deleteNoteByDate = function (req, res) {
    var sql = "delete from tb_notes where User='" + req.params.id + "' and Date='" + req.params.date + "'";
    console.log(sql);
    connection.query(sql, function (err, result) {
        // if (err) {co
        //     return res.send("ERROR");
        // }
        return res.send("删除成功！");
    });
};

/*管理员更新留言审核状态，改为通过，pass= 1；*/
exports.updatePass = function (req, res) {
    var sql = "update tb_notes set pass=1" + " where User='" + req.params.id + "' and Date='"+ req.params.date +"'";
    console.log(sql);
    connection.query(sql, function (err, result) {
        // if (err) {
        //     return res.send("ERROR");
        // }
        return res.send("审核成功");
    });
};