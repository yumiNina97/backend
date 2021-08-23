//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();
var tasks = []
var surrogatekey = 1;

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

// Crear una nueva tarea
app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = surrogatekey++;
    req.body.state = "pending";
    tasks.push(req.body);
    res.send("OK");
});

//listar
app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});


app.listen(3000, () => {
    console.log("Servidor HTTP funcionando OK!");
});


// bucar
app.get("/tasks/:taskId", (req, res, next) => {
    const id = req.params.taskId;
    const i = tasks.findIndex(x => x.id == id);
    res.json(tasks[i]);
});


//borrar
app.delete("/tasks/:taskId" , jsonParser, (req, res, next) => {
    const id = req.params.taskId;
    const i = tasks.findIndex(x => x.id == id );
    console.log(i)
    if (i>=0){
        tasks.splice(i,1);
        res.send("delete " + req.params.taskId);
    } else
        res.send("Not found")
    
    
});

//editar
app.put("/tasks/:idtask", jsonParser, (req, res, next) => {
    console.log(req.query.state);
    console.log(req.idtask);
    if(req.query.state != null){
        const id = req.params.idtask;
        for(i = 0; i < tasks.length; i++){
            if(tasks[i].id == id){
                tasks[i].state = req.query.state;
                res.send("OK");
            }
        }
        res.send("No se encontro la tarea ERROR!");
    }
    if(req.body != null){
        const id = req.params.idtask;
        for(var i = 0; i < tasks.length; i++){
            if(tasks[i].id == id){
                req.body.id = tasks[i].id;
                req.body.state = tasks[i].state;
                tasks[i] = req.body;
                res.send("OK");
            }
        }
        
        res.send("No se encontro la tarea ERROR!");
    }
    
});

