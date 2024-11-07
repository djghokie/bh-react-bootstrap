import React from 'react';

import {
	FormGroup,
	FormText,
	Input,

	Row, Col
} from 'reactstrap'

import { NumberDropdown } from './Dropdown';

import { usePost } from 'bh-react/hooks/api';

import { format } from 'date-fns';
import classnames from "classnames";

const TIMEOUT_FEEDBACK = 3000;

// WIP: combine with bh-dashboard-now/components/table
const ATTRIBUTE_FORMATS = {
	date: val => val ? format(val, 'P') : '',
	datetime: val => val ? format(val, 'Pp') : '',
	time: val => val ? format(val, 'p') : '',
}

export function StringAttribute({ item, attribute, doUpdate, type="text", label, size, focusOnLoad, helpText, htmlSize, ...props }) {
	const [value, setValue] = React.useState('');
	const [edited, setEdited] = React.useState(false);
	const [updating, setUpdating] = React.useState(false);
	const [success, setSuccess] = React.useState(false);

	const controlRef = React.useRef();

	React.useEffect(z => {
		setValue(item[attribute]);
	}, [item, attribute]);

	React.useEffect(z => {
		if (focusOnLoad) controlRef.current.focus();
	}, [focusOnLoad]);

	React.useEffect(z => {
		if (success) {
			const i = setTimeout(z => setSuccess(false), TIMEOUT_FEEDBACK);

			return z => clearTimeout(i);
		}
	}, [success]);

	function change(e) {
		setValue(e.target.value);
		setEdited(true);
	}

	function update(e) {
		if (edited && doUpdate) {
			setUpdating(true);

			doUpdate(attribute, e.target.value)
				.then(z => {
					setEdited(false);
					setSuccess(true);
				})
			;
		}
	}

	const classes = classnames("",
		{
			'form-control-lg': size === "lg",
			'form-control-sm': size === "sm",
		}
	);

	return (
		<FormGroup>
		  { label && <label className="form-control-label">{label}</label> }
		  <Row className='m-0 p-0'>
			<Col md={11}>
		      <Input innerRef={controlRef} className={classes} type={type} size={htmlSize}
			  	  value={value}
				  onChange={change}
				  onBlur={update}
		  		  {...props}
				/>
			</Col>
			<Col className="p-0 d-flex align-items-center" md={1}>
		      { success && <i className='fas fa-check text-primary' /> }
			</Col>
		  </Row>
		  <FormText>{helpText}</FormText>
	    </FormGroup>
	)
}

export function NumberDropdownAttribute({ min, max, item, attribute, doUpdate, label, helpText }) {
	const [value, setValue] = React.useState(min);
	const [updating, setUpdating] = React.useState(false);
	const [success, setSuccess] = React.useState(false);

	React.useEffect(z => {
		setValue(item[attribute]);
	}, [item, attribute]);

	React.useEffect(z => {
		if (success) {
			const i = setTimeout(z => setSuccess(false), TIMEOUT_FEEDBACK);

			return z => clearTimeout(i);
		}
	}, [success]);

	function update(val) {
		setUpdating(true);

		doUpdate(attribute, val)
			.then(z => {
				setSuccess(true);
			})
			;
	}

	return (
		<FormGroup>
			{ label && <label className="form-control-label">{label}</label> }
			<Row className='m-0 p-0'>
			  <Col md={11}>
			    <NumberDropdown min={min} max={max} color="primary" selected={value} onSelected={update} />
			  </Col>
			  <Col className="p-0 d-flex align-items-center" md={1}>
				{ success && <i className='fas fa-check text-primary' /> }
			  </Col>
			</Row>
			<FormText>{helpText}</FormText>
		</FormGroup>
	)
}

/**
 * NOTE: realm and action attributes are deprecated in favor of updateEndpoint
 * 
 * @param {*} param0 
 * @returns 
 */
export function AttributeFields({ className, item={}, attributes=[], updateEndpoint="/foo", onItemUpdated }) {
	const [callUpdate] = usePost(updateEndpoint);

	function update(attribute, value) {
		const params = {
			id: item.id,
			attribute,
			value
		}

		const _update = callUpdate(params);

		return _update
			.catch(e => {
				console.debug('######', 'handle update errors')

				return {};
			})
			.then(onItemUpdated)
			;
	}

	function renderAttribute(attribute) {
		const { name, type, control, label, disabled } = attribute;

		const props = {
			key: name,
			label,
			item,
			attribute: name,
			disabled,
			doUpdate: update
		};

		if (type === 'number') {
			if (control === 'dropdown') {
				const { validation={} } = attribute;
				const { min, max } = validation;

				return <NumberDropdownAttribute min={min} max={max} {...props} />
			}
		}

		return (
			<StringAttribute {...props} />
		)
	}

	return (
		<div className={className}>
		  { attributes.map(renderAttribute) }
		</div>
	)
}

export function ReadOnlyAttributes({ className, item={}, attributes=[] }) {
	function renderAttribute(attribute) {
		const { name, label, type, format, unspecified } = attribute;

		const f = type ? ATTRIBUTE_FORMATS[type] : format;

		const value = f ? f(item[name], item) : item[name];

		return (
			<React.Fragment key={name}>
			  <dt>{label || name}</dt>
			  <dd className='ml-2'>{value || unspecified}</dd>
			</React.Fragment>
		)
	}

	return (
		<dl className={className}>
		  { attributes.map(renderAttribute) }
		</dl>
	)
}