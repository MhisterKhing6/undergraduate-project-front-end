import { Navigate } from "react-router-dom"
import { getToken } from "../utils/localstorage.js"
import { token } from "../utils/config.js"
import { LecturerNavbar } from "../components/navbarLecturer.js"
import { UserProfile } from "../components/userProfile.js"
import { Footer } from "../components/footer.js"
import { CongratulationsAssignment } from "../components/congratsAssignements.js"
import { useLocation } from "react-router-dom"

const CongratulationsAssignmentPage =() => {
    const loc = useLocation()
    const auth = getToken(token.lecturerTokenKey)
    if(auth) {
        if(!loc.state)
            return (<Navigate to="/lecturer/dashboard" />)
        return (
        <>  
            <div style={{minHeight: "10vh"}}>
                <LecturerNavbar />
                <UserProfile />
            </div>
            <div style={{minHeight: "80vh"}}>
                <CongratulationsAssignment assId={loc.state.assId} compiler={loc.state.compiler} />
            </div>
            <Footer />
            
        </>
        )
    } else {
        return (<Navigate to="/auth/login/lecturer" />)
    }
}

export {CongratulationsAssignmentPage}