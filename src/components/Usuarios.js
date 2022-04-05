import React, {useState, useEffect} from "react";
import Global from '../Global';
import axios from "axios";
import '../assets/css/usuarios.css';
const Usuarios = () =>
{
    const url = Global.url;
    const [usuarios, getUsers] = useState([]);
    
    useEffect(() =>{
        axios.get(url+"/users").then(res =>{
            getUsers(res.data.users);
        });

    },[usuarios.length]);

    //Declaro la función para poder llamarla en el onClick, si llamo directamente elimina todos los usuarios de la base de datos
    function Eliminar(){}
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
                        <th scope="col">Email</th>
                        <th scope="col">Tipo</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario,i) =>
                        {
                            return(
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellidos}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.tipo}</td>
                                    <td>
                                        <a href={'/editar_usuario?id=' + usuario._id}>
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
                                                        <h4 id="titulo" className="modal-title">Eliminar usuario</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>¿Estás seguro de querer eliminar este usuario?</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button id="eliminar" type="button" className="btn btn-default" 
                                                                data-dismiss="modal" onClick={Eliminar = () => { axios.delete(url+"/delete_user/" + usuario._id).then(window.location.reload());}}>Eliminar</button>
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
export default Usuarios;