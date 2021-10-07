// import react, { useState } from "react";

import titleFor from "../utilities/string/titleize"


const DataHeader = props => {
    let {attributes} = props 
    attributes = attributes.map(a => <th key={a}>{titleFor(a)}</th>)
    return <tr className={"data-head"}>
        {attributes}
    </tr> 
}
export default DataHeader