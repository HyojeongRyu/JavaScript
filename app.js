const express = require('express');
const app=express();
// const crud = require('./crud.js');
const bodyparser=require('body-parser');
const sendQuery = require('./database.js');
var port=3000;
app.use(bodyparser.json()); //parsing application/json
app.use(bodyparser.urlencoded({extended: false}));
app.get('/',function(req,res){
    res.send("Hi");
});

app.get('/usedb',function(req,res){
  var db_name = req.body.db_name;
  var query = `use ${db_name}`;
  sendQuery(query);
  res.send(`use ${db_name}`);
})

app.get('/createdb',function(req,res){
  var db_name = req.body.db_name;
  var query = `create database ${db_name}`;
  sendQuery(query);
  res.send(`create db: ${db_name}`);
})

app.post('/createtable',function(req,res){
  var t_name = req.body.t_name;
  var col1 = req.body.col1;
  var col1_type = req.body.col1_type;
  var col2_type = req.body.col2_type;
  var col2 = req.body.col2;
  var query = `create table ${t_name} (${col1} ${col1_type} not null auto_increment, ${col2} ${col2_type}, primary key(${col1}))`;
  sendQuery(query);
  res.send(`create table: ${t_name}`);
})

app.get('/readdb',function(req,res){
  var query = `show databases`;
  sendQuery(query);
})

app.get('/readtable',function(req,res){
  var query = `show tables`;
  sendQuery(query);
})

app.get('/renametable',function(req,res){
  var t_name = req.body.t_name;
  var n_tname = req.body.n_tname;
  var query = `alter table ${t_name} rename ${n_tname}`;
  sendQuery(query);
  res.send(`${t_name}->${n_tname}`);
})

app.post('/insertdata',function(req,res){
  var t_name = req.body.t_name;
  var col1 = req.body.col1;
  var col2 = req.body.col2;
  var data1 = req.body.data1;
  var data2 = req.body.data2;
  var query = `insert into ${t_name} (${col1}, ${col2}) values('${data1}', '${data2}')`;
  sendQuery(query);
  res.send(`insert ${data1}, ${data2} into ${col1}, ${col2}`);
})

app.post('/deletedata',function(req,res){
  var table = req.body.table;
  var if_col = req.body.if_col;
  var if_data= req.body.if_data;
  var query = `delete from ${table} where ${if_col} = ${if_data}`;
  sendQuery(query);
  res.send(`delete from ${table} where ${if_col} = ${if_data}`);
}
)

app.listen(port,function(){
  console.log(`Listening port ${port}...`);
});