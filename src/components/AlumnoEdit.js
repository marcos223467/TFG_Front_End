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
            document.getElementById("curs").value = alumno[0].cursos[0];
            _edad = alumno[0].edad;
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
    return(
        <div className="bd-example">
            <div className="card-form2">
                <form onSubmit={editAlumn}>
                    <div>
                        <legend className="card-header mb-3"><a href="#" onClick={Volver}><i className="fa-solid fa-arrow-left-long"></i></a> Editar Alumno</legend>
                    </div>
                    <div className="mb-3">
                        <small className="form-label">Nombre</small>
                        <input type="text" id="nombre" className="form-control input-form" ref={nombre} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small className="form-label">Apellidos</small>
                        <input type="text" id="apellidos" className="form-control input-form" ref={apellidos} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small className="form-label">Fecha de nacimiento</small>
                        <input type="date" id="fecha" className="form-control input-form" ref={fecha_nacimiento} onChange={calculaEdad}/>
                    </div>
                    <div className="mb-3">
                        <select id="curs" className="form-select" ref={curso} onChange={changeState}>
                            <option disabled selected>Selecciona un Curso</option>
                            {cursos.map((curs,i) =>{
                                return(
                                    <option>{curs.nombre}</option>
                                );
                            })}
                        </select>
                    </div>
                
                    <button type="submit" className="btn btn-form">Editar</button>
                </form>
            </div>
        </div>
    )
}

export default AlumnoEdit;