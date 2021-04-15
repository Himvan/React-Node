import React, {useRef, useEffect} from 'react'
import _ from 'lodash'
import {Input, InputRadio} from './Input';

export default function Form(props) {
    const {headerName, data, submitButtonText} = props
    const refs = useRef([])
    console.log(data)

    useEffect(() => {
       props.handleRef(getValue)
    }, [])

    const renderFields = (items, index) => {
      switch (items.type) {
          case "text":
              return <Input {...items} ref={(el) => (refs.current[items.id] = el)}/> 
          case "radio":
              return <InputRadio {...items} ref={(el) => (refs.current[items.id] = el)}/>
          default:
              break;
      }
    }

    const getValue = () => {
        let formData = {};
        console.log(refs.current)
        for(let i=0; i<data.length;i++){
            let item = data[i]
            formData[item.id] = refs.current[item.id].state.value
        }
        return formData
      }
    


    return (
        <div>
        <form className="form" onSubmit={props.onSubmitHandler} >
            <div>
                <h1>{headerName}</h1>
            </div>
            {
                 _.map(data, (items, index) => {
                 return renderFields(items, index)
              })
            }
            <div>
                 <label />
                 <button className="primary" type="small">
                     {submitButtonText}
                 </button>
             </div>
        </form>
        </div>
    )
}
