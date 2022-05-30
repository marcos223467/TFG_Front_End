import React, {useState, useEffect} from "react";
import '../assets/css/userform.css';
import Global from '../Global';
import axios from "axios";
const UserForm = () =>
{
    const url = Global.url;
    const [cursos, getCursos] = useState([]);
    const email = React.createRef();
    const password = React.createRef();
    const nombre = React.createRef();
    const apellidos = React.createRef();
    const tipo = React.createRef();
    var _asignaturas = [];
    var userData = {};

    var asignatura = 0;
    var altura = 40;

    useEffect(() =>{
        axios.get(url+"cursos").then(res =>{
            getCursos(res.data.cursos);
        })
        
    }, [cursos.length]);

    const createUser = async(event) =>
    {
        event.preventDefault();
        userData =
        {
            email: email.current.value,
            password: password.current.value,
            nombre: nombre.current.value,
            apellidos: apellidos.current.value,
            tipo: tipo.current.value,
            cursos: _asignaturas
        }

        axios.post(url+"save_user", userData).then((res) =>
            {
                alert("Usuario registrado con éxito");
                console.log(res);
            },(error) =>
            {
                console.log(error);
            });
        window.location.reload();
    }

    function sumaAsignatura()
    {
        asignatura++;
        if(asignatura > 0)
        {
            var resta = document.getElementById("resta");
            resta.style.display = "block";
        }

        var selects = document.getElementById("selects");
        var new_sel = document.createElement("select");
        new_sel.id = asignatura;
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
        asignatura--;
        _asignaturas.pop();
        if(asignatura <= 0)
        {
            var resta = document.getElementById("resta");
            resta.style.display = "none";
        }
        altura -= 4;
        document.getElementById("form").style.height = altura + "rem";
    }

    const getAsignatura = (event) =>
    {
        var id = event.target.id;
        var esta = _asignaturas.find(element => element == document.getElementById(id).value);

        if(esta == undefined) //No está el elemento
        {
            if(_asignaturas.length < asignatura + 1) //El numero de asignaturas almacenadas es menor que la seleccionable
                _asignaturas.push(document.getElementById(id).value);
            else
                _asignaturas[id] = document.getElementById(id).value;
        }
        else
        {
            alert("Ya has seleccionado esa asignatura");
            document.getElementById(id).value = "Selecciona una asignatura";
        }
    }

    return(
        <div className="bd-example">
            <div className="card-form" id="form">
                <form onSubmit={createUser}>
                    <div>
                        <legend className="card-header mb-3"><a href="/menu"><i className="fa-solid fa-arrow-left-long"></i></a> Alta Usuario</legend>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control input-form" ref={email} placeholder="email@example.com" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control input-form" ref={password} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control input-form" ref={nombre} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input type="text" className="form-control input-form" ref={apellidos}  required/>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" ref={tipo} required>
                            <option disabled selected>Selecciona un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="profesor">Profesor</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Asignaturas</label>
                    </div>
                    <div id="selects">
                        <select id={asignatura} className="form-select mb-3" onChange={getAsignatura} required>
                            <option disabled selected>Selecciona una Asignatura</option>
                            {cursos.map((curs,i) =>{
                                return(
                                    <option>{curs.nombre}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="row-b mb-3">
                        <button type="button" className="btn col-b1" onClick={sumaAsignatura}><i className="fa-solid fa-plus"></i></button>
                        <button type="button" id="resta" className="btn col-b2" onClick={restaAsignatura} style={{display: "none"}}><i className="fa-solid fa-minus"></i></button>
                    </div>     
                    <button type="submit" className="btn btn-form">Registrar</button>
                </form>
            </div>
        </div>
    )
}
export default UserForm;