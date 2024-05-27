import { useLocation } from "react-router-dom"
import { ForgetPasswordRequestForm } from "../components/forgetPasswordRequestForm.js"

const ForgetPasswordRequestPage = () => {
    let loc = useLocation()
    if(loc.state)
        return (<ForgetPasswordRequestForm loginUrl={loc.state.url} type={loc.state.type} />)
}
export {ForgetPasswordRequestPage}