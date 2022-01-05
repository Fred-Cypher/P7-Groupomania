import React, { useState } from "react";
//import { Link } from "react-router-dom";
import Header from "./Header";
import Messages from './Messages';

const Login = () =>{
    localStorage.clear();
    const [formSubmit, setFormSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleLogin = (e) =>{
        e.preventDefault();

        const userLogin = {
        email: email,
        password: password
        }

        console.log(userLogin);

        const fetchData = {
            method: 'POST',
            body: JSON.stringify(userLogin),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log(fetchData);

        fetch('http://localhost:5500/api/auth/login', fetchData)
            .then(response => response.json())
            .then(dataUser => {
                setFormSubmit(true)
                localStorage.setItem('userId', dataUser.id);
                localStorage.setItem('userFirstName', dataUser.first_name);
                localStorage.setItem('userLastName', dataUser.last_name);
            })
            .catch((err) => { 
                console.log(err);
                e.preventDefault();
            });
    }

    

    return(
        <>
        { formSubmit ? (
            <>
                <div>Bienvenue sur le forum de partage d'images</div>
                <Messages />
            </>
        ) : (
            <div>
                <Header />
                <div className="d-flex justify-content-center">
                    <div className="card p-3 m-3 col-md-8 d-flex align-items-center">
                        <div className="mt-3 mb-4 h4">Connexion au réseau social de Groupomania</div>
                        <form action="" onSubmit={ handleLogin } className="form col-md-10 col-lg-7">
                            <div className="form-group">
                                <label htmlFor='email' className="form-label">Adresse e-mail : </label>
                                <input type='text' name='email' id='email' className="form-control" onChange={(e) => setEmail(e.target.value)} value= { email } required /> 
                            </div>
                            <div className="form-group">
                                <label htmlFor='password' className="form-label"> Mot de passe : </label>
                                <input type="password" name='password' id='password' className="form-control" onChange={(e) => setPassword(e.target.value)} value= { password } required /> 
                            </div>
                            <div>
                                <button type='submit' className="btn mt-3 rounded border">Connexion </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
        
        </>
        
    )
};

export default Login;