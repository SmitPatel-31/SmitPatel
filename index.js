const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose');
const todo_list = require('./models/todo');

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('assets'));


//Controller 1 ->On the home page we show the list of all todo list
app.get('/', function (req, res) {

    todo_list.find({}, function (err, todo_lists) {
        if (err) {
            console.log("Error in fetching todo lists from db");
            return;
        }
        return res.render('home', {
            title: "Todo List",
            todo_list: todo_lists
        })

    })
})

//Controller 2 ->On the Update Todo page we show the data of todo list by id
app.get('/getbyId', function (req, res) {
    console.log(req.query);
    let id = req.query.id;
    todo_list.findById(id, function (err, updateTodo) {
        if (err) {
            console.log("Error in fetching todo lists from db");
            return;
        }
        return res.render('editTodo', {
            title: "Update Todo List",
            updateTodo: updateTodo
        })
    })
})

//Controller 3 -> Creating new Todo task
app.post('/create-todo', function (req, res) {
    console.log(" after req-->", req.body);
    todo_list.create({
        Description: req.body.Description,
        Category: req.body.Category,
        Due_Date: req.body.Due_Date
    }, function (err, newList) {
        if (err) {
            console.log(`Error in creating a todo list-->`, err);
            res.sendStatus = 400;
            return;
        }
        console.log(`******`, newList);
        console.log('res->', res);
        res.sendStatus = 200;
        return res.redirect('/');
    })
});

//Controller 4 -> Deleting Todo task single or multiple based on checkbox selection
app.get('/delete-multiple-todo', function (req, res) {
    // console.log(req.body);
    let id = req.query.id;
    console.log(id);
    todo_list.deleteMany({_id:{$in:id}}, function (err) {
        if (err) {
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('/');
    });
});

//Controller 5 -> Deleting single todo task at a time
app.get('/delete-todo',function(req,res){
    let id = req.query.id;
    console.log(id);
    todo_list.findByIdAndDelete(id,function(err,todo){
        if(err){
            console.log("Error in deletng a todo: ",err);
            return;
        }
        return res.redirect('back');
    })
})

//Controller 6 -> Updating requested Todo task by id
app.post('/update-todo', function (req, res) {
    let id = req.query.id;
    console.log('print1--->', id);

    todo_list.findByIdAndUpdate(id, {
        Description: req.body.Description,
        Category: req.body.Category,
        Due_Date: req.body.Due_Date
    }, function (err) {
        if (err) {
            console.log('error in updating the object');
            return;
        }
        else {
            console.log("req id :", req.body);
            return res.redirect('/');
        }
    })
})

//Controller 7 -> Filtering Todo task by Category
app.get('/getbycategory', function (req, res) {
    let Category = req.query.Category;
    console.log("111111->", req.query.Category)
    todo_list.find({ Category }, function (err, todo_lists) {
        if (err) {
            console.log("Error in fetching todo lists from db", err);
            return;
        }
        console.log("todo_lists---->", todo_lists)
        return res.render('home', {
            title: "Todo List",
            todo_list: todo_lists
        })
    })

})

app.listen(port, function (err) {
    if (err) {
        console.log(`Error : `, err);
    }
    else {
        console.log(`Port is running at ${port}`);
    }
})


