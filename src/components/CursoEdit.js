import React, {useState, useEffect} from "react";
import Global from '../Global';
import axios from "axios";

const CursoEdit = () =>
{
    const url = Global.url;
    const [cursoData, setCursoData] = useState({});
    const [id, getId] = useState(0);
    const [curso, getCurso] = useState([]);

    const tipo = React.createRef();
    const nombre = React.createRef();
    const poblacion = React.createRef();
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
            document.getElementById("poblacion").value = curso[0].poblacion;
            document.getElementById("tipo").value = curso[0].tipo;
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
                tipo: tipo.current.value,
                nombre: nombre.current.value,
                poblacion: poblacion.current.value,
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
            <div>
                <button id="volver" type="button" className="btn btn-dark" onClick={Volver}>Volver</button>
            </div>
            <form onSubmit={editCurso}>
                <fieldset disabled="">
                    <legend className="mb-4">Editar curso</legend>
                    <div className="mb-3">
                        <small className="">Nombre</small>
                        <input type="text" id="nombre" className="form-control" ref={nombre} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small className="">Población</small>
                        <input type="text" id="poblacion" className="form-control" ref={poblacion} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small className="">Entidad</small>
                        <input  type="text" id="entidad" className="form-control" ref={entidad} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small className="">Fecha de inicio</small>
                        <input  type="date" id="fecha_ini" className="form-control" ref={fecha_ini} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small className="">Fecha de finalización</small>
                        <input  type="date" id="fecha_fin" className="form-control" ref={fecha_fin} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <select id="tipo" className="form-select" ref={tipo} onChange={changeState}>
                            <option>MAT</option>
                            <option>DAT</option>
                            <option>FA</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" id="btn">Editar</button>
                </fieldset>
            </form>
        </div>
    )
}

export default CursoEdit;