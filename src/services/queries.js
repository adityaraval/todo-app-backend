//create table users

// CREATE TABLE IF NOT EXISTS `tbl_users` (
//   id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
//   email varchar(255) NOT NULL,
//   hashed_password varchar(255) NOT NULL,
//   name varchar(255) NOT NULL,
//   active BOOLEAN DEFAULT true,
//   UNIQUE (email)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

//create table todos

// CREATE TABLE IF NOT EXISTS `tbl_todos` (
//   id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
//   date varchar(255) NOT NULL,
//   title varchar(255) NOT NULL,
//   completed BOOLEAN DEFAULT false,
//   user_id int,
//       CONSTRAINT fk_users
//     FOREIGN KEY (user_id)
//         REFERENCES tbl_users(id)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

const create_user =
  `INSERT INTO tbl_users(email,name,active,hashed_password) VALUES(?, ?, ?, ?)`;

const update_user_profile =
  `UPDATE tbl_users SET tbl_users.name = ?, tbl_users.email = ? WHERE tbl_users.id = ?`;

const update_user_password =
`UPDATE tbl_users SET tbl_users.hashed_password = ? WHERE tbl_users.id = ?`;

const get_user =
  `SELECT * FROM tbl_users WHERE tbl_users.id = ?`;

const get_user_by_email =
  `SELECT * FROM tbl_users WHERE tbl_users.email = ?`;

const create_todo =
  `INSERT INTO tbl_todos(date,title,completed,user_id) VALUES(?, ?, ?, ?)`;

const get_all_todo =
  `SELECT * FROM tbl_todos WHERE tbl_todos.user_id = ?`;

const get_todo =
`SELECT * FROM tbl_todos WHERE tbl_todos.id = ? AND tbl_todos.user_id = ?`;

const update_todo =
  `UPDATE tbl_todos SET tbl_todos.title = ?, tbl_todos.date = ? WHERE tbl_todos.id = ? AND tbl_todos.user_id = ?`;

const complete_todo =
  `UPDATE tbl_todos SET tbl_todos.completed = ? WHERE tbl_todos.id = ? AND tbl_todos.user_id = ?`;

const delete_todo =
  `DELETE FROM tbl_todos WHERE tbl_todos.id = ? AND tbl_todos.user_id = ?`;

module.exports = {
  create_user,
  update_user_profile,
  update_user_password,
  get_user,
  get_user_by_email,
  create_todo,
  get_all_todo,
  get_todo,
  update_todo,
  delete_todo,
  complete_todo
}