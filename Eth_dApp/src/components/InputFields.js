import React from "react"

const InputFields = (props) => {
    return (
        props.poi.map((val, idx)=>{
            let typeId = `idType-${idx}`, valId = `idVal-${idx}`
            return (
              <div key = {idx}>
                <input 
                  name={typeId} 
                  type="text"
                  data-id={idx}
                  id={typeId}
                  className="type" 
                  placeholder="Field Name"  
                />
                
                <input 
                  name={valId} 
                  type="text"
                  data-id={idx}
                  id={valId}
                  className="value" 
                  placeholder="Field Value"
                />
              </div>
            )
          })
    )
}

export default InputFields;