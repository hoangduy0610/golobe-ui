import React, { useState } from "react";
import { Input } from "antd";

import "./FloatInput.scss";
import { LiteralUnion } from "rc-input/lib/utils/types";

const FloatInput = (props: {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    label?: string;
    value?: any;
    placeholder?: string;
    type?: LiteralUnion<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week', string>;
    required?: boolean;
    name?: string;
    style?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
}) => {
    const [focus, setFocus] = useState(false);
    let { label, value, placeholder, type, required, name, style, inputStyle } = props;

    if (!placeholder) placeholder = label;

    const isOccupied = focus || (value && value.length !== 0);

    const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

    const requiredMark = required ? <span className="text-danger">*</span> : null;

    return (
        <div
            className="golobe-float-label"
            style={style}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
        >
            {type === 'password'
                ? <Input.Password onChange={props.onChange} defaultValue={value} name={name} style={inputStyle} />
                : <Input onChange={props.onChange} type={type} defaultValue={value} name={name} style={inputStyle} />
            }
            <label className={labelClass}>
                {isOccupied ? label : placeholder} {requiredMark}
            </label>
        </div>
    );
};

export default FloatInput;