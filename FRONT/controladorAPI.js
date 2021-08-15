//Controlador de la API

//Clase Alumno
class Alumno {
    constructor (name_student, surname_student, entryYear)
    {
        this.name_student = name_student;
        this.surname_student = surname_student;
        this.entryYear = entryYear;
    }
};

//Clase nota
class Nota {
    constructor(subject_id, teacher_id, student_id, date, mark)
    {
        this.subject_id = subject_id;
        this.teacher_id = teacher_id;
        this.student_id = student_id;
        this.date = date;
        this.mark = mark;
    }
};

//Llamada Alumnos a la API método GET
async function getStudent() {
    //Coger id del elemento
    let id = document.getElementById("id").value;

    //Crear el cuerpo de la tabla
    let cuerpo = document.createElement("tbody");
    cuerpo.setAttribute("id", "cuerpo");
    let posicion = document.getElementById("tabla");
    posicion.appendChild(cuerpo);
    
    //Si tiene un id
    if (id) {
        let url = `http://localhost:4000/alumnos?id=${id}`;
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            method: "GET"
        }

        try {
            //Solicito la información a la API -> BBDD
            let data = await fetch(url, param);
            let result = await data.json();

            //Posiciono los datos obtenidos en la tabla
            let posicion = document.getElementById("cuerpo");
            let row = document.createElement("tr");
            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.textContent = result.student_id;
            let td1 = document.createElement("td");
            td1.textContent = result.name_student;
            let td2 = document.createElement("td");
            td2.textContent = result.surname_student;
            let td3 = document.createElement("td");
            td3.textContent = result.entryYear;
            posicion.appendChild(row);
            row.appendChild(th);
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        let url ="http://localhost:4000/alumnos";
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
                method: "GET"
        }
        try {
            let data = await fetch(url, param);
            let result = await data.json();
            for (let i = 0; i < result.length; i++) {
                let posicion = document.getElementById("cuerpo");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = result[i].student_id;
                let td1 = document.createElement("td");
                td1.textContent = result[i].name_student;
                let td2 = document.createElement("td");
                td2.textContent = result[i].surname_student;
                let td3 = document.createElement("td");
                td3.textContent = result[i].entryYear;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
};

//Llamada Alumnos a la API método POST
async function postStudent() {
    try
    {
        let alumno = new Alumno (
            document.getElementById("nombre").value,
            document.getElementById("apellidos").value, 
            document.getElementById("añoEntrada").value,
        )

        let url ="http://localhost:4000/alumnos";

        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(alumno),
            method: "POST"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
};

//Llamada Alumnos a la API método PUT
async function putStudent() {
    let id = document.getElementById("id").value;
    let nuevoNombre = document.getElementById("nombre").value;
    let nuevoApellido = document.getElementById("apellidos").value;
    let nuevoAñoEntrada = document.getElementById("añoEntrada").value;
    try{
        
        let url ="http://localhost:4000/alumnos";
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            body: 
                JSON.stringify({name_student : nuevoNombre,
                surname_student : nuevoApellido,
                entryYear: nuevoAñoEntrada,
                id : id})
            ,
            method: "PUT"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
};

//Llamada Alumnos a la API método DELETE
async function deleteStudent() {
    let id = document.getElementById("id").value;
    let body1 = {id: id};
    try
    {
        let url ="http://localhost:4000/alumnos";
        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(body1),
            method: "DELETE"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
};

//Llamada Notas a la API método GET
async function getMarks() {
    //Coger id del elemento
    let id = document.getElementById("student_id").value;

    //Crear el cuerpo de la tabla
    let cuerpo = document.createElement("tbody");
    cuerpo.setAttribute("id", "cuerpo");
    let posicion = document.getElementById("tabla");
    posicion.appendChild(cuerpo);
    
    //Si tiene un id
    if (id) {
        let url = `http://localhost:4000/notas?id=${id}`;
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            method: "GET"
        }

        try {
            //Solicito la información a la API -> BBDD
            let data = await fetch(url, param);
            let result = await data.json();
            console.log(result);

            //Posiciono los datos obtenidos en la tabla
            for (let i = 0; i < result.length; i++) {
                let posicion = document.getElementById("cuerpo");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = result[i].mark_id;
                let td1 = document.createElement("td");
                td1.textContent = result[i].title;
                let td2 = document.createElement("td");
                td2.textContent = result[i].name_teacher +" "+ result[i].surname_teacher;
                let td3 = document.createElement("td");
                td3.textContent = result[i].name_student +" "+ result[i].surname_student;
                let td4 = document.createElement("td");
                td4.textContent = result[i].date;
                let td5 = document.createElement("td");
                td5.textContent = result[i].mark;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
};

//Llamada Notas a la API método POST
async function postMarks() {
    try
    {
        let alumno = new Nota (
            document.getElementById("asignatura").value,
            document.getElementById("profesor").value, 
            document.getElementById("alumno").value,
            document.getElementById("fecha").value, 
            document.getElementById("nota").value,
        )

        let url ="http://localhost:4000/notas";

        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(alumno),
            method: "POST"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
};

//Llamada Notas a la API método PUT
async function putMarks() {
    let id = document.getElementById("id").value;
    let nuevoAsignatura = document.getElementById("asignatura").value;
    let nuevoProfesor = document.getElementById("profesor").value;
    let nuevoAlumno = document.getElementById("alumno").value;
    let nuevaFecha = document.getElementById("fecha").value;
    let nuevaNota = document.getElementById("nota").value;
    try{
        
        let url ="http://localhost:4000/notas";
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            body: 
                JSON.stringify({subject_id : nuevoAsignatura,
                teacher_id : nuevoProfesor,
                student_id: nuevoAlumno,
                date: nuevaFecha,
                mark: nuevaNota,
                id : id})
            ,
            method: "PUT"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
};

//Llamada Notas a la API método DELETE
async function deleteMarks() {
    let id = document.getElementById("id").value;
    let body1 = {id: id};
    try
    {
        let url ="http://localhost:4000/notas";
        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(body1),
            method: "DELETE"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
};

//Llamada Media a la API método GET
async function getAvg() {
    //Coger id del elemento
    let id = document.getElementById("student_id").value;

    //Crear el cuerpo de la tabla
    let cuerpo = document.createElement("tbody");
    cuerpo.setAttribute("id", "cuerpo");
    let posicion = document.getElementById("tabla");
    posicion.appendChild(cuerpo);
    
    //Si tiene un id
    if (id) {
        let url = `http://localhost:4000/media?id=${id}`;
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            method: "GET"
        }

        try {
            //Solicito la información a la API -> BBDD
            let data = await fetch(url, param);
            let result = await data.json();

            //Posiciono los datos obtenidos en la tabla
            let posicion = document.getElementById("cuerpo");
            let row = document.createElement("tr");
            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.textContent = result.student_id;
            let td1 = document.createElement("td");
            td1.textContent = result.name_student;
            let td2 = document.createElement("td");
            td2.textContent = result.surname_student;
            let td4 = document.createElement("td");
            td4.textContent = result.nota_media;
            posicion.appendChild(row);
            row.appendChild(th);
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td4);
        }
        catch(error) {
            console.log(error);
        }
    }
};

//Llamada Apuntadas a la API método GET
async function getApuntadas() {
    //Coger id del elemento
    let id = document.getElementById("student_id2").value;

    //Crear el cuerpo de la tabla
    let cuerpo = document.createElement("tbody");
    cuerpo.setAttribute("id", "cuerpo2");
    let posicion = document.getElementById("tabla2");
    posicion.appendChild(cuerpo);
    
    //Si tiene un id
    if (id) {
        let url = `http://localhost:4000/apuntadas?id=${id}`;
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            method: "GET"
        }

        try {
            //Solicito la información a la API -> BBDD
            let data = await fetch(url, param);
            let result = await data.json();

            //Posiciono los datos obtenidos en la tabla
            for (let i = 0; i < result.length; i++) {
                let posicion = document.getElementById("cuerpo2");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = result[i].student_id;
                let td1 = document.createElement("td");
                td1.textContent = result[i].name_student;
                let td2 = document.createElement("td");
                td2.textContent = result[i].surname_student;
                let td3 = document.createElement("td");
                td3.textContent = result[i].title;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        let url ="http://localhost:4000/apuntadas";
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
                method: "GET"
        }
        try {
            let data = await fetch(url, param);
            let result = await data.json();
            for (let i = 0; i < result.length; i++) {
                let posicion = document.getElementById("cuerpo");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = result[i].student_id;
                let td1 = document.createElement("td");
                td1.textContent = result[i].name_student;
                let td2 = document.createElement("td");
                td2.textContent = result[i].surname_student;
                let td3 = document.createElement("td");
                td3.textContent = result[i].title;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
};

//Llamada Impartidas a la API método GET
async function getImpartidas() {
    //Coger id del elemento
    let id = document.getElementById("student_id3").value;

    //Crear el cuerpo de la tabla
    let cuerpo = document.createElement("tbody");
    cuerpo.setAttribute("id", "cuerpo3");
    let posicion = document.getElementById("tabla3");
    posicion.appendChild(cuerpo);
    
    //Si tiene un id
    if (id) {
        let url = `http://localhost:4000/impartidas?id=${id}`;
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            method: "GET"
        }

        try {
            //Solicito la información a la API -> BBDD
            let data = await fetch(url, param);
            let result = await data.json();

            //Posiciono los datos obtenidos en la tabla
                let posicion = document.getElementById("cuerpo3");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = result.teacher_id;
                let td1 = document.createElement("td");
                td1.textContent = result.name_teacher;
                let td2 = document.createElement("td");
                td2.textContent = result.surname_teacher;
                let td3 = document.createElement("td");
                td3.textContent = result.title;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        let url ="http://localhost:4000/impartidas";
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
                method: "GET"
        }
        try {
            let data = await fetch(url, param);
            let result = await data.json();
            for (let i = 0; i < result.length; i++) {
                let posicion = document.getElementById("cuerpo3");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = result[i].teacher_id;
                let td1 = document.createElement("td");
                td1.textContent = result[i].name_teacher;
                let td2 = document.createElement("td");
                td2.textContent = result[i].surname_teacher;
                let td3 = document.createElement("td");
                td3.textContent = result[i].title;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
};

//Eliminar info
function eliminarInfo() {
    let posicion = document.getElementById("cuerpo");
    posicion.remove();
}

function eliminarInfo2() {
    let posicion = document.getElementById("cuerpo2");
    posicion.remove();
}

function eliminarInfo3() {
    let posicion = document.getElementById("cuerpo3");
    posicion.remove();
}