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
    var _asignaturas = [];

    var asignaturas = 1;
    var altura = 32;

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
                cursos: _asignaturas,
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

    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }

    function sumaAsignatura()
    {
        asignaturas++;
        if(asignaturas > 1)
        {
            var resta = document.getElementById("resta");
            resta.style.display = "block";
        }

        var selects = document.getElementById("selects");
        var new_sel = document.createElement("select");
        new_sel.id = asignaturas;
        new_sel.className = "form-select mb-3";
        new_sel.required = true;
        new_sel.addEventListener("change", getAsignatura, false);
        var option = document.createElement("option");
        option.innerHTML = "Selecciona una Asignatura";
        option.disabled = true;
        option.selected = true;
        new_sel.appendChild(option);
        cursos.map((curs, i) =>
        {
            option = document.createElement("option");
            option.innerHTML = curs.nombre;
            new_sel.appendChild(option);
        })
        selects.appendChild(new_sel);

        altura += 4;
        document.getElementById("form").style.height = altura + "rem";
    }

    function restaAsignatura()
    {
        var selects = document.getElementById("selects");
        selects.removeChild(selects.lastChild);
        asignaturas--;
        _asignaturas.pop();
        if(asignaturas <= 1)
        {
            var resta = document.getElementById("resta");
            resta.style.display = "none";
        }
        altura -= 4;
        document.getElementById("form").style.height = altura + "rem";
    }

    function getAsignatura(id)
    {
        if(_asignaturas.length < asignaturas )
        {
            for(var i = _asignaturas.length; i < asignaturas; i++)
            {
                _asignaturas.push(document.getElementById(i+1).value);
            }
        }
        else
        {
            _asignaturas[id] = document.getElementById(id).value;
        }
        console.log(_asignaturas);
    }

    return(
        <div className="bd-example">
            <div className="card-form2" id="form">
                <form onSubmit={createAlumn}>
                    <div>
                        <legend className="card-header mb-3"><a href="#" onClick={Volver}><i className="fa-solid fa-arrow-left-long"></i></a> Alta Alumno</legend>
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
                        <label className="form-label">Asignaturas</label>
                    </div>
                    <div id="selects">
                        <select id={asignaturas} className="form-select mb-3" onChange={getAsignatura} required>
                            <option disabled selected>Selecciona una Asignatura</option>
                            {cursos.map((curs,i) =>{
                                return(
                                    <option>{curs.nombre}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="row-b mb-3">
                        <button className="btn col-b1" onClick={sumaAsignatura}><i className="fa-solid fa-plus"></i></button>
                        <button id="resta" className="btn col-b2" onClick={restaAsignatura} style={{display: "none"}}><i className="fa-solid fa-minus"></i></button>
                    </div>
                    <button type="submit" className="btn btn-form">Registrar</button>
                </form>
            </div>
        </div>
    )
}

export default AlumnoForm;