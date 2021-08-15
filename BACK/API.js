//Importamos los módulos necesarios
const express = require("express");
const app = express();
const cors = require("cors");
let mysql = require("mysql2");

//Conexión con la BBDD de mySQL
let connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Jaimecodenotch2021",
        database: "codenotch"
    }
);

connection.connect(function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Conexión correcta: ");
    }
});

//Uso del express y JSONs
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//Método GET alumnos con su filtro sobre id
app.get("/alumnos", 
    function(request, response)
        {
            let id = request.query.id;

            if (request.query.id) {
                let param = [id];
                let sql = "SELECT * FROM students WHERE student_id = ?";
                connection.query(sql, param, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.send(result[0]);
                        console.log("Se ha pedido un GET sobre la posicion: " + id);
                    }
                });
            }
            else {
                let param = [];
                let sql = "SELECT * FROM students";
                connection.query(sql, param, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.send(result);
                        console.log("Se ha pedido un GET sobre toda la lista");
                    }
                });
            }
});

//Método POST sobre alumnos
app.post("/alumnos", 
    function (request, response) {   
        console.log(request.body);
        let param = [request.body.name_student, request.body.surname_student, request.body.entryYear];
        let sql = "INSERT INTO students (name_student, surname_student, entryYear) VALUES (?, ?, ?)";
        connection.query(sql, param, function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                if (result.insertId) {
                    response.send(String(result.insertId));
                    console.log("Se ha añadido un estudiante");
                }
                else {
                    response.send(-1);
                }
            }
        });
});

//Método PUT sobre alumnos
app.put("/alumnos", function(request, response) {
    let id = request.body.id;
    let param = [];
    if (request.body.id) {
        for (let i in request.body) {
            if (request.body[i] === '') {
                request.body[i] = null;
            }
                param.push(request.body[i]);
            }
        let sql = "UPDATE students AS s SET name_student = COALESCE(?, s.name_student), surname_student = COALESCE(?, s.surname_student), entryYear = COALESCE(?, s.entryYear) WHERE student_id = ?";
        connection.query(sql, param, function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                if (result.changedRows) {
                    response.send(String(result.changedRows));
                    console.log("Se ha modificado un estudiante con id: " + id);
                }
                else {
                    response.send(-1);
                }
            }
        });
    }   
});

//Metodo DELETE alumnos
app.delete("/alumnos", function (request, response) {
    let id = request.body.id;

    if(request.body.id) {
        let param = [id];
        let sql = "DELETE FROM students WHERE student_id = ?";
        connection.query(sql, param, function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                if (result.affectedRows) {
                    response.send(String(result.affectedRows));
                    console.log("Se ha eliminado un estudiante con id: " + id);
                }
                else {
                    response.send(-1);
                }
            }
        });
    }
});

//Método GET sobre notas
app.get("/notas", 
    function(request, response)
        {
            let id = request.query.id;

            if (request.query.id) {
                let param = [id];
                let sql = "SELECT m.mark_id, sb.title, t.name_teacher, t.surname_teacher, s.name_student, s.surname_student, m.date, m.mark FROM marks AS m JOIN subjects AS sb ON(m.subject_id = sb.subject_id) JOIN students AS s ON(m.student_id = s.student_id) JOIN teachers AS t ON(m.teacher_id = t.teacher_id)  WHERE m.student_id = ?";
                connection.query(sql, param, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.send(result);
                        console.log("Se ha pedido un GET sobre la posicion: " + id);
                    }
                });
            }
            else {
                response.send(-1);
            }
});

//Método POST sobre notas
app.post("/notas", 
    function (request, response) {   
        console.log(request.body);
        let param = [request.body.subject_id, request.body.teacher_id, request.body.student_id, request.body.date, request.body.mark];
        let sql = "INSERT INTO marks (subject_id, teacher_id, student_id, date, mark) VALUES (?, ?, ?, ?, ?)";
        connection.query(sql, param, function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                if (result.insertId) {
                    response.send(String(result.insertId));
                    console.log("Se ha añadido una nota");
                }
                else {
                    response.send(-1);
                }
            }
        });
});

//Método PUT sobre notas
app.put("/notas", function(request, response) {
    let id = request.body.id;
    let param = [];
    if (request.body.id) {
        for (let i in request.body) {
            if (request.body[i] === '') {
                request.body[i] = null;
            }
                param.push(request.body[i]);
        }
        let sql = "UPDATE marks AS m SET subject_id = COALESCE(?, m.subject_id), teacher_id = COALESCE(?, m.teacher_id), student_id = COALESCE(?, m.student_id), date = COALESCE(?, m.date), mark = COALESCE(?, m.mark) WHERE mark_id = ?";
        connection.query(sql, param, function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                if (result.changedRows) {
                    response.send(String(result.changedRows));
                    console.log("Se ha modificado una nota con id: " + id);
                }
                else {
                    response.send(-1);
                }
            }
        });
    }   
});

//Metodo DELETE notas
app.delete("/notas", function (request, response) {
    let id = request.body.id;

    if(request.body.id) {
        let param = [id];
        let sql = "DELETE FROM marks WHERE mark_id = ?";
        connection.query(sql, param, function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                if (result.affectedRows) {
                    response.send(String(result.affectedRows));
                    console.log("Se ha eliminado un estudiante con id: " + id);
                }
                else {
                    response.send(-1);
                }
            }
        });
    }
});

//Método GET sobre media
app.get("/media", 
    function(request, response)
        {
            let id = request.query.id;

            if (request.query.id) {
                let param = [id];
                let sql = "SELECT m.student_id, s.name_student, s.surname_student, AVG(mark) AS nota_media FROM marks AS m JOIN students AS s ON(m.student_id = s.student_id) WHERE m.student_id = ?";
                connection.query(sql, param, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.send(result[0]);
                        console.log("Se ha pedido un la nota media del alumno sobre la posicion: " + id);
                    }
                });
            }
            else {
                response.send(-1);
            }
});

//Método GET sobre apuntadas
app.get("/apuntadas", 
    function(request, response)
        {
            let id = request.query.id;

            if (request.query.id) {
                let param = [id];
                let sql = "SELECT s.student_id s.name_student, s.surname_student, sb.title FROM marks AS m JOIN students AS s ON(m.student_id = s.student_id) JOIN subjects AS sb ON(m.subject_id = sb.subject_id) WHERE m.student_id = ?";
                connection.query(sql, param, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.send(result);
                        console.log("Se ha pedido un GET sobre la posicion: " + id);
                    }
                });
            } 
            else {
                let param = [];
                let sql = "SELECT s.student_id s.name_student, s.surname_student, sb.title FROM marks AS m JOIN student AS s ON(m.student_id = s.student_id) JOIN subjects AS sb ON(m.subject_id = sb.subject_id)";
                connection.query(sql, param, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.send(result);
                        console.log("Se ha pedido un GET sobre toda la lista");
                    }
                });
            }
});

//Método GET sobre impartidas
app.get("/impartidas", 
    function(request, response)
        {
            let id = request.query.id;

            if (request.query.id) {
                let param = [id];
                let sql = "SELECT DISTINCT m.teacher_id, t.name_teacher, t.surname_teacher, sb.title FROM marks AS m JOIN teachers AS t ON(m.teacher_id = t.teacher_id) JOIN subjects AS sb ON(m.subject_id = sb.subject_id) WHERE m.teacher_id = ?";
                connection.query(sql, param, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.send(result[0]);
                        console.log("Se ha pedido un GET sobre la posicion: " + id);
                    }
                });
            } 
            else {
                let param = [];
                let sql = "SELECT DISTINCT m.teacher_id, t.name_teacher, t.surname_teacher, sb.title FROM marks AS m JOIN teachers AS t ON(m.teacher_id = t.teacher_id) JOIN subjects AS sb ON(m.subject_id = sb.subject_id)";
                connection.query(sql, param, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.send(result);
                        console.log("Se ha pedido un GET sobre toda la lista");
                    }
                });
            }
});


app.listen(4000);