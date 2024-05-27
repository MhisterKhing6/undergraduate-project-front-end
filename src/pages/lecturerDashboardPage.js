/** protected route */

import {useEffect } from "react"
import { getToken } from "../utils/localstorage.js"
import { token } from "../utils/config.js"
import { Navigate} from "react-router-dom"
import { LecturerDashboard } from "../components/LecturerDashboard.js"
import { Footer } from "../components/footer.js"

import { LecturerNavbar } from "../components/navbarLecturer.js"
import { UserProfile } from "../components/userProfile.js"
const LecturerDashboardPage = () => {
    const authenticated = getToken(token.lecturerTokenKey)
    
    if(!authenticated) {
        return <Navigate to="/auth/login/lecturer" />
    } else {
      return  (
      <>
      <div style={{minHeight: "25vh"}} className="my-0">
      <LecturerNavbar />
        <UserProfile />
      </div>
      <div style={{minHeight: "65vh"}} className="my-0">
      <LecturerDashboard />
      </div>
      <Footer />
      </>
      )
    }
}

export {LecturerDashboardPage}