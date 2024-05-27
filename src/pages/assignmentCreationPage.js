import { AssignmentCreationForm } from "../components/assignmenCreationForm.js"
import { Navigate } from "react-router-dom"
import { getToken } from "../utils/localstorage.js"
import { token } from "../utils/config.js"
import { LecturerNavbar } from "../components/navbarLecturer.js"
import { UserProfile } from "../components/userProfile.js"
import { Footer } from "../components/footer.js"

const AssignmentCreationPage =() => {
    const auth = getToken(token.lecturerTokenKey)
    if(auth) {
        return (
        <>  
            <div style={{minHeight: "10vh"}}>
                <LecturerNavbar />
                <UserProfile />
            </div>
            <div style={{minHeight: "80vh"}}>
                <AssignmentCreationForm token={auth}/>
            </div>
            <Footer />
            
        </>
        )
    } else {
        return (<Navigate to="/auth/login/lecturer" />)
    }
}

export {AssignmentCreationPage}