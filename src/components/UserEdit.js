import React, {useState, useEffect} from "react";
import '../assets/css/userform.css';
import Global from '../Global';
import axios from "axios";
const UserEdit = () =>
{
    const url = Global.url;
    const [userData, setUserData] = useState({});
    const [id, getId] = useState(0);
    const [user, getUser] = useState([]);

    const email = React.createRef();
    const password = React.createRef();
    const nombre = React.createRef();
    const apellidos = React.createRef();
    const tipo = React.createRef();

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
        }

    },[id, user.length]);

    const changeState = () =>{
        setUserData({          
                email: email.current.value,
                password: password.current.value,
                nombre: nombre.current.value,
                apellidos: apellidos.current.value,
                tipo: tipo.current.value
        });
    }

    const editUser = async(event) =>
    {
        event.preventDefault();
        changeState();
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

    return(
        <div className="bd-example">
            <div className="card-form">
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
                    <button type="submit" className="btn btn-form">Editar</button>
                </form>
            </div>
        </div>
    )
}
export default UserEdit;