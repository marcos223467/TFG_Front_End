import React, {useState, useEffect} from "react";
import '../assets/css/userform.css';
import Global from '../Global';
import axios from "axios";

const AlumnoForm = () =>
{
    const url = Global.url;
    const [alumData, setAlumData] = useState({});
    const [cursos, getCursos] = useState([]);
    
    const nombre = React.createRef();
    const apellidos = React.createRef();
    const fecha_nacimiento = React.createRef();
    const curso = React.createRef();

    useEffect(() =>{
        axios.get(url+"cursos").then(res =>{
            getCursos(res.data.cursos);
        })
        
    }, [cursos.length]);

    function calculaEdad()
    {
        var hoy = new Date();
        var cumpleanos = new Date(alumData.fecha_nacimiento);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }

    const changeState = () =>{
        setAlumData({          
                nombre: nombre.current.value,
                apellidos: apellidos.current.value,
                fecha_nacimiento: fecha_nacimiento.current.value,
                edad: calculaEdad(),
                cursos: curso.current.value,
                activo: true
        });
    }

    const createAlumn = async(event) =>
    {
        event.preventDefault();
        changeState();
        axios.post(url+"save_alumno", alumData).then((res) =>
            {
                console.log(res);
                window.location.reload();
            },(error) =>
            {
                console.log(error);
            });
    }

    return(
        <div className="bd-example">
            <div className="card-form2">
                <form onSubmit={createAlumn}>
                    <div>
                        <legend className="card-header mb-3"><a href="/menu"><i className="fa-solid fa-arrow-left-long"></i></a> Alta Alumno</legend>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control input-form" ref={nombre} onChange={changeState} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input type="text" className="form-control input-form" ref={apellidos} onChange={changeState} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de nacimiento</label>
                        <input type="date" className="form-control input-form" ref={fecha_nacimiento} onChange={changeState} required/>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" ref={curso} onChange={changeState} required>
                            <option disabled selected>Selecciona un Curso</option>
                            {cursos.map((curs,i) =>{
                                return(
                                    <option>{curs.nombre}</option>
                                );
                            })}
                        </select>
                    </div>
                
                    <button type="submit" className="btn btn-form">Registrar</button>
                </form>
            </div>
        </div>
    )
}

export default AlumnoForm;