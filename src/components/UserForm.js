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
    return(
        <div className="bd-example">
            <div className="card-form">
                <form onSubmit={createUser}>
                    <div>
                        <legend className="card-header mb-3"><a href="/menu"><i className="fa-solid fa-arrow-left-long"></i></a> Alta Usuario</legend>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control input-form" ref={email} placeholder="email@example.com" onChange={changeState} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control input-form" ref={password} onChange={changeState} required/>
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
                        <select className="form-select" ref={tipo} onChange={changeState} required>
                            <option disabled selected>Selecciona un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="profesor">Profesor</option>
                        </select>
                    </div>      
                    <button type="submit" className="btn btn-form">Registrar</button>
                </form>
            </div>
        </div>
    )
}
export default UserForm;