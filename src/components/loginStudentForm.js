import "./login.css"
import {useState } from "react"
import Toast  from "./toast"
import { postToBackend } from "../utils/backendCalls.js"
import { saveToken } from "../utils/localstorage.js"
import { useNavigate } from "react-router-dom"
import { Spinner, Col, Row, Container} from "react-bootstrap"
import { token } from "../utils/config.js"
import { Side } from "./image.js"
import logo from "../assets/logo-color.png"

const LoginStudentForm = () => {
   const [loginDetails, setloginDetails] = useState({"studentId": "", "password": ""})
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
   const text = "Please Login Student"
  return (
  <Container className="mx-auto">
  <Row className="justify-content-center align-items-center">
      <Side text={text} logo={logo} />
      <Col  xs={12} md={6}>
        <form className="registration p-5" onSubmit={async (e) =>{
          e.preventDefault()
          togleShow(false)
          //disable button
          setSpiner(true)
          setSubmitted(true)
          let result = await postToBackend("/api/auth/login/student", loginDetails)
          //post data login datat to backend
          if(result.status !== 200) {
            setMessage(result.data.reason)
          } else {
            setMessage("success")
            //save token
            saveToken(token.studentTokenKey, result.data.token)
            //redirect to student dashboard
            redirect("/student/dashboard")
          }
          togleShow(true)
          setSubmitted(false)
          setSpiner(false)

        }}>
          <section className='w-100 d-flex justify-content-center align-items-center my-2'>
          <img  className="my-1" src={logo} alt="" width="100" height="100" />
          </section>

          <h4 className="h3 text-center mb-3 notice fw-normal my-2">Auto Code Grader</h4>
          <hr />
          <h6>Student Log In</h6>
          {show && <Toast text={message} hidden={hidden}/> }

          <div className="form-floating" style={{minWidth: "350px"}}>
            <input   type="text" onChange={(val) => {
              setValue("studentId", val.target.value)
            }} value={loginDetails.studentId}   required className="form-control" id="LecID" placeholder="Lecturer_ID" />
            <label for="LecID">Student ID</label>
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
            redirect("/user/request/password-reset", {state: {type:"STUDENT", url: "/auth/login/student"}})
          }} className="fgtp btn text-white my-2 d-block">Forget Password</button>
          <a href="/auth/register/student" className="my-2 d-block">Dont have account?</a>
          <p className="mt-5 mb-3 text-muted">&copy; Auto Code Grader 2023–2024</p>
        </form>
      </Col>
    </Row>
</Container>
)
}

export {LoginStudentForm}