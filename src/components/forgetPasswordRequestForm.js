
import fgb from "../assets/forgot-password.png"
import { Spinner } from "react-bootstrap"
import { useState } from "react"
import { getFromBackend } from "../utils/backendCalls"
import {useNavigate } from "react-router-dom"
import "./verfyemail.css";

const ForgetPasswordRequestForm = ({type, loginUrl}) => {
    const redirect = useNavigate()
    const [startSpiner, setSpiner] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [email, setEmail] = useState("")

    return (
        <section className="container">
            <section className="raise d-flex flex-column justify-content-center align-items-center">
                <div>
                    <img style={{width: '300px', height: "250px "}} className="img-fluid" src={fgb} alt="email" />
                </div>
                <article className="text-center">
                    <h2 className="display-5 text-primary my-1"><b>Forget Password</b> </h2>
                    <p style={{fontSize: "20px"}}>Please enter your email use for registration?</p>
                </article>
                <div>
                    <form className="p-2" onSubmit={async (e) => {
                        e.preventDefault()
                        //start spinner
                        setSpiner(true)
                        //disable button
                        setSubmitted(true)
                        //check if the verification code has been given
                       let url = `/api/auth/email/reset-password/${email}/${type}`
                        let response = await getFromBackend(url)
                        if(response.status !== 200) {
                            //dos stuff here
                            alert(response.data.reason)
                        } else {
                            redirect("/user/request/password-reset/confirm-token", {state: {loginUrl, email, verificationId:response.data.id}})
                        }
                        //enable button
                        setSubmitted(false)
                        setSpiner(false)
                    }}>
                        <div className="form-floating my-1  mx-auto" style={{width: "350px"}}>
                            <input value={email} onChange={(val) => setEmail(val.target.value)} type="email"  required className="form-control" id="verify" placeholder="987521" />
                            <label for="verify">Email</label>
                        </div>
                        <div className="spiner-parent my-2" style={{width: "350px"}}>
                            <button disabled={submitted} className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                            {(submitted && startSpiner) && <Spinner className="spiner-child" /> }
                        </div>
                    </form>
                </div>
                
            </section>
        </section>
    )
}
export {ForgetPasswordRequestForm}