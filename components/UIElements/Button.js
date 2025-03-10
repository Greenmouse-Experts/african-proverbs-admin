import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  return (
    <button 
    type="button" onClick={props.onClick} class={`btn ${props.btnType} btn-rounded width-md waves-effect`}>
        {props.text}
    </button>
  )
}


export default Button