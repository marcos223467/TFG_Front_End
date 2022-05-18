import React, {useState, useEffect} from "react";
import Global from '../Global';
import axios from "axios";

const AlumnoEdit = () =>
{
    const url = Global.url;
    const [alumData, setAlumData] = useState({});
    const [id, getId] = useState(0);
    const [alumno, getAlumno] = useState([]);
    const [cursos, getCursos] = useState([]);
    const [asignatura, setAsignatura] = useState(0);
    const [altura, setAltura] = useState(32);
    const [_asignaturas, getAsignaturas] = useState([]);

    const nombre = React.createRef();
    const apellidos = React.createRef();
    const fecha_nacimiento = React.createRef();
    const curso = React.createRef();

    var _edad;

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
            getAsignaturas(alumno[0].cursos);
            var as = 0;
            var alt = 32;
            var selects = document.getElementById("selects");
            for(var i = 0; i < _asignaturas.length; i++)
            {
                var select = document.createElement("select");
                select.id = asignatura;
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
                as++;
                alt += 4;
                document.getElementById("form").style.height = alt + "rem";
            }
            setAsignatura(as);
            setAltura(alt);
            if(asignatura > 1)
            {
                var resta = document.getElementById("resta");
                resta.style.display = "block";
            }
        }
        axios.get(url+"cursos").then(res =>{
            getCursos(res.data.cursos);
        })
    },[id, alumno.length,cursos.length]);

    function calculaEdad()
    {
        var hoy = new Date();
        var cumpleanos = new Date(alumData.fecha_nacimiento);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        _edad = edad;
    }

    const changeState = () =>{
        setAlumData({          
                nombre: nombre.current.value,
                apellidos: apellidos.current.value,
                fecha_nacimiento: fecha_nacimiento.current.value,
                edad: _edad,
                cursos: curso.current.value,
                activo: true
        });
    }

    const editAlumn = async(event) =>
    {
        event.preventDefault();
        changeState();
        axios.put(url+"alumno/" + id, alumData).then((res) =>
            {
                console.log(res);
            },(error) =>
            {
                console.log(error);
            });

        window.history.back();
    }

    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }

    function sumaAsignatura()
    {
        var as = asignatura;
        as++;
        if(as > 0)
        {
            var resta = document.getElementById("resta");
            resta.style.display = "block";
        }

        var selects = document.getElementById("selects");
        var new_sel = document.createElement("select");
        new_sel.id = as;
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
        setAsignatura(as);
        var alt = altura;
        alt += 4;
        document.getElementById("form").style.height = alt + "rem";
        setAltura(alt);
    }

    function restaAsignatura()
    {
        var selects = document.getElementById("selects");
        selects.removeChild(selects.lastChild);
        var as = asignatura;
        as--;
        var _as = _asignaturas;
        _as.pop();
        if(as <= 0)
        {
            var resta = document.getElementById("resta");
            resta.style.display = "none";
        }
        var alt = altura;
        alt += 4;
        document.getElementById("form").style.height = alt + "rem";
        setAltura(alt);
        getAsignaturas(_as);
    }

    const getAsignatura = (event) =>
    {
        var id = event.target.id;
        var _as = _asignaturas;
        var esta = _as.find(element => element == document.getElementById(id).value);

        if(esta == undefined) //No está el elemento
        {
            if(_as.length < asignatura + 1) //El numero de asignaturas almacenadas es menor que la seleccionable
                _as.push(document.getElementById(id).value);
            else
                _as[id] = document.getElementById(id).value;

            getAsignaturas(_as);
        }
        else
        {
            alert("Ya has seleccionado esa asignatura");
            document.getElementById(id).value = "Selecciona una asignatura";
        }
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
                        <input id="nombre" type="text" className="form-control input-form" ref={nombre} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input id="apellidos" type="text" className="form-control input-form" ref={apellidos} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de nacimiento</label>
                        <input type="date" id="fecha" className="form-control input-form" ref={fecha_nacimiento} onChange={calculaEdad}/>
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