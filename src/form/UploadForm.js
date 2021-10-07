import axios from "axios"
import react, { useState } from "react";
import { Form, Button } from "react-bootstrap";
// const FormData = require('form-data');
// const fs = require('fs');

const UploadForm = props => {
    const {submissionHandler, formData, dataActive} = props 
    const fileInputName = "pdf_file"
    const changeHandler = e => {
        switch(e.target.name){
            case (fileInputName):
                formData.append(fileInputName, e.target.files[0])
                break;
            default:
                formData.append(e.target.name, e.target.value)
        }
        
    }
    const handleReset = e => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
    }
    const localSubHandler = (e) => {
        submissionHandler(e)
        handleReset()
    }
    return <Form onSubmit={localSubHandler} className="mb-5">
            <div className='d-flex justify-content-center'><h1>Convert PDF</h1></div>
            <Form.Group className={"mb-2"}>
                <Form.Label htmlFor={fileInputName}>File</Form.Label>
                <Form.Control size={dataActive ? "sm" : "md"} type="file" name={fileInputName} onChange={changeHandler}/>
            </Form.Group>
            <Form.Group className={"mb-2"}>
                <Form.Label htmlFor='row-index'>Row Index</Form.Label>
                <Form.Control size="md" type="number" name="row-index" aria-describedby="rowIndexHelpBlock" onChange={changeHandler}/>
                <Form.Text id="rowIndexHelpBlock" muted>The line of text that contains column heads</Form.Text>
            </Form.Group>
            <Button type='submit' size='lg'>Convert</Button>
        </Form>

}
export default UploadForm