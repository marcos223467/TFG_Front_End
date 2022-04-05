import React, {useState} from "react";
import '../assets/css/userform.css';
import Global from '../Global';
import axios from "axios";
const UserForm = () =>
{
    const url = Global.url;
    const [userData, setUserData] = useState({});

    const email = React.createRef();
    const password = React.createRef();
    const nombre = React.createRef();
    const apellidos = React.createRef();
    const tipo = React.createRef();

    const changeState = () =>{
        setUserData({          
                email: email.current.value,
                password: password.current.value,
                nombre: nombre.current.value,
                apellidos: apellidos.current.value,
                tipo: tipo.current.value
        });
    }

    const createUser = async(event) =>
    {
        event.preventDefault();
        changeState();
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

    function Volver(event)
    {
        event.preventDefault();
        window.location.href ='/menu';
    }
    return(
        <div className="bd-example">
            <div>
                <button id="volver" type="button" className="btn btn-dark" onClick={Volver}>Volver</button>
            </div>
            <form onSubmit={createUser}>
                <fieldset disabled="">
                    <legend className="mb-4">Alta Usuario</legend>
                    <div className="mb-3">
                        <small className="">Email</small>
                        <input type="email" id="disabledTextInput" className="form-control" ref={email} placeholder="email@example.com" onChange={changeState} required/>
                    </div>
                    <div className="mb-3">
                        <small className="">Contraseña</small>
                        <input type="password" id="disabledTextInput" className="form-control" ref={password} onChange={changeState} required/>
                    </div>
                    <div className="mb-3">
                        <small className="">Nombre</small>
                        <input type="text" id="disabledTextInput" className="form-control" ref={nombre} onChange={changeState} required/>
                    </div>
                    <div className="mb-3">
                        <small className="">Apellidos</small>
                        <input type="text" id="disabledTextInput" className="form-control" ref={apellidos} onChange={changeState} required/>
                    </div>
                    <div className="mb-3">
                        <select id="disabledSelect" className="form-select" ref={tipo} onChange={changeState} required>
                            <option disable selected>Selecciona un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="profesor">Profesor</option>
                        </select>
                    </div>      
                    <button type="submit" className="btn btn-primary" id="btn">Registrar</button>
                </fieldset>
            </form>
        </div>
    )
}
export default UserForm;