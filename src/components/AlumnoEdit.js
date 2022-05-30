import React, {useState, useEffect} from "react";
import Global from '../Global';
import axios from "axios";

const AlumnoEdit = () =>
{
    const url = Global.url;
    const [id, getId] = useState(0);
    const [alumno, getAlumno] = useState([]);
    const [cursos, getCursos] = useState([]);
    const [altura, setAltura] = useState(32);
    const [_asignaturas, setAsignaturas] = useState([]);

    var asignaturas_aux = [];
    var asignatura = 0;
    const nombre = React.createRef();
    const apellidos = React.createRef();
    const fecha_nacimiento = React.createRef();
    const curso = React.createRef();


    useEffect(() =>{
        const urlParams = window.location.search;
        const params = new URLSearchParams(urlParams);
        getId(params.get("id"));
        if(id !== 0)
        {
            axios.get(url+"get_alumno/" + id).then(res =>{
                getAlumno(res.data.alumno);
            });
        }
        if(alumno.length > 0)
        {
            let fecha_extra = "T00:00:00.000Z";
            let fecha = alumno[0].fecha_nacimiento;
            fecha = fecha.replace(fecha_extra, "");
            document.getElementById("nombre").value = alumno[0].nombre;
            document.getElementById("apellidos").value = alumno[0].apellidos;
            document.getElementById("fecha").value = fecha;
            setAsignaturas(alumno[0].cursos);
            var alt = 32;
            var selects = document.getElementById("selects");
            for(var i = 0; i < _asignaturas.length; i++)
            {
                var select = document.createElement("select");
                select.id = i;
                select.className = "form-select mb-3";
                select.required = true;
                select.addEventListener("change", getAsignatura, false);
                var option = document.createElement("option");
                option.innerHTML = _asignaturas[i];
                option.selected = true;
                select.appendChild(option);
                cursos.map((curs, j) =>
                {
                    if(curs.nombre != _asignaturas[i])
                    {
                        option = document.createElement("option");
                        option.innerHTML = curs.nombre;
                        select.appendChild(option);
                    }
                })
                selects.appendChild(select);
                alt += 4;
                document.getElementById("form").style.height = alt + "rem";
            }
            setAltura(alt);

            compruebaAsignaturas(i);
        }
        axios.get(url+"cursos").then(res =>{
            getCursos(res.data.cursos);
        })
    },[id, alumno.length,cursos.length,_asignaturas.length]);

    const editAlumn = (event) =>
    {
        event.preventDefault();
        console.log(_asignaturas);
        var alumData =
        {
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellidos").value,
            fecha_nacimiento: document.getElementById("fecha").value,
            cursos: _asignaturas
        }
        console.log(alumData);
        axios.put(url+"alumno/" + id, alumData).then((error) =>
            {
                console.log(error);
            });

        window.history.back();
    }

    function compruebaAsignaturas(as)
    {
        asignatura = as;
        if(as > 1)
        {
            var resta = document.getElementById("resta");
            resta.style.display = "block";
        }
    }

    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }

    function sumaAsignatura()
    {
        asignaturas_aux = _asignaturas;
        asignaturas_aux.push("");
        setAsignaturas(asignaturas_aux);
        
        var resta = document.getElementById("resta");
        resta.style.display = "block";

        var selects = document.getElementById("selects");
        var new_sel = document.createElement("select");
        new_sel.id = _asignaturas.length-1;
        new_sel.className = "form-select mb-3";
        new_sel.required = true;
        new_sel.addEventListener("change", getAsignatura, false);
        var option = document.createElement("option");
        option.innerHTML = "Selecciona una Asignatura";
        option.disabled = true;
        option.selected = true;
        new_sel.appendChild(option);
        cursos.map((curs, i) =>
        {
            option = document.createElement("option");
            option.innerHTML = curs.nombre;
            new_sel.appendChild(option);
        })
        selects.appendChild(new_sel);
        var alt = altura;
        alt += 4;
        document.getElementById("form").style.height = alt + "rem";
        console.log(_asignaturas);
    }

    function restaAsignatura()
    {
        var selects = document.getElementById("selects");
        selects.removeChild(selects.lastChild);
        
        asignatura = _asignaturas.length;
        asignaturas_aux = _asignaturas;

        asignatura--;
        asignaturas_aux.pop();

        console.log(asignaturas_aux);
        console.log(asignatura);
        if(asignatura <= 1)
        {
            var resta = document.getElementById("resta");
            resta.style.display = "none";
        }
        setAsignaturas(asignaturas_aux);
        console.log(_asignaturas);
    }

    const getAsignatura = (event) =>
    {
        var id = event.target.id;
        asignaturas_aux = _asignaturas;
        var esta = asignaturas_aux.find(element => element == document.getElementById(id).value);

        if(esta == undefined) //No está el elemento
        {
            asignaturas_aux[id] = document.getElementById(id).value;

            setAsignaturas(asignaturas_aux);
        }
        else
        {
            alert("Ya has seleccionado esa asignatura");
            document.getElementById(id).value = "Selecciona una asignatura";
        }

        console.log(_asignaturas);
    }

    return(
        <div className="bd-example">
            <div className="card-form2" id="form">
                <form onSubmit={editAlumn}>
                <div>
                        <legend className="card-header mb-3"><a href="#" onClick={Volver}><i className="fa-solid fa-arrow-left-long"></i></a> Alta Alumno</legend>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input id="nombre" type="text" className="form-control input-form" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input id="apellidos" type="text" className="form-control input-form" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de nacimiento</label>
                        <input type="date" id="fecha" className="form-control input-form"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Asignaturas</label>
                    </div>
                    <div id="selects">
                    </div>
                    <div className="row-b mb-3">
                        <button type="button" className="btn col-b1" onClick={sumaAsignatura}><i className="fa-solid fa-plus"></i></button>
                        <button type="button" id="resta" className="btn col-b2" onClick={restaAsignatura} style={{display: "none"}}><i className="fa-solid fa-minus"></i></button>
                    </div>
                    <button type="submit" className="btn btn-form">Editar</button>
                </form>
            </div>
        </div>
    )
}

export default AlumnoEdit;