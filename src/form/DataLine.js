// import react, { useState } from "react";


const DataLine = props => {
    const {line, lineNum, attributes} = props 
    const tds = attributes.map((a,i) => <td key={i} dataindex={lineNum}>{line[a]}</td>)
    return <tr className={"data-line"}>
        {tds}
    </tr> 
}
export default DataLine