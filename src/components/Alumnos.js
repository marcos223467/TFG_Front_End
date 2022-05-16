import React, {useState, useEffect} from "react";
import '../assets/css/cursos.css';
import Global from '../Global';
import axios from "axios";
import Alumno from './Alumno';
import {CSVLink} from 'react-csv';
const Alumnos = ({actualizar}) => 
{
    const url = Global.url;
    const [alumnos, getAlumnos] = useState([]);
    const [asistencias, getAsistencias] = useState([]);
    const [curso, getCurso] = useState("");
    const us = JSON.parse(document.cookie);

    useEffect(() =>{
        const urlParams = window.location.search;
        const params = new URLSearchParams(urlParams);
        getCurso(params.get("curso"));
        if(curso !== "")
        {
            axios.get(url+"alumnos/" + curso).then(res =>{
                getAlumnos(res.data.alumnos);
            });
            axios.get(url+"/asistencias/" + curso).then(res =>{
                getAsistencias(res.data.asistencias);
            })
        }
    },[curso, alumnos.length, asistencias.length]);

    function actualizar(estado)
    {
        if(estado)
        {
            axios.get(url+"/asistencias/" + curso).then(res =>{
                getAsistencias(res.data.asistencias);
            });
            
        }
    }

    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }
    if(us.tipo === "admin")
    {
        return(
            <div className="bd-example">
                <a href="#" onClick={Volver}className="back">
                    <i className="fa-solid fa-arrow-left-long"></i>
                    <p>Volver</p>
                </a>
                <div>
                    <h1>{curso}</h1>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        { alumnos.map((alumno,i) =>{
                            return(
                                <div className="col" key={i}>
                                    <Alumno id={i}
                                        alumnoData={alumno}
                                        actualizar={actualizar}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id="exportar">
                    <CSVLink data={asistencias} filename={'Listado de asistencia ' + curso}>
                        <button type="button" className="btn btn-dark">Exportar Asistencia</button>
                    </CSVLink>
                    
                </div>
            </div>
        )
    }
    else if(us.tipo === "profesor")
    {
        return(
            <div className="bd-example">
                <a href="#" onClick={Volver}className="back">
                    <i className="fa-solid fa-arrow-left-long"></i>
                    <p>Volver</p>
                </a>
                <div>
                    <h1>{curso}</h1>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        { alumnos.map((alumno,i) =>{
                            return(
                                <div className="col" key={i}>
                                    <Alumno id={i}
                                        alumnoData={alumno}
                                        actualizar={actualizar}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id="exportar">
                    <CSVLink data={asistencias} filename={'Listado de asistencia ' + curso}>
                        <button type="button" className="btn btn-dark">Exportar Asistencia</button>
                    </CSVLink>
                    
                </div>
            </div>
        )
    }

}

export default Alumnos;