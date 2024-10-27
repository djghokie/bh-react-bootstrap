import React from 'react';

import {
    FormGroup,
	FormText,
    Input,
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