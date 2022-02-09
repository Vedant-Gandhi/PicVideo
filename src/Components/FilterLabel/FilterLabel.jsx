import React from 'react';
import style from './FilterLabel.module.css'

import PropTypes from 'prop-types'
function FilterLabel({selected,text,key_,onClick})
{
    const filterOnClick=(e)=>{
        e.preventDefault()
        if(typeof onClick === 'function') onClick(e,key_)
    }
return <div className={`${style.root} ${selected && style.selected}`} onClick={filterOnClick}>{text || "Label"}</div>
}

FilterLabel.propTypes = {
        selected:PropTypes.bool,
        text:PropTypes.string,
        key_: PropTypes.any,
        onClick:PropTypes.func
}

export default FilterLabel;