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
        </div>
    )
}
export default Usuarios;