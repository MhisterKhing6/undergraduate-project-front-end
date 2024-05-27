import "./login.css"
import {useState } from "react"
import Toast  from "./toast"
import { postToBackend } from "../utils/backendCalls.js"
import {saveToken } from "../utils/localstorage.js"
import { useNavigate } from "react-router-dom"
import { Container, Spinner, Col, Row } from "react-bootstrap"
import { token } from "../utils/config.js"
import logo from "../assets/logo-color.png"
import { Side } from "./image.js"

const LoginLecturerForm = () => {
   const [loginDetails, setloginDetails] = useState({"lecturerId": "", "password": ""})
   const [message, setMessage] = useState(" ")
   const [show, togleShow] = useState(false)
   const [startSpiner, setSpiner] = useState(false)
   const [submitted, setSubmitted] = useState(false)
   const redirect = useNavigate()

   const setValue = (name, value) => {
      loginDetails[name] = value
      setloginDetails({...loginDetails})
   }
   const hidden = () => {togleShow(false)}
   const text = "Login Lecturer"
  return (
  <Container className="mx-auto">
    <Row className="justify-content-center align-items-center">
      <Col>
        <form className="registration p-5" onSubmit={async (e) =>{
          e.preventDefault()
          togleShow(false)
          //disable button
          setSpiner(true)
          setSubmitted(true)
          let result = await postToBackend("/api/auth/login/lecturer", loginDetails)
          //post data login datat to backend
          if(result.status !== 200) {
            setMessage(result.data.reason)
          } else {
            setMessage("success")
            //save token
            saveToken(token.lecturerTokenKey, result.data.token)
            //redirect to Lecturer dashboard
            redirect("/lecturer/dashboard")
          }
          togleShow(true)
          setSubmitted(false)
          setSpiner(false)

        }}>
          <section className='w-100 d-flex justify-content-center align-items-center my-2'>
          <img  className="my-1" src={logo} alt="" width="100" height="100" />
          </section>

          <h4 className="h3 text-center mb-3 fw-normal my-2 notice ">Auto Code Grader</h4>
          <hr />
          <h6>Lectuerer Log In</h6>
          {show && <Toast text={message} hidden={hidden}/> }

          <div className="form-floating" style={{minWidth: "350px"}} >
            <input   type="text" onChange={(val) => {
              setValue("lecturerId", val.target.value)
            }} value={loginDetails.lecturerId}   required className="form-control" id="LecID" placeholder="Lecturer_ID" />
            <label for="LecID">Lecturer ID</label>
          </div>

          <div className="form-floating my-1">
            <input type="password" onChange={(val) => {
                  setValue("password", val.target.value)
            }
            } value={loginDetails.password} required className="form-control" id="password" placeholder="password@example.com" />
            <label for="password">Password</label>
          </div>

        
          <div className="checkbox mb-3 my-1">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <div className="spiner-parent">
          <button disabled={submitted} className="w-100 btn btn-lg btn-color btn-primary" type="submit">Submit</button>
          {(submitted && startSpiner) && <Spinner className="spiner-child" /> }
          </div>

          <button onClick={(e) => {
              e.preventDefault()
                redirect("/user/request/password-reset", {state: {type:"LECTURER", url: "/auth/login/lecturer"}})
          }} href="http://www.google.com" className="my-2 d-block btn text-white fgtp">Forget Password</button>
          <a href="/auth/register/lecturer" className="my-2 d-block">Dont have account?</a>
          <p className="mt-5 mb-3 text-muted">&copy; Auto Code Grader 2023–2024</p>
        </form>
        </Col>
        <Side text={text} logo={logo} /> 
        </Row>
</Container>
)
}

export {LoginLecturerForm}