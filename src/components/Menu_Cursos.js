import React from "react";
import Cursos from "./Cursos";

const Menu_Cursos = () =>
{
    function Cursos(event)
    {
        event.preventDefault();
        window.location.href = "/cursos/activos";
    }

    function Archivados(event)
    {
        event.preventDefault();
        window.location.href = "/cursos/archivados"
    }
    
    return(
        <div className="container-fluid" id="container">
            <a href="/menu" className="back">
                <i className="fa-solid fa-arrow-left-long"></i>
                <p>Volver</p>
            </a>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">

                <div className="col">
                    <button className="btn-menu" onClick={Cursos}>
                    <div className="card-adm">
                        <div className="card-body">
                            <i id="i" className="fa-solid fa-book"></i>
                            <h2 className="card-title">Cursos Activos</h2>
                        </div>
                    </div>
                    </button>
                </div>
                <div className="col">
                    <button className="btn-menu" onClick={Archivados}>
                        <div className="card-adm">
                            <div className="card-body">
                                <i id="i" className="fa-solid fa-bookmark"></i>
                                <h2 className="card-title">Cursos Archivados</h2>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Menu_Cursos;