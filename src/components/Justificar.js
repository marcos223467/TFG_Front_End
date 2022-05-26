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
            
        }
        if(asistencia.length > 0)
        {
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
            var filename = (Math.random()+1).toString(36).substring(2) + '.' + extension;
            console.log(filename);
            const data = new FormData();
            file.originalname = filename;
            data.append('file', file, filename);

            axios.post(upl + 'upload', data).then((e) => {
                console.log("Subido correctamente");

            }).catch((e) => {
                alert("No se ha posido subir correctamente, intentelo de nuevo");
            });

            var asistData =
            {
                id_alumno : asistencia[0].id_alumno,
                nombre_alumno : asistencia[0].nombre_alumno,
                nombre_curso : asistencia[0].nombre_curso,
                fecha : asistencia[0].fecha,
                estado: asistencia[0].estado,
                justificada: "Si"
            }
            console.log(asistData);

            axios.put(url + 'asistencia/' + asistencia[0]._id, asistData).then((e)=> {
                window.history.back();
            }).catch((e) =>{
                console.log("No se ha actualizado la asistencia");
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
                        <label className="form-label mb-3">Justificante</label>       
                        <input className="form-control form-control-sm" type="file" onChange={onInputChange}/>
                        <button className="btn btn-primary just">Justificar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Justificar;