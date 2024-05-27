import { Congratulations } from "../components/congratulations.js"
import { useLocation } from "react-router-dom"

const CongratulationsPage = () => {
    let loc = useLocation()
    if(loc.state)
        return (<Congratulations url={loc.state.url} />)
}

export {CongratulationsPage}