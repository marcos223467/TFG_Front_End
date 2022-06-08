import React, {useState, useEffect} from "react";
import Global from '../Global';
import axios from "axios";

const AsistenciaForm = () =>
{
    const url = Global.url;
    const [id_alumno, getId] = useState("");
    const [curso, getCurso] = useState("");
    const [nombre_alumno, getAlum] = useState("");

    var estado = 0;
    var asist = "Pendiente";
    var just = "----";

    useEffect(() =>{
        const urlParams = window.location.search;
        const params = new URLSearchParams(urlParams);
        getId(params.get("id"));
        getCurso(params.get("curso"));
        getAlum(params.get("nombre"));

        if(id_alumno != "" && curso != "" && nombre_alumno != "")
        {
            document.getElementById("nombre").value = nombre_alumno;
            document.getElementById("asig").value = curso;
        }
    },[curso,id_alumno,nombre_alumno]);


    const createAsist = async(event) =>
    {
        event.preventDefault();
        var _fecha = document.getElementById("fecha").value;
        var dia = _fecha[8]+_fecha[9];
        var mes = _fecha[5] + _fecha[6];
        var anyo = _fecha[0]+ _fecha[1] + _fecha[2] + _fecha[3];

        _fecha = dia+"-"+mes+"-"+anyo;
        var asistData = {
            id_alumno: id_alumno,
            nombre_alumno: nombre_alumno,
            nombre_curso: curso,
            fecha: _fecha,
            estado: asist,
            justificada: just,
            justificacion: ""
        };
        await axios.post(url+'save_asistencia', asistData).then(window.history.back());
    }

    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }

    function CambiaEstado()
    {
        switch(estado)
        {
            case 0: asist = "Presente";
                    estado = 1;
                    document.getElementById("estado").innerHTML = asist;
                    document.getElementById("estado").style.backgroundColor = '#72E125';
            break;
            case 1: asist = "Retraso";
                    estado = 2;
                    just = "No";
                    document.getElementById("estado").innerHTML = asist;
                    document.getElementById("estado").style.backgroundColor ='#F3B911' ;
            break;
            case 2: asist = "No Presente";
                    estado = 3;
                    just = "No";
                    document.getElementById("estado").innerHTML = asist;
                    document.getElementById("estado").style.backgroundColor = '#E42525';
            break;
            case 3: asist = "Pendiente";
                    estado = 0;
                    document.getElementById("estado").innerHTML = asist;
                    document.getElementById("estado").style.backgroundColor = '#5c636a';
            break;
        }
    }

    return(
        <div className="bd-example">
            <div className="card-form2-2" id="form">
                <form onSubmit={createAsist}>
                    <div>
                        <legend className="card-header mb-3"><a href="#" onClick={Volver}><i className="fa-solid fa-arrow-left-long"></i></a> Añadir Asistencia</legend>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Alumno</label>
                        <input id="nombre" type="text" className="form-control input-form" disabled/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Asignatura</label>
                        <input id="asig" type="text" className="form-control input-form" disabled/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha</label>
                        <input type="date" id="fecha" className="form-control input-form" required/>
                    </div>
                    <div className="mb-3">
                        <button type="button" id="estado" className="btn btn-secondary btn-asis-2" onClick={CambiaEstado}>Pendiente</button>
                    </div>   
                    <button type="submit" className="btn btn-form">Registrar</button>
                </form>
            </div>
        </div>
    )
}

export default AsistenciaForm;