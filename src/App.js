import logo from './logo.svg';
import react, {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import UploadForm from './form/UploadForm';
import DataLine from './form/DataLine';
import { Container, Row, Col, Table } from 'react-bootstrap';
import './App.css';
import DataHeader from './form/DataHeader';

function App() {
  const [rows, setRows] = useState(null)
  const [header, setHeader] = useState(null)
  const [fName, setFName] = useState('')
  const {data, url, config} = configRequest()

  const submissionHandler = async (e) => {
      e.preventDefault()
      try {
          const res = await axios.post(url, data, config)
          console.log({response: res, data: res.data})
          const tableData = res.data[Object.keys(res.data)[0]]
          console.log({tableData})
          const tblAtts = tableData.attributes
          const tblHead = <DataHeader attributes={tblAtts}/>
          const tableBody = Object.entries(tableData.data).map(([key, value]) => <DataLine key={key} lineNum={key} line={value} attributes={tblAtts}/>)
          setRows(tableBody)
          setHeader(tblHead)
      } catch(error){
          console.error({error})
      }
  }
  return (
    <div id="main" className={!rows ? "d-flex align-items-center justify-content-center p-5" : ""}>
      <></>
      <Container>
        <Row className={rows && "mt-6" }>
          <Col><UploadForm dataActive={!!rows} submissionHandler={submissionHandler} formData={data} fileName={fName}/></Col>
          {rows == null && <Col className="d-flex align-items-center justify-content-center p-5"><h2 className={"main-title"}>Convert Your PDF into an easy to use Data Format!</h2></Col>}
        </Row>
        <Row>
          <Table striped bordered hover>
            {header}
            {rows}
          </Table>
        </Row>
        
      </Container>
    </div>
    
  );
}

export default App;


//Helper Functions

const configRequest = () => {
  const data = new FormData()
  data.append("table", true)
  const config = {
    headers: {'content-type': 'multipart/form-data'}
  }
  
  // const url = "http://localhost:3000/pdf"
  const url = "https://pdf-parser-microservice.herokuapp.com/pdf"
  return {data, config, url}

}