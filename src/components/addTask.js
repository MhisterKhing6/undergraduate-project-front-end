import { Button, Card, Container, Form } from "react-bootstrap"
import { useState } from "react"
import { ProgrammingEditor } from "./Editor"
import { convertBase64, decodeBase64, getExtension, token } from "../utils/config"
import { postToBackend } from "../utils/backendCalls"
import { getToken } from "../utils/localstorage"
import { SpinerGrow } from "./spinerGrow"
import {useNavigate } from "react-router-dom"
const AddTask = ({assId, compiler}) => {

    let [number, setNumber] = useState()
    let [requirement, setRequirement] = useState()
    let [detailCond, setDetailed] = useState("")
    let [explanationExamples, setExplanationExamples] = useState("")
    let [language, setLanguage] = useState("ruby")
    let [solunT, setSolunT] = useState("")
    let [solunTCode, setSolunTCode] = useState("")
    let [solutionPath, setSolutionPath] = useState("")
    let [scriptName, setScriptName] = useState("")
    let [submission, setSubmission] = useState(false)
    const redirect  = useNavigate()
    let extensions = compiler.extension.replaceAll(".","").split(",")


    const detailChange  = (val) => {
        setDetailed(val.target.value)
    }

    const solunTChange = (val) => {
        setSolunT(val.target.value)
    }
    return (
        <>
        {submission && <SpinerGrow />}

        {!submission && <Container className="w-100 mx-auto p-2 p-md-3 p-lg-5" >
            <Card className="p-2">
                <Form onSubmit={async (val) => {
                    val.preventDefault()
                    setSubmission(true)
                    if(!detailCond || !(detailCond === "Type" && explanationExamples )) {
                        alert("please provide details to requirement")
                    }
                    //check for solution text script
                    if(!solunT || !(solunT === "Type" && solunTCode )) {
                        alert("please provide solution test script by loading a file or typing in the editor")
                    }else {
                        let assObject = {ext:extensions[0] ,solutionPath, number,AssignmentId: assId, requirement, examples: explanationExamples, solutionScript: solunTCode }
                        //submit to backend
                        let url = "/coder/lecturer/assignment/task"
                        let dataB = await postToBackend(url, assObject, getToken(token.lecturerTokenKey))
                        if(dataB.status !== 201) 
                        alert(dataB.data.reason)
                        else {
                           redirect("/lecturer/task/congrats", {state: {assId, compiler}})
                        }
                    }
                    setSubmission(false)
                    
                    //form the data
                }}>
                    <Form.Group className="my-2">
                        <Form.Label><b>Question Number</b></Form.Label>
                        <Form.Control size="lg" required   isValid={Number.isInteger(parseInt(number))} type="number" value={number} onChange={(val) => setNumber(val.target.value)}/>
                    </Form.Group>

                    <Form.Group className="my-2">
                        <Form.Label><b>Genral Requirement* </b></Form.Label>
                        <Form.Control isValid={requirement} style={{minHeight: "15vh"}} className="p-2" required as="textarea" value={requirement} onChange={(val) => setRequirement(val.target.value)} />
                    </Form.Group> 

                    <Form.Group className="my-2">
                        <Form.Label><b>Detailed Requirements and Examples </b></Form.Label> <br />
                        <Form.Check onChange={detailChange} value="File" checked={detailCond === "File"} style={{fontSize: "1.3rem"}} className="mx-4 p-2" name="requirements" inline   type="radio"  label="Upload a file" />
                        <Form.Check checked={detailCond === "Type"}  value="Type" onChange={detailChange} style={{fontSize: "1.3rem"}} className="mx-4 p-2" name="requirements" inline   type="radio" label="Type in Editor" />
                        <Form.Control.Feedback>Enter question Requirements</Form.Control.Feedback>
                    </Form.Group>
                    {detailCond==="File" && <Form.Group className="my-2">
                        <Form.Label><b>Upload Script </b></Form.Label>
                        <Form.Control required= {detailCond === "File"} isInvalid={!explanationExamples} accept={`.md,${compiler.extension}`} type="file" onChange={async (val) => {
                            let file = val.target.files[0]
                            //check if file contain extension
                            let fileName = file.name
                            let ext = getExtension(fileName)
                            if(!(ext === "md" || extensions.includes(ext)))
                                alert(`plese you can only choose ${extensions} files`)
                            else {
                                const base64 = await convertBase64(file)
                                const data = decodeBase64(base64.split(",").pop())
                                setExplanationExamples(data)
                            } 
                        }} />
                        <Form.Control.Feedback type="invalid">Please select files with .md, {compiler.extension} extension</Form.Control.Feedback>
                    </Form.Group>}
                    {detailCond === "Type" && <ProgrammingEditor code={explanationExamples} setCode={setExplanationExamples} className="w-100" language={compiler.name}/>}
                    <Form.Group className="my-2">
                        <Form.Label><b>Solution Test Script*</b></Form.Label> <br />
                        <Form.Check onChange={solunTChange} value="File"  checked={solunT === "File"} style={{fontSize: "1.3rem"}} className="mx-4 p-2" name="solutionTest" inline   type="radio"  label="Upload a file" />
                        <Form.Check checked={solunT === "Type"}   value="Type" onChange={solunTChange} style={{fontSize: "1.3rem"}} className="mx-4 p-2" name="solutionTest" inline   type="radio" label="Type in Editor" />
                        <Form.Control.Feedback >Please Give Test Script for Solution</Form.Control.Feedback>
                    </Form.Group>
                    {solunT==="File" && <Form.Group className="my-2">
                        <Form.Label><b>Upload Test Script</b></Form.Label>
                        <Form.Control required= {detailCond === "File"} accept={compiler.extension} isInvalid={!solunTCode} type="file" onChange={ async (val) => {
                            let file = val.target.files[0]
                            setScriptName(file.name)
                            let ext = getExtension(file.name)
                            if(ext !== "md" && extensions.includes(ext)) {
                                const base64 = await convertBase64(file)
                                const data = decodeBase64(base64.split(",").pop())
                                setSolunT(data) 
                            } else {
                                alert(`please you can only upload ${extensions}`)
                            } }}  />
                            
                        <Form.Control.Feedback>Select file with {compiler.extension} extension</Form.Control.Feedback>
                    </Form.Group>}
                    {solunT === "Type" && <ProgrammingEditor code={solunTCode} setCode={setSolunTCode} className="w-100 my-2" language={compiler.name}/>}
                    
                    <Form.Group className="my-2">
                        <Form.Label><b>Solution File Path</b></Form.Label>
                        <Form.Control size="lg" placeholder="/assignment2/question1.js" required isInvalid={!solutionPath} type="text" value={solutionPath} onChange={(val) => setSolutionPath(val.target.value)} />
                        <Form.Control.Feedback type="invalid">Please give the file path for student Solution script</Form.Control.Feedback>
                    </Form.Group> 
                        <Button className="w-100 my-2" type="submit">Save</Button>
                </Form>
            </Card>
        </Container> }
        </>
    )
}

export {AddTask}