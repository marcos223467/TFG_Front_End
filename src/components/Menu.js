import React from "react";
import '../assets/css/menu.css';

const Menu = () => 
{
    const UserForm = (event) =>
    {
        event.preventDefault();
        window.location.href = './userform';
    }

    const AlumForm = (event) =>
    {
        event.preventDefault();
        window.location.href = './alumform';
    }

    const Cursos = (event) =>
    {
        event.preventDefault();
        window.location.href = './cursos';
    }

    const Administrar = (event) =>
    {
        event.preventDefault();
        window.location.href = './admin';
    }

    function Salir(event)
    {
        event.preventDefault();
        document.cookie = null;
        window.location.href = "/";
    }

    if(document.cookie === '')
    {
        window.location.href = './restrict';
    }
    else
    {
        const us = JSON.parse(document.cookie);

        if(us.tipo === "admin")
        {
            return(
                <div>
                    <button className="btn-menu" onClick={Salir}>
                        <div className="card" id="salir">
                            <div className="card-body">
                                <i id="logout" className="fa-solid fa-arrow-right-from-bracket"></i>
                                <br/>
                                <h5 id="logout-2" className="card-title">Salir</h5>
                            </div>
                        </div>
                    </button>
                    <br/> 
                    <div className="container-fluid" id="container">
                        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">

                            <div className="col">
                                    <button className="btn-menu" onClick={UserForm}>
                                    <div className="card">
                                        <div className="card-body">
                                            <i id="i" className="fa-solid fa-user-plus"></i>
                                            <h2 className="card-title">Alta usuario</h2>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="btn-menu" onClick={Administrar}>
                                    <div className="card">
                                        <div className="card-body">
                                            <i id="i" className="fa-solid fa-gear"></i>
                                            <h2 className="card-title">Administrar</h2>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="btn-menu" onClick={AlumForm}>
                                    <div className="card">
                                        <div className="card-body">
                                            <i id="i" className="fa-solid fa-graduation-cap"></i>
                                            <h2 className="card-title">Alta alumno</h2>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="btn-menu" onClick={Cursos}>
                                    <div className="card">
                                        <div className="card-body">
                                            <i id="i" className="fa-solid fa-book"></i>
                                            <h2 className="card-title">Cursos</h2>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
            )
        }
        else if(us.tipo === "profesor")
        {
            return(
                <div> 
                    <button className="btn-menu" onClick={Salir}>
                        <div className="card" id="salir">
                            <div className="card-body">
                                <i id="logout" className="fa-solid fa-arrow-right-from-bracket"></i>
                                <br/>
                                <h5 id="logout-2" className="card-title">Salir</h5>
                            </div>
                        </div>
                    </button>
                    <br/>
                    <div className="container-fluid" id="container">
                        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2"> 
                            <div className="col">
                                <button className="btn-menu" onClick={Cursos}>
                                    <div className="card">
                                        <div className="card-body">
                                            <i id="i" className="fa-solid fa-book"></i>
                                            <h2 className="card-title">Cursos</h2>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div className="col">
                                <button className="btn-menu" onClick={AlumForm}>
                                    <div className="card">
                                        <div className="card-body">
                                            <i id="i" className="fa-solid fa-graduation-cap"></i>
                                            <h2 className="card-title">Alta alumno</h2>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else
        {
            window.location.href = './restrict';
        }
    }
        
    
}

export default Menu;