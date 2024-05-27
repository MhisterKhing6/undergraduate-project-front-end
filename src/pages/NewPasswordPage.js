import { NewPasswordForm } from "../components/newPasswordForm"
import { useLocation } from "react-router-dom"
const NewPassworPage = () => {
    let loc = useLocation()
    if(loc.state)
        return  <NewPasswordForm loginUrl={loc.state.loginUrl} verificationId = {loc.state.verificationId} />
}

export {NewPassworPage}