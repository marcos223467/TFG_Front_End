import React from "react";

const Info = () =>
{
    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }

    return(
        <div className="bd-example" id="info">
            <p className="fs-1">Información sobre la aplicación</p>
            <p className="fs-4">
                El objetivo de esta aplicación es el de llevar un control de alumnos de los cursos que proporciona 
                ABAST Educació.
            </p>
            <p className="fs-5 fw-bold">
                Autores: Jorge Pérez y Marcos Cantos
            </p>
            <p className="fs-6 fw-bold">
                Versión: 1.0
            </p>

            <div>
                    <button id="volver" type="button" className="btn btn-dark" onClick={Volver}>Volver</button>
            </div>
        </div>
    )
}

export default Info;