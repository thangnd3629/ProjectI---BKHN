import React from "react"
import { Button } from "react-bootstrap";
import AxInstance from '../../axios'
const about = () =>{
    const clicked = () => {
        
        AxInstance.get('/').then(
            (response)=>{
                console.log(response)
            }
        )
    }
    return(
        <Button onClick={clicked}></Button>
    );
}
export default about;