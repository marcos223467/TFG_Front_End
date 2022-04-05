import React, {useState, useEffect} from "react";
import Global from '../Global';
import axios from "axios";

const AdminAlumnos = () =>
{
    const url = Global.url;
    const [alumnos, getAlumnos] = useState([]);
    let fecha;
    let activo;
    let cursos = "";

    useEffect(() =>{
        axios.get(url+"/alums").then(res =>{
            getAlumnos(res.data.alumnos);
        });

    },[alumnos.length]);

    function Eliminar(){}
    function CambiaFecha(fecha_nac)
    {
        let fecha_extra = "T00:00:00.000Z";
        fecha = fecha_nac;
        fecha = fecha.replace(fecha_extra, "");
    }
    function Activo(estado)
    {
        if(estado)
            activo = "Si";
        else
            activo = "No";
    }
    function Cursos(curs)
    {
        cursos = "";
        for(let i = 0; i < curs.length; i++)
        {
            cursos += curs[i] + "  ";
        }
    }
    function Volver(event)
    {
        event.preventDefault();
        window.location.href ='/admin';
    }

    return(
        <div className="bd-example">
            <div>
                <button id="volver" type="button" className="btn btn-secondary" onClick={Volver}>Volver</button>
            </div>
            <table className="table table-striped" id="tabla-adm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Fecha de nacimiento</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Cursos</th>
                        <th scope="col">Activo</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alumnos.map((alumno,i) =>
                        {
                            CambiaFecha(alumno.fecha_nacimiento);
                            Activo(alumno.activo);
                            Cursos(alumno.cursos);
                            return(
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{alumno.nombre}</td>
                                    <td>{alumno.apellidos}</td>
                                    <td>{fecha}</td>
                                    <td>{alumno.edad}</td>
                                    <td>{cursos}</td>
                                    <td>{activo}</td>
                                    <td>
                                        <a href={'/editar_alumno?id=' + alumno._id}>
                                            <i id="adm-i" class="fa-solid fa-pen-to-square"></i>
                                        </a>
                                        <button type="button" className="btn-remove" aria-hidden="true" data-bs-toggle="modal" 
                                                data-bs-target={"#myModal" + i}>
                                            <i id="adm-i" class="fa-solid fa-trash-can"></i>
                                        </button>

                                        <div className="modal fade" id={"myModal" + i} tabIndex="-1" role="dialog">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button id="cerrar" type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                        <h4 id="titulo" className="modal-title">Eliminar alumno</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>¿Estás seguro de querer eliminar este alumno?</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button id="eliminar" type="button" className="btn btn-default" 
                                                                data-dismiss="modal" onClick={Eliminar = () => { axios.delete(url+"/delete_alumno/" + alumno._id).then(window.location.reload());}}>Eliminar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminAlumnos;