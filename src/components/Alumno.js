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

    useEffect(() =>{
        const urlParams = window.location.search;
        const params = new URLSearchParams(urlParams);
        getCurso(params.get("curso"));
        if(curso !== ""){
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
                        default:
                            break;
                    }
                    document.getElementById("spinner"+id).style.display = "none";
                    
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
            break;
            case 1: asist = "Retraso";
            break;
            case 2: asist = "No Presente";
            break;
            case 3: asist = "Pendiente";
            break;
            default:
                break;
        }

        var asistData =
        {
            id_alumno : alumnoData._id,
            nombre_alumno : alumnoData.apellidos + " " + alumnoData.nombre,
            nombre_curso : curso,
            fecha : _fecha,
            estado: asist,
            justificada: "----"
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
                default:break;
            }        
        
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
                            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-2">
                                <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                                    <button id={id} className="btn btn-secondary btn-asis" onClick={CambiaEstado}>Pendiente</button>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <Spinner id={"spinner"+id} className="spinner" color="secondary" />
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