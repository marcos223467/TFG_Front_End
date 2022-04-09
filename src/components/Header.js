import React from "react";
import '../assets/css/header.css';
import logo from "../assets/img/abast.png";

const Header = () => { 

    function Inicio()
    {
        const us = JSON.parse(document.cookie);
        if(us === null)
        {
            window.location.href ="/";
        }
        else
        {
            window.location.href ="/menu"
        }
    }
    return(
        <div>
            <header className="d-flex flex-wrap justify-content-center py-1 mb-4 border-bottom">
                <button id="inicio" onClick={Inicio} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto mx-auto">
                    <img src={logo} width="200" alt="Logo"/>
                </button>
            </header>
        </div>
    )
}

export default Header;