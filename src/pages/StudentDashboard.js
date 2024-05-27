/** protected route */

import {useEffect } from "react"
import { getToken } from "../utils/localstorage.js"
import { token } from "../utils/config.js"
import { Navigate} from "react-router-dom"

const StudentDashboard = () => {
    const authenticated = getToken(token.studentTokenKey)

    useEffect(() => {
        
    })
    
    if(!authenticated) {
        return <Navigate to="/auth/login/student" />
    } else {
      return  (<h1> Student Page Not implemented</h1>)
    }
}

export {StudentDashboard}