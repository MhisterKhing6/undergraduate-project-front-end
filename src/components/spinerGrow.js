import { Spinner } from "react-bootstrap";

const SpinerGrow = () => {
    return (

        <div style={{minHeight: "80vh"}} className="w-100 d-flex justify-content-center align-items-center" >
            <Spinner className="d-block spinerGrow" animation="grow"  />
        </div>
        
    )
}
export {SpinerGrow}