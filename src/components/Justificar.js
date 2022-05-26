import React, {useState, useEffect} from "react";
import Global from '../Global';
import axios from "axios";
import '../assets/css/usuarios.css';

const Justificar = () =>
{
    const upl = Global.url2;
    const url = Global.url;
    const [file, setFile] = useState(null);
    const [id_asistencia, getId] = useState("");
    const [asistencia, getAsistencia] = useState([]);

    useEffect(() =>{
        const urlParams = window.location.search;
        const params = new URLSearchParams(urlParams);
        getId(params.get("id"));

        if(id_asistencia !== "")
        {
            axios.get(url + "get_asistencia/"+id_asistencia).then(res =>{
                getAsistencia(res.data.asistencia);
            });
            document.getElementById("nombre").value = asistencia[0].nombre_alumno;
            document.getElementById("asig").value = asistencia[0].nombre_curso;
            document.getElementById("fecha").value = asistencia[0].fecha;
        }
    },[id_asistencia, asistencia.length]);

    const onInputChange =(e) => 
    {
        setFile(e.target.files[0]);
    };

    const onSubmit =(e) =>
    {
        e.preventDefault();
        
        var extension = file.name.split('.').pop();
        if(extension === "pdf" || extension === "png" || extension === "jpeg" || extension === "jpg")
        {
            const data = new FormData();
            data.append('file', file);

            axios.post(upl + 'upload', data).then((e) => {
                alert("Subido correctamente");

            }).catch((e) => {
                alert("No se ha posido subir correctamente, intentelo de nuevo");
            });
        }
        else
        {
            alert("Tipo de archivo no permitido");
        }
        
    };

    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }

    return(
        <div className="bd-example">
            <div className="card-form2-2" id="form">
                <form method="post" action="#" id="#" onSubmit={onSubmit}> 
                    <div>
                        <legend className="card-header mb-3"><a href="#" onClick={Volver}><i className="fa-solid fa-arrow-left-long"></i></a> Justificar</legend>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Alumno</label>
                        <input id="nombre" type="text" className="form-control input-form" style={{textAlign: "center"}} disabled/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Asignatura</label>
                        <input id="asig" type="text" className="form-control input-form" style={{textAlign: "center"}} disabled/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha</label>
                        <input type="text" id="fecha" className="form-control input-form" style={{textAlign: "center"}} disabled/>
                    </div>  
                    <div className="mb-3"> 
                        <label className="form-label">Justificante</label>       
                        <input className="form-control form-control-sm" type="file" onChange={onInputChange}/>
                        <button className="btn btn-primary just">Justificar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Justificar;