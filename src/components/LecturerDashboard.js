import { DashBoardElement } from "./dasboardElement"
import { Row, Container } from "react-bootstrap"
import { MdAssignmentAdd } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { IoBarChart, IoEar } from "react-icons/io5";
import { UserProfile } from "./userProfile";
import { LecturerNavbar } from "./navbarLecturer";

const LecturerDashboard = ()=> {
    let actions = [{url:"/lecturer/create/assignment", title: "Create Assignment", desc:"Design programming assignments to challenge students, enhance coding skills, and cultivate problem-solving abilities through hands-on practice and real-world scenarios.", "icon": <MdAssignmentAdd style={{fontSize: "3rem"}} />},
                   {url: "#" , "title": "View Assignments", desc:"View created assignments effortlessly, ensuring clarity, coherence, and alignment with learning objectives for seamless instruction and assessment.", icon: <CiViewBoard style={{fontSize: "3rem"}} /> },
                   {url:"#", "title": "Edit Assignment", desc: "Effortlessly modify existing assignments, tailoring content, adjusting parameters, and refining instructions to meet evolving educational needs with precision and ease.", icon: <CiEdit style={{fontSize: "3rem"}} />},
                   {url:"#", "title": "Student Result", desc: "Easily review student assignment results in various formats, ensuring accessibility and facilitating comprehensive assessment and feedback for effective learning.",icon:<IoBarChart style={{fontSize: "3rem"}} />}]
    
    return(
        <>
        <Container fluid >
            <Row>
            {
                actions.map((val) => {
                    return (
                        <DashBoardElement url={val.url} key={val.title} title={val.title} desc={val.desc}>
                            {val.icon}
                        </DashBoardElement>
                    )
                })
            }
            </Row>
        </Container>
        </>
    )
}

export {LecturerDashboard}
