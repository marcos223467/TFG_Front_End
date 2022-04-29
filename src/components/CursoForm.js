import React, {useState} from "react";
import '../assets/css/userform.css';
import Global from '../Global';
import axios from "axios";

const CursoForm = () =>
{
    const url = Global.url;
    const [cursoData, setCursoData] = useState({});

    const anyo = React.createRef();
    const nombre = React.createRef();
    const carrera = React.createRef();
    const entidad = React.createRef();
    const fecha_ini = React.createRef();
    const fecha_fin = React.createRef();

    const changeState = () =>{
        setCursoData({
                anyo: anyo.current.value,          
                nombre: nombre.current.value,
                carrera: carrera.current.value,
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
    return(
        <div className="bd-example">
            <div className="card-form3">
                <form onSubmit={createCurso}>
                    <div>
                        <legend className="card-header mb-3"><a href="/cursos/activos"><i className="fa-solid fa-arrow-left-long"></i></a> Nuevo curso</legend>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Grado</label>
                        <input type="text" className="form-control input-form" ref={carrera} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Nombre Asignatura</label>
                        <input type="text" className="form-control input-form" ref={nombre} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Institución</label>
                        <input type="text" className="form-control input-form" ref={entidad} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Fecha de inicio</label>
                        <input type="date" className="form-control input-form" ref={fecha_ini} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Fecha de finalización</label>
                        <input type="date" className="form-control input-form" ref={fecha_fin} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Año</label>
                        <select className="form-select" ref={anyo} onChange={changeState}>
                            <option disabled selected>Selecciona un tipo</option>
                            <option>1º</option>
                            <option>2º</option>
                            <option>3º</option>
                            <option>4º</option>
                        </select>
                    </div>
                
                    <button type="submit" className="btn btn-form">Registrar</button>
                </form>
            </div>
        </div>
    )
}

export default CursoForm;