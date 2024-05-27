
import emailPic from "../assets/email.png"
import { Spinner } from "react-bootstrap"
import { useState } from "react"
import { getFromBackend } from "../utils/backendCalls"
import {useNavigate } from "react-router-dom"
import "./verfyemail.css";

const VerifyEmail = ({verificationId, email, urlMe}) => {
    const redirect = useNavigate()
    const [disB, setdisable ] = useState(false)
    const [startSpiner, setSpiner] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [verficationCode, setVerificationCode] = useState("")

    return (
        <section className="container">
            <section className="raise d-flex flex-column justify-content-center align-items-center">
                <div>
                    <img style={{width: '300px', height: "250px "}} className="img-fluid" src={emailPic} alt="email" />
                </div>
                <article className="text-center">
                    <h2 className="display-5 text-primary my-1"><b>Check your Email </b> </h2>
                    <p style={{fontSize: "20px"}}>We have sent a verification Code to <b>{email}</b><br /><b />Kindly enter the code in the box below</p>
                </article>
                <div>
                    <form className="p-2" onSubmit={async (e) => {
                        e.preventDefault()
                        //start spinner
                        setSpiner(true)
                        //disable button
                        setSubmitted(true)
                        //check if the verification code has been given
                       let url = `/api/auth/verify/email/${verificationId}/${verficationCode}`
                        let response = await getFromBackend(url)
                        if(response.status !== 200) {
                            //dos stuff here
                            alert(response.data.reason)
                        } else {
                            redirect("/user/congratulations", {state:{url: urlMe}})
                        }
                        //enable button
                        setSubmitted(false)
                        setSpiner(false)
                    }}>
                        <div className="form-floating my-1  mx-auto" style={{width: "300px"}}>
                            <input value={verficationCode} onChange={(val) => setVerificationCode(val.target.value)} type="tel"  required className="form-control" id="verify" placeholder="987521" />
                            <label for="verify">Verification Code</label>
                        </div>
                        <div className="spiner-parent my-2" style={{width: "350px"}}>
                            <button disabled={submitted} className="w-100 btn btn-lg btn-primary" type="submit">Verify</button>
                            {(submitted && startSpiner) && <Spinner className="spiner-child" /> }
                        </div>
                    </form>
                </div>
                <a disabled={disB} onClick= {async (e) => {
                    e.preventDefault()
                    setdisable(true)
                    let response = await getFromBackend("/api/auth/resend/email/" + verificationId)
                    if (response.status !== 200) {
                        alert(response.data.reason)
                        setdisable(false)
                    }
                    else {
                        alert("Email Sent,please check you inbox or spam folder.Email should be recieved in 30 seconds")
                        setTimeout(() => {setdisable(false)}, 30000)
                    }
                }}  style={{fontWeight: "bold", fontSize: "1rem"}} className="text-decoration-none" > Didn't recieve email?  click to resend</a>
            </section>
        </section>
    )
}
export {VerifyEmail}