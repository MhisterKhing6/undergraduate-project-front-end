import { Link, Navigate } from 'react-router-dom';
import {Row, Col} from "react-bootstrap"


const DashBoardElement = ({title,children, desc, url}) => {
    return (
    
        <Col  xs={12} sm ={6} md={4} lg={3} className="p-2">
            <Link to={url}>
            <Row className="overflow-hidden dashboardElem shadow-lg p-3 bg-white">
                {children}
                <p style={{fontSize: "2rem"}} className='my-1 lead'>{title}</p>
                <p className='my-1'>{desc}</p>
            </Row>
            </Link>
        </Col>
   

    )
}

export {DashBoardElement}