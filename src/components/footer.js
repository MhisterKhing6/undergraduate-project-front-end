import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
    return (
        <Container fluid style={{minHeight: "25vh"}} className=" bg-black text-white">
            <Row className="justify-content-center align-items-center">
                <Col xs={4}>
                <p className="text-center lead">Introduction</p>
                </Col>
                <Col  xs = {4}>
                    <p className="text-center lead">
                        Programs
                    </p>
                </Col>
                <Col xs={4}>
                    <p className="text-center lead">Information</p>
                </Col>
            </Row>
            <p className="text-center display-6">Auto Code Grader @2023-24</p>

        </Container>
    )
}
export {Footer}