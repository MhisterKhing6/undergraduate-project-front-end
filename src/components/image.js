import { Col } from "react-bootstrap"

const Side = ({text, logo}) => {
    return (
    <Col xs={12} md={6} className="p-3">
      <div className="overflow-hidden h-75">
      <img src={logo}  className="mw-100 h-25 upToDown"/>
      </div>
        <div className="h-25 text-center">
        <h4 style={{fontSize: "2rem"}}><b>{text}</b></h4>
        <hr />
        </div>
    </Col>
    )
}

export {Side}