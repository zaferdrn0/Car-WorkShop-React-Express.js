import React from 'react'

const Comment = (props) => {
    const {name,comment,date} = props
  return (
   
    <div className='comment-list-container'>
    <div className='comment-user'>
        <h3>{name}</h3>
        <h5>TARİH : {date}</h5>
    </div>
    <div>
        <p>{comment}</p>
    </div>
    <div className='comment-like'>
      
    </div>
    </div>
 
 
    
  )
}

export default Comment