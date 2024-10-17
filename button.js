import React from 'react';

import Image from "next/image";

import {
	Button,
	ButtonGroup,
	UncontrolledTooltip
} from "reactstrap";

import classnames from "classnames";

export function LabeledButton({ id, label, color="primary", tooltip, tooltipProps, ...props }) {
	return (
		<>
		<Button id={id} color={color} {...props}>
		  <span className="btn-inner--text">{label}</span>
	    </Button>

		{ tooltip && <UncontrolledTooltip target={id} {...tooltipProps}>{ tooltip }</UncontrolledTooltip> }
		</>
	)
}

export function ImageButton({ label, src, alt, color="default", ...props }) {
	return (
		<Button className="btn-neutral btn-icon" color={color} {...props}>
		  <span className="btn-inner--icon mr-1">
		    <Image src={src} alt={alt} width={16} height={16} />
		  </span>
		  <span className="btn-inner--text">{label}</span>
	  </Button>
	)
}

/**
 * WIP: i don't think this renders buttons with icons correctly
 */
export function IconButton({ id, label, icon, color="primary", tooltip, tooltipProps, ...props }) {
	return (
		<>
		<Button id={id} className={!label && 'btn-icon'} color={color} {...props}>
		  <span className={classnames("btn-inner--icon", { 'mr-2': label })}>
		    <i className={icon} />
		  </span>
		  { label && <span className="">{label}</span> }
	    </Button>

		{ tooltip && <UncontrolledTooltip target={id} {...tooltipProps}>{ tooltip }</UncontrolledTooltip> }
		</>
	)
}

/*
export function IconButton({ id, label, tooltip, white, icon, ...props }) {
	const buttonClass = `mx-1 ${ white && 'text-white' }`

	return (
		<>
		<Button id={id} className={buttonClass} { ...props }>
		  <i className={icon}></i>
		  { label && <span className='pl-2'>{ label }</span> }
	    </Button>
		<UncontrolledTooltip placement="top" target={id}>
		  { tooltip }
		</UncontrolledTooltip>
		</>
	)
}
*/


export function LinkButton({ id, label, icon, color="secondary", white, tooltip, tooltipProps, ...props }) {
	const classes = classnames("", {
		"text-white": white,
		"text-dark": !white,

		[icon]: true
	});

	return (
		<>
		<Button id={id} color="link" {...props}>
		  <a>
		    <i className={classes} />
		  </a>
	    </Button>
		{ tooltip && <UncontrolledTooltip target={id} {...tooltipProps}>{ tooltip }</UncontrolledTooltip> }
		</>
	)
}

export function ToggleButton({ className, label, color="secondary", checked, ...props }) {
	return (
		<Button className={classnames(className, { active: checked })} color={color} {...props}>
		  {label}
	    </Button>
	)
}

/**
 * Button toolbar maintaining 0 or more selections
 * 
 * WIP: copied from RadioButtons and not yet implemented
 */
export function ToggleButtonBar({ items=[], color="primary", vertical=false, gap=1, onChange }) {
	const [selected, setSelected] = React.useState();

	function selectButton(button) {
		setSelected(button.id);

		if (onChange) onChange(button.value);
	}

  	return (
    	<div>
      	  <ButtonGroup vertical={vertical}>
			{ items.map(b => {
				const classes = classnames("", {
					[`mx-${gap}`]: true
				})
				return (
					<Button key={b.id} className={classes} color={color}
					    outline={selected !== b.id}
						disabled={true}
						onClick={z => selectButton(b)}>
				      {b.label}
			        </Button>
			    )
		    }) }
          </ButtonGroup>
        </div>
    );
}

export function RadioButtons({ items=[], color="primary", vertical=false, gap=1, onChange }) {
	const [selected, setSelected] = React.useState();

	function selectButton(button) {
		setSelected(button.id);

		if (onChange) onChange(button.value);
	}

  	return (
    	<div>
      	  <ButtonGroup vertical={vertical}>
			{ items.map(b => {
				const classes = classnames("", {
					[`mx-${gap}`]: true
				})
				return (
					<Button key={b.id} className={classes} color={color}
					    outline={selected !== b.id}
						onClick={z => selectButton(b)}>
				      {b.label}
			        </Button>
			    )
		    }) }
          </ButtonGroup>
        </div>
    );
}
