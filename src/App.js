import logo from './logo.svg';
import react, {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import UploadForm from './form/UploadForm';
import DataLine from './form/DataLine';
import { Modal, Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import './App.css';
import DataHeader from './form/DataHeader';

function App() {
  const [rows, setRows] = useState(null)
  const [loading, setLoading] = useState(false)
  const [header, setHeader] = useState(null)
  const [fName, setFName] = useState('')
  const {data, url, config} = configRequest()

  const submissionHandler = async (e) => {
      e.preventDefault()
      try {
          setLoading(true)
          const res = await axios.post(url, data, config)
          
          const tableData = res.data[Object.keys(res.data)[0]]
          const tblAtts = tableData.attributes
          const tblHead = <DataHeader attributes={tblAtts}/>
          const tableBody = Object.entries(tableData.data).map(([key, value]) => <DataLine key={key} lineNum={key} line={value} attributes={tblAtts}/>)
          setRows(tableBody)
          setHeader(tblHead)
          setLoading(false)
      } catch(error){
          setLoading(false)
          console.error({error})
      }
  }
  return (
    <div id="main" className={!rows ? "d-flex align-items-center justify-content-center p-5" : ""}>
      <Modal show={loading} onHide={()=>setLoading(false)} centered >
        <div style={{padding: "2rem",display: 'flex', flexDirection:'row', justifyContent:'center', background:'transparent'}}>
          <div style={{textAlign:'center'}}>
            <Spinner animation='border'/>
            <div>Loading...</div>
          </div>

        </div>
        
      </Modal>

      <Container>
        <Row className={rows && "mt-6" }>
          <Col><UploadForm dataActive={!!rows} submissionHandler={submissionHandler} formData={data} fileName={fName}/></Col>
          {rows == null && <Col className="d-flex align-items-center justify-content-center p-5"><h2 className={"main-title"}>Convert Your PDF into an easy to use Data Format!</h2></Col>}
        </Row>
        <Row>
          <Table striped bordered hover>
            {header}
            <tbody>
              {rows}
            </tbody>
            
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
    headers: {'content-type': 'multipart/form-data'},
    withCredentials: true
  }
  
  // const url = "http://localhost:3000/pdf"
  const url = "https://pdf-parser-backend.herokuapp.com/pdf"
  console.log({data, config, url})
  return {data, config, url}

}