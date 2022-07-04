import React from 'react'
import { Button, Box } from 'grommet'
import Icon from './Icon'


const buttonSize = {
  default: 15,
  small: 13,
  large: 18
}
export default function Buttons ({
  children,
  type = ('default' || 'primary' || 'danger'),
  size = ('default' || 'small' || 'large'),
  style = {},
  disabled = false,
  loading = false,
  className = null,
  icon = null,
  onClick = function () {},
  ...props
}) {
 return (
  <Button
    className={`btn-afx tp-${(type || 'default')} sz-${(size || 'default')} ${loading ? 'disabled' : null} ${className}`}
    onClick={onClick}
    style={style}
    disabled={disabled || loading}
  >
    {
      !!icon || !!loading ? (
        <span style={{ paddingRight: 5 }}>
          <Icon color="darkcyan" size={buttonSize[size] + 'px'} className={loading ? 'btn-icon-spin' : null} type={loading ? 'Nodes' : icon} />
        </span>
      ) : null
    }
    <span>{children}</span>
  </Button>
 ) 
}