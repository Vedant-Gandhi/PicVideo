import React from 'react';
import style from './SearchBar.module.css'

import PropTypes from 'prop-types'
function SearchBar(props)
{
    const {placeholder , onClick , onChange , value} = props

    const onClickReally=(e)=>{
        onClick?.(e)
    }
    const onChangeReally=(e)=>{
        onChange?.(e.target.value)
    }
return <div className={style.root}>
    <input type="text" className={style.textBar} placeholder={placeholder} onChange={onChangeReally} value={value} />
    <button className={style.button} onClick={onClickReally}>Search</button>
</div>
}

SearchBar.propTypes={
    placeholder:PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string,PropTypes.number,PropTypes.object])
}

export default SearchBar