import emailPic from "../assets/verified.png"
import "./verfyemail.css";

const Congratulations = ({url}) => {
    return (
        <section className="container">
            <section className="raise d-flex flex-column justify-content-center align-items-center">
                <div>
                    <img style={{width: '300px', height: "250px "}} className="img-fluid" src={emailPic} alt="email" />
                </div>
                <article className="text-center">
                    <h2 className="display-5 text-primary my-1"><b>Congratulations Account Verified </b> </h2>
                    <p style={{fontSize: "20px"}}>Thanks for your Co-operations</p>
                </article>
                <a style={{fontWeight: "bold", fontSize: "1rem"}} className="btn btn-primary" href={url}>Back to Login</a>
            </section>
        </section>
    )
}

export {Congratulations}