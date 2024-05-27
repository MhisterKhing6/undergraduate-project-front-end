import { useLocation } from "react-router-dom"
import { NewPwdCongratulations } from "../components/congratulationsNewpwd"

const NewPwdCongratulationsPage = () => {
    const location = useLocation()
    if(location.state)
        return <NewPwdCongratulations  loginUrl={location.state.loginUrl}/>
    
}

export {NewPwdCongratulationsPage}