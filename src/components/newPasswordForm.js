
import fgb from "../assets/forgot-password.png"
import { Spinner } from "react-bootstrap"
import { useState } from "react"
import {postToBackend } from "../utils/backendCalls"
import {useNavigate } from "react-router-dom"
import "./verfyemail.css";

const NewPasswordForm = ({verificationId, loginUrl}) => {
    const redirect = useNavigate()
    const [startSpiner, setSpiner] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [pwd, setPwd] = useState("")
    const [cpwd, setCpwd] = useState("")

    return (
        <section className="container">
            <section className="raise d-flex flex-column justify-content-center align-items-center">
                <div>
                    <img style={{width: '300px', height: "250px "}} className="img-fluid" src={fgb} alt="email" />
                </div>
                <article className="text-center">
                    <h2 className="display-5 text-primary my-1"><b>Change  Password</b> </h2>
                    <p style={{fontSize: "20px"}}>Please fill in the detials to change your password?</p>
                </article>
                <div>
                    <form className="p-2" onSubmit={async (e) => {
                        e.preventDefault()
                        //start spinner
                        setSpiner(true)
                        //disable button
                        setSubmitted(true)
                        //check if the verification code has been given
                       let url = "/api/auth/user/reset-password"
                        let response = await postToBackend(url, {pwd, verificationId})
                        
                        if(response.status !== 200) {
                            //dos stuff here
                
                            alert(response.data.reason)
                        } else {
                            alert("redirect to congratulations page")
                            redirect("/user/congratulations/new-password", {state: {loginUrl}})
                        }
                        //enable button
                        setSubmitted(false)
                        setSpiner(false)
                    }}>
                        <div className="form-floating my-1  mx-auto" style={{width: "350px"}}>
                            <input value={pwd} onChange={(val) => setPwd(val.target.value)} type="password"  required className="form-control" id="verify" placeholder="987521" />
                            <label for="verify">New Password</label>
                        </div>
                        <div className="form-floating my-1  mx-auto" style={{width: "350px"}}>
                            <input value={cpwd} onChange={(val) => {
                                if(pwd !== val.target.value) {
                                    val.target.style.color = "red"
                                  } else {
                                    val.target.style.color = "black";
                                  }
                                  setCpwd(val.target.value)
                                }} type="password"  required className="form-control" id="cverify" placeholder="987521" />
                            <label for="cverify">Confirm Password </label>
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
export {NewPasswordForm}