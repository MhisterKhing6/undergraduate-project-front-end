import { useEffect, useState } from 'react';
import { Form, Container,Card, Button } from 'react-bootstrap';
import {getFromBackend, postToBackend } from '../utils/backendCalls.js';
import { convertToDateTimeLocalString, token } from '../utils/config.js';
import {Spinner} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/localstorage.js';
import { SpinerGrow } from './spinerGrow.js';
const fetchRequiredData = async (compilersState, programState) => {
    let compilers = await getFromBackend("/api/compilers")
    if (compilers.status === 200) {
        compilersState(compilers.data)
    } else {
        alert(compilers.data.reason)
    }
    let programs = await getFromBackend("/api/programs")
    if(programs.status === 200) {
        programState(programs.data)
    } else {
        alert(programs.data.reason)
    }
}
function AssignmentCreationForm(auth) {
    let [gitMode, setGithubSubMod] = useState(false)
    let [startDate, setStartDate] = useState(convertToDateTimeLocalString(new Date()))
    let [endDate, setEnddate] = useState(convertToDateTimeLocalString(new Date()))
    let [Clases,setClasses ] = useState([])
    let [programs, setPrograms] = useState([])
    let [compilers, setCompilers] = useState([])
    let [plagiarism, setPlagiarism] = useState(false)
    let [documentation, setDocumentation] = useState(false)
    let [codingStandards, setCodingStandards] = useState(false)
    let [readme, setReadme] = useState(false)
    let [objectives, setObjectives] = useState("")
    let [repository, setRepository] = useState("")
    let [loadingClass, setLoadingClass] = useState(true)
    let [startSpiner, setStartSpiner] = useState(false)
    let [CompilerId, setCompiler] = useState("")
    let [ClassId, setAssClass] = useState("")
    let [title, setTitle] = useState("")
    let [courses, setCourses] = useState([])
    let [CourseId, setCourse] = useState("")
    let [loadingCourses, setLoadingCoures] = useState(false)
    let [courseSpiner, loadSpiner] = useState(false)
    let [submission, setSubmission] = useState(false)
    let redirect = useNavigate()

    const min = convertToDateTimeLocalString(new Date(), 5);
    useEffect(() => {
        fetchRequiredData(setCompilers, setPrograms)
    }, [])

        return (
            <div className='w-100 h-100'>
            {submission &&<SpinerGrow /> }
            {!submission && <Container className='w-100 mx-auto p-2 p-md-3 p-lg-5'>
                <Card className='p-2'>
                <Form onSubmit={async (val) => {
                    val.preventDefault()
                    setSubmission(true)
                    //get details
                    if(!CompilerId) {
                        alert("Please Select Programming language")
                    }
                    //check if start Date is less than end datae
                    let stDate = new Date(startDate)
                    let enDate = new Date(endDate)
                    if(stDate >= enDate)
                        alert("starting date for an assignment cant be greater than end date")
                    if(!ClassId)
                        alert("please choose class for the assignment by selecting program")
                    if(!CourseId)
                        alert("please select the  course for the assignment")
                    if(ClassId && CompilerId && CourseId) {
                        let assignment = {CourseId, startDate, endDate,title, ClassId, CompilerId, plagiarism, documentation, codingStandards, objectives, repository,readme, gitMode}
                        //send assignment to backend
                        let url = "/coder/lecturer/assignment"
                        let response = await postToBackend(url, assignment, getToken(token.lecturerTokenKey))
                        if(response.status === 201){
                            //find the compiler with the id
                            let compiler = null
                            for(const lang of compilers) {
                                if(CompilerId === lang.id) {
                                    compiler = {...lang}
                                    break
                                } 
                            }
                            setSubmission(false)
                            redirect("/lecturer/assingment/congrats", {state: {assId:response.data.id, compiler}})
                        }
                        else {
                            setSubmission(false)
                        }
                    }

                }}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label  style={{fontSize: "1.2rem", fontWeight: "bold"}}>Title Of Assignment*</Form.Label>
                        <Form.Control value={title} onChange={(val) => setTitle(val.target.value)} required size='lg' type="text" placeholder="Introdction to Programming" />
                    </Form.Group>
                    <div className='d-flex justify-content-between'>
                    <Form.Group className="mb-3 w-50"  controlId="exampleForm.ControlTextarea1">
                        <Form.Label  style={{fontSize: "1.2rem", fontWeight: "bold"}}>Start Date</Form.Label>
                        <Form.Control onChange={(val)=> {
                            setStartDate(val.target.value)
                            setEnddate(val.target.value)
                        }} type="datetime-local" min={min} value={startDate} size='lg' required rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3 w-50 px-3"  controlId="exampleForm.ControlTextarea1">
                        <Form.Label  style={{fontSize: "1.2rem", fontWeight: "bold"}}>End Date</Form.Label>
                        <Form.Control onChange={(val) => setEnddate(val.target.value)} min={startDate} required value={endDate} type="datetime-local"  size='lg' rows={3} />
                    </Form.Group>
                    </div>
                    <div className='my-2'>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>Programming Language*</p>
                        <Form.Control as="select" required onChange={(val) => {
                           setCompiler(val.target.value)
                        }} size="lg"  aria-label="Default select examplaple">
                            <option  disabled selected hidden>Programming Language*</option>
                            {compilers.map(val => {
                                return (<option key={val.id} value={val.id}>{val.name}</option>)
                            })}
                            
                        </Form.Control>
                    </div>
                    <div className='my-2'>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}}  className='text-dark'>Program*</p>
                    <Form.Control as="select"  onChange={async (val) => {
                        val.preventDefault()
                        //set program id
                        //set loadingClass to false
                        setLoadingClass(false)
                        //set startSpiner to true
                        setStartSpiner(true)
                        //get classes for the program
                        let url ="/api/program/classes"
                        let response = await postToBackend(url, {programId: val.target.value})
                        console.log(response)
                        if(response.status === 200) {
                            setLoadingClass(false)
                            setClasses(response.data)
                        } else {
                            alert(response.data.reason)
                        }
                        setStartSpiner(false)
                        
        
                    }} size="lg" required aria-label="Default select example m-2">
                        <option hidden disabled selected>Select Programme</option>
                        {programs.map(val => {
                            return (<option key={val.id} value={val.id}>{val.programName}</option>)
                        })}
                    </Form.Control>
                    </div>
                    <div className='my-2'>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>Class*</p>
                    <div className='spiner-parent'>
                        <Form.Select required className="form-select-lg form-control" disabled={loadingClass} onChange={async (val) => {
                            setAssClass(val.target.value)
                            setLoadingCoures(true)
                            loadSpiner(true)
                            //load courses
                            let courses = await getFromBackend(`/api/program/class/courses/${val.target.value}`)
                            if(courses.status === 200) {
                                setCourses(courses.data)
                                setLoadingCoures(false)
                            } else {
                                alert(courses.data.reason)
                            }
                            loadSpiner(false)
                        }}  size="lg"  aria-label="Default selectexamplaple">
                            <option hidden disabled selected>Select Class</option>
                            {Clases.map(val => {
                                return(<option key={val.id} value={val.id}>{val.className}</option>)
                            })}
                        </Form.Select>
                       {startSpiner && <Spinner className="spiner-child" /> }
                    </div>
                    </div>

                    <div className='my-2'>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>Course*</p>
                    <div className='spiner-parent'>
                        <select required className="form-select-lg form-control" disabled={loadingCourses} onChange={async (val) => {
                            setCourse(val.target.value)
                        }}  size="lg"  aria-label="Default selectexamplaple">
                            <option hidden disabled selected>Select Course</option>
                            {courses.map(val => {
                                return(<option key={val.id} value={val.id}>{val.courseCode}</option>)
                            })}
                        </select>
                       {courseSpiner && <Spinner className="spiner-child" /> }
                    </div>
                    </div>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}} className='my-1'>General Test</p>
                    <div className='mx-4 mb-2 px-4' style={{fontSize: "1.2rem"}}>
                        <Form.Check
                        label="Plagiarism"
                        id= "pg"
                        checked = {plagiarism}
                        onChange={() => setPlagiarism(!plagiarism)}
                        />
                        <Form.Check
                        label="Documentation"
                        id= "Ds"
                        checked = {documentation}
                        onChange={() => setDocumentation(!documentation)}
                        />
                        <Form.Check
                        label="Coding Style Check"
                        id= "csc"
                        checked = {codingStandards}
                        onChange={() => setCodingStandards(!codingStandards)}
                        />
                        <Form.Check
                        label="Readme Check"
                        id= "rc"
                        checked = {readme}
                        onChange={() => setReadme(!readme)}
                        />
                    </div>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}} className='my-2'>Mode of Submission</p>
                    <div className='mx-4 mb-2'>
                    
                        <Form.Check
                        label="Github"
                        id= "gt"
                        style={{fontSize: "1.2rem"}}
                        inline
                        className='mx-4'
                        onClick={(val) => setGithubSubMod(!gitMode)}
                        type={"radio"}
                        checked={gitMode}
                        name="subMode"/>    
                    </div>
                    {gitMode && <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label  style={{fontSize: "1.2rem", fontWeight: "bold"}}>Repository Name</Form.Label>
                        <Form.Control value={repository} onChange={(val) => setRepository(val.target.value)} required={gitMode} size='lg' type="text" placeholder="assignment2" />
                    </Form.Group> }
        
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label  style={{fontSize: "1.2rem", fontWeight: "bold"}}>Objectives</Form.Label>
                        <Form.Control value={objectives} onChange={(val) => setObjectives(val.target.value)} as="textarea" rows={3}  />
                    </Form.Group>
                    <div className="d-grid">
                    <Button type="submit" variant="primary" size="lg">
                        save
                    </Button>
                    </div>
                </Form>
                </Card>
            </Container> }
            </div>
          );
  
}
export {AssignmentCreationForm};