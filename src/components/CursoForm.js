import React, {useState} from "react";
import '../assets/css/userform.css';
import Global from '../Global';
import axios from "axios";

const CursoForm = () =>
{
    const url = Global.url;
    const [cursoData, setCursoData] = useState({});

    const tipo = React.createRef();
    const nombre = React.createRef();
    const poblacion = React.createRef();
    const entidad = React.createRef();
    const fecha_ini = React.createRef();
    const fecha_fin = React.createRef();

    const changeState = () =>{
        setCursoData({
                tipo: tipo.current.value,          
                nombre: nombre.current.value,
                poblacion: poblacion.current.value,
                entidad: entidad.current.value,
                fecha_ini: fecha_ini.current.value,
                fecha_fin: fecha_fin.current.value
        });
    }

    const createCurso = async(event) =>
    {
        event.preventDefault();
        changeState();
        axios.post(url+"save_curso", cursoData).then((res) =>
            {
                console.log(res);
                window.location.href = "/cursos";
            },(error) =>
            {
                console.log(error);
            });

        
    }
    function Volver(event)
    {
        event.preventDefault();
        window.location.href ='/cursos';
    }
    return(
        <div className="bd-example">
            <div>
                <button id="volver" type="button" className="btn btn-dark" onClick={Volver}>Volver</button>
            </div>
            <form onSubmit={createCurso}>
                <fieldset disabled="">
                    <legend className="mb-4">Nuevo curso</legend>
                    <div className="mb-3">
                        <small  className="form-label">Nombre</small>
                        <input type="text" id="disabledTextInput" className="form-control" ref={nombre} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small  className="">Población</small>
                        <input type="text" id="disabledTextInput" className="form-control" ref={poblacion} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small  className="">Entidad</small>
                        <input type="text" id="disabledTextInput" className="form-control" ref={entidad} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small  className="">Fecha de inicio</small>
                        <input type="date" id="disabledTextInput" className="form-control" ref={fecha_ini} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small  className="">Fecha de finalización</small>
                        <input type="date" id="disabledTextInput" className="form-control" ref={fecha_fin} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <select id="disabledSelect" className="form-select" ref={tipo} onChange={changeState}>
                            <option disable selected>Selecciona un tipo</option>
                            <option>MAT</option>
                            <option>DAT</option>
                            <option>FA</option>
                        </select>
                    </div>
                   
                    <button type="submit" className="btn btn-primary" id="btn">Registrar</button>
                </fieldset>
            </form>
        </div>
    )
}

export default CursoForm;