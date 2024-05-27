
import emailPic from "../assets/email.png"
import { Spinner } from "react-bootstrap"
import { useState } from "react"
import { getFromBackend } from "../utils/backendCalls"
import {useNavigate } from "react-router-dom"
import "./verfyemail.css";

const ForgetPwdTokenConfirmation = ({verificationId, email, loginUrl}) => {
    const redirect = useNavigate()
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
                       let url = `/api/auth/email/reset-password/verify/${verificationId}/${verficationCode}`
                        let response = await getFromBackend(url)
                        if(response.status !== 200) {
                            //do stuff here
                            alert(response.data.reason)
                        } else {
                            //a page for the user to enter details
                            redirect("/user/new-password", {state: {verificationId, loginUrl}})
                        }
                        //enable button
                        setSubmitted(false)
                        setSpiner(false)
                    }}>
                        <div className="form-floating my-1  mx-auto" style={{width: "350px"}}>
                            <input value={verficationCode} onChange={(val) => setVerificationCode(val.target.value)} type="tel"  required className="form-control" id="verify" placeholder="987521" />
                            <label for="verify">Verification Code</label>
                        </div>
                        <div className="spiner-parent my-2" style={{width: "350px"}}>
                            <button disabled={submitted} className="w-100 btn btn-lg btn-primary" type="submit">Verify</button>
                            {(submitted && startSpiner) && <Spinner className="spiner-child" /> }
                        </div>
                    </form>
                </div>
            </section>
        </section>
    )
}
export {ForgetPwdTokenConfirmation}