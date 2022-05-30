import React, {useState, useEffect} from "react";
import Global from '../Global';
import axios from "axios";

const AdminAlumnos = () =>
{
    const url = Global.url;
    const [alumnos, getAlumnos] = useState([]);
    let fecha;
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

    function Cursos(curs)
    {
        cursos = "";
        for(let i = 0; i < curs.length; i++)
        {
            cursos += curs[i] + "  ";
        }
    }

    function Filtrar()
    {
        var busqueda = document.getElementById('buscar');
        var table = document.getElementById("tabla-adm").tBodies[0];

        var texto = busqueda.value.toLowerCase();
        var r=0;
        var row;
        while(row = table.rows[r++])
        {
            if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
                row.style.display = null;
            else
                row.style.display = 'none';
        }
    }

    return(
        <div className="bd-example">
            <a href="/admin" className="back">
                <i className="fa-solid fa-arrow-left-long"></i>
                <p>Volver</p>
            </a>
            <div className="buscador row row-cols-2 row-cols-md-2 row-cols-lg-2">
                <div className="col">
                    <input id="buscar" type="text" className="form-control buscador-2" placeholder="Buscar..." onChange={Filtrar}/>
                </div>
                <div className="col">
                    <i className="fa-solid fa-magnifying-glass buscador-3"></i>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped" id="tabla-adm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Fecha de nacimiento</th>
                            <th scope="col">Asignatura</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            alumnos.map((alumno,i) =>
                            {
                                CambiaFecha(alumno.fecha_nacimiento);
                                Cursos(alumno.cursos);
                                return(
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{alumno.nombre}</td>
                                        <td>{alumno.apellidos}</td>
                                        <td>{fecha}</td>
                                        <td>{cursos}</td>
                                        <td>
                                            <a href={'/editar_alumno?id=' + alumno._id}>
                                                <i id="adm-i" className="fa-solid fa-pen-to-square"></i>
                                            </a>
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
        </div>
    )
}

export default AdminAlumnos;