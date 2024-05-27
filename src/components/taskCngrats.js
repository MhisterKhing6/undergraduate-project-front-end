import emailPic from "../assets/verified.png"
import "./verfyemail.css";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

const CongratulationTask = ({assId, compiler}) => {
    const redirect = useNavigate()
    return (
        <section className="container">
            <section className="raise d-flex flex-column justify-content-center align-items-center">
                <div>
                    <img style={{width: '300px', height: "250px "}} className="img-fluid" src={emailPic} alt="email" />
                </div>
                <article className="text-center">
                    <h3 className=" text-primary lead my-1"><b>Question Successfully Added </b> </h3>
                    <p>Add Another Question or Got get back to Dashboard</p>
                </article>
                
                <div className="d-flex justify-content-center align-items-center">
                    <div className="w-50">
                    <button onClick={(e) => {
                        e.preventDefault()
                        redirect("/lecturer/add/task", {state: {assId, compiler}})
                        }}style={{width:"100%", fontWeight: "bold", fontSize: "1rem"}} className="btn ovrerfl btn-primary">Add Question</button>
                    </div>
                    <div xs={6} className="w-50">
                    <button onClick={(e) => {
                        e.preventDefault()
                        redirect("/lecturer/dashboard", {state: {assId, compiler}})
                        }}style={{width: "100%", fontWeight: "bold", fontSize: "1rem"}} className=" mx-2 btn btn-primary">Back To Home</button>
                    </div>
              </div>
            </section>
        </section>
    )
}

export {CongratulationTask}