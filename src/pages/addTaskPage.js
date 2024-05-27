import { Navigate } from "react-router-dom"
import { AddTask } from "../components/addTask"
import { token } from "../utils/config"
import { getToken } from "../utils/localstorage"
import { useLocation } from "react-router-dom"
import { Footer } from "../components/footer.js"
import { LecturerNavbar } from "../components/navbarLecturer.js"
import { UserProfile } from "../components/userProfile.js"


const AddTaskPage = () => {
    let location = useLocation()
    let auth = getToken(token.lecturerTokenKey)
    if(auth){
        if(location.state)
            return(
            <>
            <div style={{minHeight: "10vh"}}>
                <LecturerNavbar />
                <UserProfile />
            </div>
            <div style={{minHeight: "80vh"}}>
            <AddTask  compiler={location.state.compiler} assId={location.state.assId} />
            </div>
            <Footer />
            </>
            )
        else 
            return (<Navigate to="/lecturer/dashboard"/>)
    } else {
        return <Navigate to="/auth/lecturer/login" />
    }
}

export {AddTaskPage}