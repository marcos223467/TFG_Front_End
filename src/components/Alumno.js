import React, {useState, useEffect} from "react";
import '../assets/css/alumno.css';
import Global from '../Global';
import axios from "axios";
import {Spinner} from 'reactstrap';

const Alumno = ({id,alumnoData, actualizar}) =>
{
    const url = Global.url;
    const [estado, setEstado] = useState(0);
    const [asistencia, getAsistencia] = useState([]);
    const [curso, getCurso] = useState("");
    var fecha_act = new Date();
    var _fecha = fecha_act.getDate() + "-" + (fecha_act.getMonth() + 1) + "-" +  fecha_act.getFullYear();
    const us = JSON.parse(document.cookie);
    var _justificada = "No";

    useEffect(() =>{
        const urlParams = window.location.search;
        const params = new URLSearchParams(urlParams);
        getCurso(params.get("curso"));
        if(curso != ""){
            axios.get(url+"get_asistencia/"+ curso + "/" + alumnoData._id).then(res =>{
                getAsistencia(res.data.asistencia);
                if(asistencia.length > 0)
                {
                    console.log(asistencia[0]);
                    var asist = asistencia[0].estado;
                    switch(asist)
                    {
                        case "Pendiente":
                                document.getElementById(id).innerHTML = asist;
                                document.getElementById(id).style.backgroundColor = '#5c636a';
                                setEstado(0);
                        break;
                        case "Presente":
                                document.getElementById(id).innerHTML = asist;
                                document.getElementById(id).style.backgroundColor ='#72E125' ;
                                setEstado(1);
                        break;
                        case "Retraso":
                                document.getElementById(id).innerHTML = asist;
                                document.getElementById(id).style.backgroundColor = '#F3B911';
                                setEstado(2);
                        break;
                        case "No Presente":
                                document.getElementById(id).innerHTML = asist;
                                document.getElementById(id).style.backgroundColor = '#E42525';
                                setEstado(3);
                        break;
                    }
                    document.getElementById("spinner"+id).style.display = "none";
                    Justificante();
                    
                }
            })
            
           
        }
        
    },[curso, asistencia.length,estado]);

    const controlAsistencia = async() =>
    {
        var asist
        switch(estado)
        {
            case 0: asist = "Presente";
                    _justificada = "";
            break;
            case 1: asist = "Retraso";
                    _justificada = "";
            break;
            case 2: asist = "No Presente";
            break;
            case 3: asist = "Pendiente";
                    _justificada = "";
            break;
        }

        var asistData =
        {
            id_alumno : alumnoData._id,
            nombre_alumno : alumnoData.apellidos + " " + alumnoData.nombre,
            nombre_curso : curso,
            fecha : _fecha,
            estado: asist,
            justificada: _justificada
        }

        if(asistencia.length === 0)
        {
            document.getElementById("spinner"+id).style.display = "inline-block";
            await axios.post(url + 'save_asistencia', asistData);

            await axios.get(url+"get_asistencia/"+ curso + "/" + alumnoData._id).then(res =>{
                getAsistencia(res.data.asistencia);

            });

        }
        else
        {
            document.getElementById("spinner"+id).style.display = "inline-block";
            await axios.put(url + 'asistencia/' + asistencia[0]._id, asistData);
            
            switch(asist)
            {
                case 'Presente':
                        setEstado(1); 
                break;
                case 'Retraso':
                        setEstado(2);
                break;
                case 'No Presente':
                        setEstado(3);
                break;
                case 'Pendiente': 
                        setEstado(0);
                break;
            }
            Justificante();
        
        
        }
    }

    function CambiaEstado()
    {
        controlAsistencia();
        actualizar(true);
    }
    
    var fecha = new Date(alumnoData.fecha_nacimiento);

    function VerAsistencia(event)
    {
        event.preventDefault();
        window.location.href = "/asistencias?id=" + alumnoData._id + "&curso=" + curso;
    }
    
    function Justificante()
    {
        if(estado == 3)
        {
            document.getElementById("justificar").style.display = "block";
            var cross = document.getElementById("cross");
            var tick = document.getElementById("tick");
            if(asistencia[0].justificada == "Si")
            {
                cross.style.display = "none";
                tick.style.display = "block";
                tick.style.color = "green";
                _justificada = "Si";
            }
            else
            {
                cross.style.display = "block";
                cross.style.color = "red";
                tick.style.display = "none";
                _justificada = "No";
            }
        }
        else
        {
            document.getElementById("justificar").style.display = "none";
        }
    }

    function Justificar()
    {
        var cross = document.getElementById("cross");
        var tick = document.getElementById("tick");
        if(cross.style.display == "none")
        {
            cross.style.display = "block";
            cross.style.color = "red";
            tick.style.display = "none";
            _justificada = "No";
        }
        else
        {
            cross.style.display = "none";
            tick.style.display = "block";
            tick.style.color = "green";
            _justificada = "Si";
        }

        var asist
        switch(estado)
        {
            case 0: asist = "Presente";
                    _justificada = "";
            break;
            case 1: asist = "Retraso";
                    _justificada = "";
            break;
            case 2: asist = "No Presente";
            break;
            case 3: asist = "Pendiente";
                    _justificada = "";
            break;
        }

        var asistData =
        {
            id_alumno : alumnoData._id,
            nombre_alumno : alumnoData.apellidos + " " + alumnoData.nombre,
            nombre_curso : curso,
            fecha : _fecha,
            estado: asist,
            justificada: _justificada
        }
        axios.put(url + 'asistencia/' + asistencia[0]._id, asistData);
    }

    return(
        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                <div className="card" id="alumno">
                    <div className="card-body">
                        <div className="row">
                            <h3 className="card-title">{alumnoData.apellidos} {alumnoData.nombre}</h3>
                        </div>
                        <div className="row">
                            <p id="txt" className="card-text">Edad: {alumnoData.edad}</p>
                        </div>
                        <div className="row">
                            <p id = "txt" className="card-text">Fecha de nacimiento: {fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear()}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="container-fluid" id="container-alumno">
                            <div className="row row-cols-3 row-cols-sm-3 row-cols-md-3 row-cols-lg-3">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                    <button id={id} className="btn btn-secondary btn-asis" onClick={CambiaEstado}>Pendiente</button>
                                </div>
                                <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                    <Spinner id={"spinner"+id} className="spinner" color="secondary" />
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <button id="justificar" className="btn" style={{display:"none"}} onClick={Justificar}>Justificada
                                    <i id="cross" className="fa-solid fa-xmark" style={{color:"red"}}></i>
                                    <i id="tick" className="fa-solid fa-check" style={{display:"none"}}></i>
                                    </button>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button id="asist" type="button" className="btn btn-primary" onClick={VerAsistencia}>Asistencia</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Alumno;