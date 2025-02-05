import React from 'react';

import {
    FormGroup,
	FormText,
    Input,
    Label
} from 'reactstrap';

import classnames from "classnames";

/**
 * Additional props
 * 	- value
 * 	- placeholder
 * 	- disabled
 * 	- valid
 * 	- invalid
 * 	- on...
 */
export function TextField({ type="text", label, size, focusOnLoad, helpText, errorMessage, htmlSize, onChange, ...props }) {
	const controlRef = React.useRef();

	React.useEffect(z => {
		if (focusOnLoad) controlRef.current.focus();
	}, [focusOnLoad]);

	const classes = classnames("",
		{
			'form-control-lg': size === "lg",
			'form-control-sm': size === "sm",
		}
	);

	return (
		<FormGroup>
		  { label && <label className="form-control-label">{label}</label> }
		  <Input innerRef={controlRef} className={classes} type={type} size={htmlSize}
		  		onChange={e => onChange(e.target.value)}
		  		{...props}
				/>
		  { helpText && <FormText>{helpText}</FormText> }
		  <div className='m-2 text-danger invalid-feedback-doesnotwork'>{errorMessage}</div>
	    </FormGroup>
	)
}

export function CheckBox({ className, label, checked, onChange }) {
    function doChange(e) {
        if (onChange) onChange(e.target.checked);
    }

    return (
        <FormGroup check className={className}>
          <Label check>
            <Input type="checkbox" checked={checked} onChange={doChange} />
            <span className="form-check-sign" />
            { label }
          </Label>
        </FormGroup>
    )
}