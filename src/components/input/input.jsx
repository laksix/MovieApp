import React from "react";
import './input.css'
import {Input} from "antd";

const InputType = ({debouncedOnChange}) => {
    return (
        <div className="input">
        <Input placeholder="Type to search" onChange={debouncedOnChange}/>
        </div>
    )
}
export default InputType