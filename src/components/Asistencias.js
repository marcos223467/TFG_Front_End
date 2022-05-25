import React, {useState, useEffect} from "react";
import {FileUploader} from "./FileUploader";
import Global from '../Global';
import axios from "axios";
import '../assets/css/usuarios.css';

const Asistencias = () =>
{
    const url = Global.url;
    const [asistencias, getAsistencias] = useState([]);
    const [id_alumno, getId] = useState("");
    const [curso, getCurso] = useState("");
    const [nombre_alumno, getAlum] = useState("");

    useEffect(() =>{
        const urlParams = window.location.search;
        const params = new URLSearchParams(urlParams);
        getId(params.get("id"));
        getCurso(params.get("curso"));
        if(id_alumno !== "" && curso !== "")
        {
            axios.get(url+"get_alum_asist/" + curso + "/" + id_alumno).then(res =>{
                getAsistencias(res.data.alasis);
                getAlum(asistencias[0].nombre_alumno);
            });
            
        }
    },[curso,id_alumno,asistencias.length, nombre_alumno]);

    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }

    function irAsistForm(event)
    {
        event.preventDefault();
        window.location.href = "/asistencias/add?id=" + id_alumno + "&curso=" + curso + "&nombre=" + nombre_alumno;
    }

    function Justificar()
    {
        var justificante = document.getElementById("justificante");
        if(justificante.files[0] != null)
        {
            var extension = justificante.files[0].name.split('.').pop();
            if(extension === "pdf" || extension === "png" || extension === "jpeg" || extension === "jpg")
            {
                var filename = (Math.random()+1).toString(36).substring(2) + '.' + extension;
                const formData = new FormData();
                formData.append('file', justificante.files[0], filename);

                /*axios.post(url + "save_file", formData).then(res=>{
                    console.log(res);
                });*/

                fetch('../controllers/upload_file.js', {
                    method: 'post',
                    headers: {
                        'Accept' : 'application/json'
                    },
                    body: formData
                });
            }
            else
            {
                alert("Extensión no admitida");
            }
        }   
    }

    return(
        <div className="bd-example mb-3">
            <a href="#" onClick={Volver} className="back">
                <i className="fa-solid fa-arrow-left-long"></i>
                <p>Volver</p>
            </a>
            <div>
                <h1>{nombre_alumno}</h1>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Asistencia</th>
                        <th scope="col">Justificada</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        asistencias.map((asistencia, i) =>
                        {
                            if(asistencia.estado === "No Presente" || asistencia.estado === "Retraso")
                            {
                                return(
                                    <tr key={i}>
                                        <th scope="row">{asistencia.fecha}</th>
                                        <td>{curso}</td>
                                        <td>{asistencia.estado}</td>
                                        <td className="file-uploader">
                                            <FileUploader/>
                                        </td>
                                    </tr>
                                )
                            }
                            else
                            {
                                return(
                                    <tr key={i}>
                                        <th scope="row">{asistencia.fecha}</th>
                                        <td>{curso}</td>
                                        <td>{asistencia.estado}</td>
                                        <td>{asistencia.justificada}</td>
                                    </tr>
                                )
                            }
                            
                        })
                    }
                </tbody>
            </table>
            <button type="button" className="btn col-b1 mb-4" onClick={irAsistForm}><i className="fa-solid fa-plus"></i></button>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
        </div>
    )
}

export default Asistencias;