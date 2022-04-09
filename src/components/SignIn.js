import React, {useState, useEffect} from "react";
import '../assets/css/signIn.css';
import Global from '../Global';
import axios from "axios";
import logo from "../assets/img/logo2.png";

const SignIn = () =>{

    const url = Global.url;
    const [users, getUsers] = useState([]);
    const [userData, setUserData] = useState({});
  

    const email = React.createRef();
    const password = React.createRef();

    useEffect(() =>{
        axios.get(url+"users").then(res =>{
            getUsers(res.data);
        })
        
    }, [users.length]);

    const changeState = () =>{
        setUserData({          
                email: email.current.value,
                password: password.current.value
        });
    }

    const receiveData = async(event) =>{
        //Evitamos recargar la página al recibir los datos del formulario
        event.preventDefault();
        changeState();
        var contador = 0;
        for(let i = 0; i < users.users.length; i++)
        {
            if(userData.email === users.users[i].email && userData.password === users.users[i].password)
            {
                contador = 0;
                document.cookie = JSON.stringify(users.users[i]);
                window.location.href='./menu';
            }
            else
            {
                contador++;
            }
                
        }
        if(contador === users.users.length)
        {
            alert("Error en las credenciales");
            window.location.reload();
        }
        
    }

    return(
            

        <div className="card col-md-4 mx-auto" id="card-form">
            <div className="card-header" id="card-header-form">
                <img className="mb-1 logo" id="logoSignIn" src={logo} alt="" width="30"/>
                <h3>Login</h3>
            </div>

		    <div className="card-body">

                <form onSubmit={receiveData}>

                    <div className="mb-3">
                        <input className="form-control" type="email" placeholder="Introduce tu email" required ref={email} onChange={changeState}/>
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="password" name="password" placeholder="Introduce tu contraseña" required ref={password} onChange={changeState}/>
                    </div>

                    <div className="form-group d-grid gap-2">
                        <input className="form-control btn btn-primary" type="submit" value="Acceder"/>
                    </div>
                    
                </form>

		    </div>

	    </div>
    )
}

export default SignIn;