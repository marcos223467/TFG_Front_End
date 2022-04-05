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

    return(
        <div className="bd-example">
            <div>
                <button id="volver" type="button" className="btn btn-secondary" onClick={Volver}>Volver</button>
            </div>
            <div>
                <h1>{nombre_alumno}</h1>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Asistencia</th>
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
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Asistencias;