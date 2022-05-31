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
            });
            axios.get(url + "get_alumno/" + id_alumno).then(res => {
                getAlum(res.data.alumno[0].nombre + " " + res.data.alumno[0].apellidos);
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

    function Eliminar(){}
    function VerJustificante(){}

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
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        asistencias.map((asistencia, i) =>
                        {
                            if(asistencia.justificada === "No")
                            {
                                return(
                                    <tr key={i}>
                                        <th scope="row">{asistencia.fecha}</th>
                                        <td>{curso}</td>
                                        <td>{asistencia.estado}</td>
                                        <td><a href={"/asistencias/justificar?id=" + asistencia._id}>{asistencia.justificada} <i className="fa-solid fa-upload"></i></a></td>
                                        <td>
                                            <button type="button" className="btn-remove" aria-hidden="true" data-bs-toggle="modal" 
                                                    data-bs-target={"#myModal" + i}>
                                                <i id="adm-i" className="fa-solid fa-trash-can"></i>
                                            </button>

                                            <div className="modal fade" id={"myModal" + i} tabIndex="-1" role="dialog">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <button id="cerrar" type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                            <h4 id="titulo" className="modal-title">Eliminar usuario</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p>¿Estás seguro de querer eliminar esta asistencia?</p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button id="eliminar" type="button" className="btn btn-default" 
                                                                    data-dismiss="modal" onClick={Eliminar = () => { axios.delete(url+"/delete_asistencia/" + asistencia._id).then(window.location.reload());}}>Eliminar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </td>
                                    </tr>
                                )
                            }
                            else if(asistencia.justificada === "Si")
                            {
                                return(
                                    <tr key={i}>
                                        <th scope="row">{asistencia.fecha}</th>
                                        <td>{curso}</td>
                                        <td>{asistencia.estado}</td>
                                        <td><a href="tks83d0v1a.pdf" download>Si <i className="fa-solid fa-download"></i></a></td>
                                        <td>
                                            <button type="button" className="btn-remove" aria-hidden="true" data-bs-toggle="modal" 
                                                    data-bs-target={"#myModal" + i}>
                                                <i id="adm-i" className="fa-solid fa-trash-can"></i>
                                            </button>

                                            <div className="modal fade" id={"myModal" + i} tabIndex="-1" role="dialog">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <button id="cerrar" type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                            <h4 id="titulo" className="modal-title">Eliminar usuario</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p>¿Estás seguro de querer eliminar esta asistencia?</p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button id="eliminar" type="button" className="btn btn-default" 
                                                                    data-dismiss="modal" onClick={Eliminar = () => { axios.delete(url+"/delete_asistencia/" + asistencia._id).then(window.location.reload());}}>Eliminar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
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
                                        <td>
                                            <button type="button" className="btn-remove" aria-hidden="true" data-bs-toggle="modal" 
                                                    data-bs-target={"#myModal" + i}>
                                                <i id="adm-i" className="fa-solid fa-trash-can"></i>
                                            </button>

                                            <div className="modal fade" id={"myModal" + i} tabIndex="-1" role="dialog">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <button id="cerrar" type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                            <h4 id="titulo" className="modal-title">Eliminar usuario</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p>¿Estás seguro de querer eliminar esta asistencia?</p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button id="eliminar" type="button" className="btn btn-default" 
                                                                    data-dismiss="modal" onClick={Eliminar = () => { axios.delete(url+"/delete_asistencia/" + asistencia._id).then(window.location.reload());}}>Eliminar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </td>
                                    </tr>
                                )
                            }
                            
                        })
                    }
                </tbody>
            </table>
            <button type="button" className="btn col-b1 mb-5" onClick={irAsistForm}><i className="fa-solid fa-plus"></i></button>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
        </div>
    )
}

export default Asistencias;