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

        return edad;
    }

    const changeState = () =>{
        setAlumData({          
                nombre: nombre.current.value,
                apellidos: apellidos.current.value,
                fecha_nacimiento: fecha_nacimiento.current.value,
                edad: calculaEdad(),
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
        Volver();
    }

    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }
    return(
        <div className="bd-example">
            <div>
                <button id="volver" type="button" class="btn btn-dark" onClick={Volver}>Volver</button>
            </div>
            <form onSubmit={editAlumn}>
                <fieldset disabled="">
                    <legend className="mb-4">Editar Alumno</legend>
                    <div className="mb-3">
                        <small className="">Nombre</small>
                        <input type="text" id="nombre" className="form-control" ref={nombre} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small className="">Apellidos</small>
                        <input type="text" id="apellidos" className="form-control" ref={apellidos} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small className="">Fecha de nacimiento</small>
                        <input type="date" id="fecha" className="form-control" ref={fecha_nacimiento} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <select id="curs" className="form-select" ref={curso} onChange={changeState}>
                            <option disable selected>Selecciona un Curso</option>
                            {cursos.map((curs,i) =>{
                                return(
                                    <option>{curs.nombre}</option>
                                );
                            })}
                        </select>
                    </div>
                   
                    <button type="submit" className="btn btn-primary" id="btn">Editar</button>
                </fieldset>
            </form>
        </div>
    )
}

export default AlumnoEdit;