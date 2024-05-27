import {useLocation } from "react-router-dom"
import { ForgetPwdTokenConfirmation } from "../components/fgTokenConfirmaion.js"

const ForgetPwdTokenConfirmationPage = () => {
    let loc = useLocation()
    if(loc.state)
        return (<ForgetPwdTokenConfirmation loginUrl={loc.state.loginUrl} verificationId={loc.state.verificationId} email={loc.state.email} type={loc.state.type} />)
    
}

export {ForgetPwdTokenConfirmationPage}