import React, {useState, useEffect} from "react";
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

    return(
        <div className="bd-example">
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
                            return(
                                <tr key={i}>
                                    <th scope="row">{asistencia.fecha}</th>
                                    <td>{curso}</td>
                                    <td>{asistencia.estado}</td>
                                    <td>---------</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button type="button" className="btn col-b1" onClick={irAsistForm}><i className="fa-solid fa-plus"></i></button>
        </div>
    )
}

export default Asistencias;