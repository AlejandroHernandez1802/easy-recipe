import AlterNav from "../../Components/Global/AlterNav";
import FormInput from "../../Components/AdminPage/LoggedAccount/FormInput";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const AdminLogged = () => {

    const history = useHistory();
    const location = useLocation();

    const [values, setValues] = useState({
        password:""
    });

    const inputs = [
        {
            id:1,
            name:"password",
            type:"password",
            placeholder:"Constraseña",
            label:"Confirmar contraseña"
        }
    ]

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }


    //Check if the password match with the user account
    const getLoggedAdminPassword = async (e) => {
        e.preventDefault();
        await axios.get("http://localhost:3001/api/adminLogin", {params:{email:location.state.email, password:values.password}}).then((response) => {
            const adminFound = response.data.length;
            console.log(adminFound);
            if(adminFound === 0){
                alert("Lo sentimos, la contraseña que escribiste no es acorde a la cuenta con la sesión iniciada.");
            }
            else{
                history.push("/select-operation");
            }
        });
    }

    const logOut = async (e) => {
        e.preventDefault();
        await axios.put("http://localhost:3001/api/logOutAdmin", {email:location.state.email}).then(() => {
            history.push("/login-admin");
        })
    }

    return(
        <>
            <AlterNav />
            <div className="adminp-content">
                <div className='form-container'>   
                    <form>
                        <div className='form-content'>
                            <h4 className='form-title'>Sesión iniciada con la cuenta: {location.state.email}</h4>
                            {inputs.map(input => (
                                <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                            ))}
                            <div className='form-buttons'>
                                <button className='form-button' type='submit' onClick={getLoggedAdminPassword}>Confirmar contraseña</button>
                                <button className='form-button' type='submit' onClick={logOut}>Cerrar sesión</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default AdminLogged;