import React, {useState, useEffect} from "react";
import Global from '../Global';
import axios from "axios";

const CursoEdit = () =>
{
    const url = Global.url;
    const [cursoData, setCursoData] = useState({});
    const [id, getId] = useState(0);
    const [curso, getCurso] = useState([]);

    const anyo = React.createRef();
    const carrera = React.createRef();
    const nombre = React.createRef();
    const entidad = React.createRef();
    const fecha_ini = React.createRef();
    const fecha_fin = React.createRef();

    useEffect(() =>{
        const urlParams = window.location.search;
        const params = new URLSearchParams(urlParams);
        getId(params.get("id"));
        if(id !== 0)
        {
            axios.get(url+"/get_curso/" + id).then(res =>{
                getCurso(res.data.curso);
            });
        }
        if(curso.length > 0)
        {
            let fecha_extra = "T00:00:00.000Z";
            let fecha_ini = curso[0].fecha_ini;
            let fecha_fin = curso[0].fecha_fin;
            fecha_ini = fecha_ini.replace(fecha_extra, "");
            fecha_fin = fecha_fin.replace(fecha_extra,"");
            document.getElementById("carrera").value = curso[0].carrera;
            document.getElementById("anyo").value = curso[0].anyo;
            document.getElementById("nombre").value = curso[0].nombre;
            document.getElementById("entidad").value = curso[0].entidad;
            document.getElementById("fecha_ini").value = fecha_ini;
            document.getElementById("fecha_fin").value = fecha_fin;
        }
    },[id, curso.length]);

    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }

    const changeState = () =>{
        setCursoData({          
                anyo: anyo.current.value,
                nombre: nombre.current.value,
                carrera: carrera.current.value,
                entidad: entidad.current.value,
                fecha_ini: fecha_ini.current.value,
                fecha_fin: fecha_fin.current.value
        });
    }

    const editCurso = async(event) =>
    {
        event.preventDefault();
        changeState();
        axios.put(url+"/curso/" + id, cursoData).then((res) =>
            {
                console.log(res);
                alert("Curso editado");
            },(error) =>
            {
                console.log(error);
            });
        window.history.back();
    }
    return(
        <div className="bd-example">
            <div className="card-form3">
                <form onSubmit={editCurso}>
                    <div>
                        <legend className="card-header mb-3"><a href="#" onClick={Volver}><i className="fa-solid fa-arrow-left-long"></i></a> Editar Curso</legend>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Grado</label>
                        <input id="carrera" type="text" className="form-control input-form" ref={carrera} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Nombre Asignatura</label>
                        <input id="nombre" type="text" className="form-control input-form" ref={nombre} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Institución</label>
                        <input id="entidad" type="text" className="form-control input-form" ref={entidad} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Fecha de inicio</label>
                        <input id="fecha_ini" type="date" className="form-control input-form" ref={fecha_ini} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Fecha de finalización</label>
                        <input id="fecha_fin" type="date" className="form-control input-form" ref={fecha_fin} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Año</label>
                        <select id="anyo" className="form-select" ref={anyo} onChange={changeState}>
                            <option disabled selected>Selecciona un tipo</option>
                            <option>1º</option>
                            <option>2º</option>
                            <option>3º</option>
                            <option>4º</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-form">Editar</button>
                </form>
            </div>
        </div>
    )
}

export default CursoEdit;