import React, {useState, useEffect} from "react";
import '../assets/css/cursos.css';
import Global from '../Global';
import axios from "axios";
import Curso from './Curso';
const Cursos = () =>
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

    function Esta(curso)
    {
        var esta = false;
        for(var i = 0; i < us.cursos.length; i++)
        {
            if(curso.nombre === us.cursos[i])
                esta = true;
        }
        
        return esta;
    }

    if(us.tipo === "admin")
    {
        return(
            <div className="bd-example">
                <a href="/cursos" className="back">
                    <i className="fa-solid fa-arrow-left-long"></i>
                    <p>Volver</p>
                </a>
                <button className="btn-menu" onClick={cursoForm}>
                    <div className="card" id="add">
                        <div className="card-body">
                            <i id="add-i" className="fa-solid fa-plus"></i>
                            <h5 className="card-title">Añadir curso</h5>
                        </div>
                    </div>
                </button>
                <div className="container" id="cursos">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        { cursos.map((curso,i) =>{
                            if(!curso.archivado)
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
                <a href="/cursos" className="back">
                    <i className="fa-solid fa-arrow-left-long"></i>
                    <p>Volver</p>
                </a>
                <div className="container" id="cursos">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        { cursos.map((curso,i) =>{
                            if(!curso.archivado)
                            {
                                if(Esta(curso))
                                {
                                    return(
                                        <div className="col" key={i}>
                                            <Curso id={i}
                                                cursoData={curso}/>
                                        </div>
                                    );
                                }
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }
    
}
export default Cursos;