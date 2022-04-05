import React, {useState, useEffect} from "react";
import '../assets/css/cursos.css';
import Global from '../Global';
import axios from "axios";
import Curso from './Curso';
const Cursos_Archivados = () =>
{
    const url = Global.url;
    const [cursos, getCursos] = useState([]);
    const us = JSON.parse(document.cookie);

    useEffect(() =>{
        axios.get(url+"cursos").then(res =>{
            getCursos(res.data.cursos);
        })
        
    }, [cursos.length]);

    const cursoForm = (event) => 
    {
        event.preventDefault();
        window.location.href = "/cursoform";
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
                <div>
                    <button id="volver" type="button" className="btn btn-secondary" onClick={Volver}>Volver</button>
                </div>
                
                <div className="container" id="cursos">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        { cursos.map((curso,i) =>{
                            if(curso.archivado)
                            {
                                return(
                                    <div className="col" key={i}>
                                        <Curso id={i}
                                            cursoData={curso}/>
                                    </div>
                                );
                            }
                            
                        })}
                    </div>
                </div>
            </div>
        )
    }
    else if(us.tipo === "profesor")
    {
        return(
            <div className="bd-example">
                <div>
                    <button id="volver" type="button" className="btn btn-secondary" onClick={Volver}>Volver</button>
                </div>
                <div className="container" id="cursos">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        { cursos.map((curso,i) =>{
                            if(curso.archivado)
                            {
                                return(
                                    <div className="col" key={i}>
                                        <Curso id={i}
                                            cursoData={curso}/>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Cursos_Archivados;