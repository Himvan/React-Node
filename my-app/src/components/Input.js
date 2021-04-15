import React, { Component } from 'react'
import _ from 'lodash'

export class Input extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: "",
        }
    }

    componentDidMount(){
        const {initialValue} = this.props
        console.log(initialValue)
        if(initialValue) this.setState({value: initialValue})
    }

    componentDidUpdate(prevProps, prevState) {
        const {initialValue} = this.props
        console.log(prevProps, prevState)
        !prevProps.initialValue && initialValue && this.setState({value: initialValue})
      }

    render() {
        const {id, placeholder, require, headerName, ref} = this.props
        return (
            <div>
                  <label htmlFor={id}>{headerName}</label>
                  <input type="text" id={id} placeholder={placeholder} required={require} value={this.state.value} onChange={e => this.setState({value: e.target.value})} ref={ref}>

                  </input> 
            </div>
        )
    }
}

export class InputRadio extends Component {
    constructor(props) {
        super(props)
        this.state = {
          value: "PayPal",
        }
    }
    
    render() {
        const {data, type, ref} = this.props
        return (
            <div>
              { _.map(data, (items) => (
                <div>
                   <input type={type} id={items.id} checked={this.state.value === items.headerName} value={items.headerName}  name={"paymentMethod"} required={require}  onChange={e => {
                       this.setState({value: e.target.value})
                   }} ref={ref}/>
                   <label htmlFor={items.id}>{items.headerName}</label>
                 </div>
              ))

              }
            </div>
        )
    }
}
