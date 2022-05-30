import React, {useState, useEffect} from "react";
import '../assets/css/userform.css';
import Global from '../Global';
import axios from "axios";
const UserEdit = () =>
{
    const url = Global.url;
    const [userData, setUserData] = useState({});
    const [cursos, getCursos] = useState([]);
    const [id, getId] = useState(0);
    const [user, getUser] = useState([]);
    const [altura, setAltura] = useState(32);
    const [_asignaturas, setAsignaturas] = useState([]);

    const email = React.createRef();
    const password = React.createRef();
    const nombre = React.createRef();
    const apellidos = React.createRef();
    const tipo = React.createRef();

    var asignaturas_aux = [];
    var asignatura = 0;

    useEffect(() =>{
        const urlParams = window.location.search;
        const params = new URLSearchParams(urlParams);
        getId(params.get("id"));
        if(id !== 0)
        {
            axios.get(url+"/get_user/" + id).then(res =>{
                getUser(res.data.user);
            });
        }
        if(user.length > 0)
        {
            document.getElementById("email").value = user[0].email;
            document.getElementById("pssw").value = user[0].password;
            document.getElementById("nombre").value = user[0].nombre;
            document.getElementById("apellidos").value = user[0].apellidos;
            document.getElementById("tipo").value = user[0].tipo;
            setAsignaturas(user[0].cursos);
            var alt = 40;
            var selects = document.getElementById("selects");
            for(var i = 0; i < _asignaturas.length; i++)
            {
                var select = document.createElement("select");
                select.id = i;
                select.className = "form-select mb-3";
                select.required = true;
                select.addEventListener("change", getAsignatura, false);
                var option = document.createElement("option");
                option.innerHTML = _asignaturas[i];
                option.selected = true;
                select.appendChild(option);
                cursos.map((curs, j) =>
                {
                    if(curs.nombre != _asignaturas[i])
                    {
                        option = document.createElement("option");
                        option.innerHTML = curs.nombre;
                        select.appendChild(option);
                    }
                })
                selects.appendChild(select);
                alt += 4;
                document.getElementById("form").style.height = alt + "rem";
            }
            setAltura(alt);
            compruebaAsignaturas(i);
        }
        axios.get(url+"cursos").then(res =>{
            getCursos(res.data.cursos);
        })
        

    },[id, user.length, cursos.length, _asignaturas.length]);

    const changeState = () =>{
        setUserData({          
                
        });
    }

    const editUser = async(event) =>
    {
        event.preventDefault();
        var userData =
        {
            email: email.current.value,
            password: password.current.value,
            nombre: nombre.current.value,
            apellidos: apellidos.current.value,
            tipo: tipo.current.value,
            cursos: _asignaturas
        }
        axios.put(url+"/user/" + id, userData).then((res) =>
            {
                alert("Usuario editado");
                console.log(res);
            },(error) =>
            {
                console.log(error);
            });
        window.location.href ='/usuarios';
    }

    function compruebaAsignaturas(as)
    {
        asignatura = as;
        if(as > 0)
        {
            var resta = document.getElementById("resta");
            resta.style.display = "block";
        }
    }

    function sumaAsignatura()
    {
        asignaturas_aux = _asignaturas;
        asignaturas_aux.push("");
        setAsignaturas(asignaturas_aux);
        
        var resta = document.getElementById("resta");
        resta.style.display = "block";

        var selects = document.getElementById("selects");
        var new_sel = document.createElement("select");
        new_sel.id = _asignaturas.length-1;
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
        var alt = altura;
        alt += 4;
        document.getElementById("form").style.height = alt + "rem";
        console.log(_asignaturas);
    }

    function restaAsignatura()
    {
        var selects = document.getElementById("selects");
        selects.removeChild(selects.lastChild);
        
        asignatura = _asignaturas.length;
        asignaturas_aux = _asignaturas;

        asignatura--;
        asignaturas_aux.pop();

        console.log(asignaturas_aux);
        console.log(asignatura);
        if(asignatura <= 0)
        {
            var resta = document.getElementById("resta");
            resta.style.display = "none";
        }
        setAsignaturas(asignaturas_aux);
        console.log(_asignaturas);
    }

    const getAsignatura = (event) =>
    {
        var id = event.target.id;
        asignaturas_aux = _asignaturas;
        var esta = asignaturas_aux.find(element => element == document.getElementById(id).value);

        if(esta == undefined) //No está el elemento
        {
            asignaturas_aux[id] = document.getElementById(id).value;

            setAsignaturas(asignaturas_aux);
        }
        else
        {
            alert("Ya has seleccionado esa asignatura");
            document.getElementById(id).value = "Selecciona una asignatura";
        }

        console.log(_asignaturas);
    }

    return(
        <div className="bd-example">
            <div className="card-form" id="form">
                <form onSubmit={editUser}>
                    <div>
                        <legend className="card-header mb-3"><a href="/usuarios"><i className="fa-solid fa-arrow-left-long"></i></a> Editar Usuario</legend>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" id="email" className="form-control input-form" 
                            ref={email} placeholder="email@example.com" onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="text" id="pssw" className="form-control input-form" 
                            ref={password} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" id="nombre" className="form-control input-form" 
                            ref={nombre} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input type="text" id="apellidos" className="form-control input-form" 
                            ref={apellidos} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <select id="tipo" className="form-select" ref={tipo} onChange={changeState}>
                            <option disabled selected>Selecciona un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="profesor">Profesor</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Asignaturas</label>
                    </div>
                    <div id="selects">
                    </div>
                    <div className="row-b mb-3">
                        <button type="button" className="btn col-b1" onClick={sumaAsignatura}><i className="fa-solid fa-plus"></i></button>
                        <button type="button" id="resta" className="btn col-b2" onClick={restaAsignatura} style={{display: "none"}}><i className="fa-solid fa-minus"></i></button>
                    </div>    
                    <button type="submit" className="btn btn-form">Editar</button>
                </form>
            </div>
        </div>
    )
}
export default UserEdit;