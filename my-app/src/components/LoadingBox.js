import React from 'react'

export default function LoadingBox(props) {
    const {loading} = props
    if(loading){
     return (
        <div className="loading">
            <i class="fa fa-spinner fa-spin"></i> Loading ... 
        </div>
      )
    }
    return null
}
