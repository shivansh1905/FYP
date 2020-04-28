import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const InputFields = (props) => {
    return (
        props.poi.map((val, idx)=>{
            let typeId = `idType-${idx}`, valId = `idVal-${idx}`, purpose = `Field ${idx + 1}`
            return (
                <div key = {idx} id = "fieldRow">
                    <h4>{purpose}</h4>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control 
                                name={typeId} 
                                type="text"
                                data-id={idx}
                                id={typeId}
                                className="type" 
                                placeholder="Field Name"  
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Control 
                                name={valId} 
                                type="text"
                                data-id={idx}
                                id={valId}
                                className="value" 
                                placeholder="Field Value"  
                            />
                        </Form.Group>
                    </Form.Row>
                </div>
            )
        })
    )
}

export default InputFields;