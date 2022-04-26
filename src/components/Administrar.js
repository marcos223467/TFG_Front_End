import React from "react";
import '../assets/css/menu.css';

const Administrar = () =>
{

    function Usuarios(event)
    {
        event.preventDefault();
        window.location.href ="/usuarios";
    }

    function Alumnos(event)
    {
        event.preventDefault();
        window.location.href ="/admin_alums";
    }
    return(
        <div className="container-fluid" id="container">
            <a href="/menu" className="back">
                <i className="fa-solid fa-arrow-left-long"></i>
                <p>Volver</p>
            </a>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">

                <div className="col">
                    <button className="btn-menu" onClick={Alumnos}>
                    <div className="card-adm">
                        <div className="card-body">
                            <i id="i" class="fa-solid fa-graduation-cap"></i>
                            <h2 className="card-title">Administrar Alumnos</h2>
                        </div>
                    </div>
                    </button>
                </div>
                <div className="col">
                    <button className="btn-menu" onClick={Usuarios}>
                        <div className="card-adm">
                            <div className="card-body">
                                <i id="i" class="fa-solid fa-user-gear"></i>
                                <h2 className="card-title">Administrar Usuarios</h2>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Administrar;