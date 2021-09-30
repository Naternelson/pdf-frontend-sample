import axios from "axios"
import react, { useState } from "react";
// const FormData = require('form-data');
// const fs = require('fs');

const TestForm = props => {
    const data = new FormData();
    const [pdfData, setPdfData] = useState(null)
    const changeHandler = e => {
        console.log({file: e.target.files[0]})
        data.append('pdf_file', e.target.files[0])
    }
    const handleReset = e => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
    }
    const submissionHandler = async (e) => {
        e.preventDefault()
        try {
            const config = {headers: {'content-type': 'multipart/form-data'}}
            const res = await axios.post('https://pdf-parser-microservice.herokuapp.com/pdf', data, config)
            const lines = []
            for (const [, value] of Object.entries(res.data.data.attributes.lines.lines)){
                lines.push(Object.entries(value).join(' '))}
            setPdfData(lines)
            handleReset()
        } catch(err){
            console.log({err})
        }
    }
    return <>
        <form onSubmit={submissionHandler}>
            <div>
                <label htmlFor='upload'>Upload PDF</label>
                <input type="file" name="upload" onChange={changeHandler}/>
            </div>
            <button type='submit'>Upload</button>
        </form>
        {pdfData && <div>{pdfData}</div>}
    </>
}
export default TestForm