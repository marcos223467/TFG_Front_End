import React from "react";
import rest from "../assets/img/restriccion.png";
import "../assets/css/header.css";
const Restrict = () =>
{
    const Volver = () =>
    {
        window.location.href = './';
    }
    return(
        <div>
            <img src={rest} width="100" alt=""></img>
            <h1 id="restrict">Acceso restringido</h1>
            <button type="button" class="btn btn-dark" onClick={Volver}>Volver</button>
        </div>
    )
}

export default Restrict;