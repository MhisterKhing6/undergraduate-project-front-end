import {useNavigate } from "react-router-dom";
import emailPic from "../assets/verified.png"
import "./verfyemail.css";

const NewPwdCongratulations = ({loginUrl}) => {
    const redirect = useNavigate()
    return (
        <section className="container">
            <section className="raise d-flex flex-column justify-content-center align-items-center">
                <div>
                    <img style={{width: '300px', height: "250px "}} className="img-fluid" src={emailPic} alt="email" />
                </div>
                <article className="text-center">
                    <h2 className="display-5 text-primary my-1"><b>Congratulations Password Successfully Changed </b> </h2>
                    <p style={{fontSize: "20px"}}>You can now log in with your new password</p>
                </article>
                <button onClick={(e) => {
                    e.preventDefault()
                    redirect(loginUrl)
                }} style={{fontWeight: "bold", fontSize: "1rem", minWidth: "350px"}} className="btn btn-primary" >Back to Login</button>
            </section>
        </section>
    )
}

export {NewPwdCongratulations}