import React from 'react';

import {
	Button
} from 'reactstrap';

import classnames from 'classnames';

/**
 * WIP: improvements
 * 	- flag to set actionInFlight or not
 * 		- enable after action is one option
 * 	- need to make decision on invoke/trigger/onClick
 */
export function ButtonToolbar({ actions=[], variant="primary", showLabel=true, showIcon=true, buttonClasses }) {
	const [actionInFlight, setActionInFlight] = React.useState();

	React.useEffect(z => {
		setActionInFlight(false);
	}, [actions]);

	function doAction(e, a) {
		e.preventDefault();

		setActionInFlight(true);

		if (a.invoke) a.invoke();
	}

	// return (
	// 	<Button id={id} className="btn-icon" color={color} {...props}>
	// 	  <span className={classnames("btn-inner--icon", { 'mr-1': label })}>
	// 	    <i className={icon} />
	// 	  </span>
	// 	  { label && <span className="btn-inner--text">{label}</span> }
	//     </Button>

	// 	{ tooltip && <UncontrolledTooltip target={id} {...tooltipProps}>{ tooltip }</UncontrolledTooltip> }
	// )

	const classes = classnames(buttonClasses, {
		'px-2': true,
		'py-1': true,
		'm-1': true
	});

	return (
		<div>
		  {  actions.map(a => {
				const { id, label, icon, disabled } = a;

			    return <Button key={id} id={id} className={classes}
					color={variant}
				    disabled={disabled || actionInFlight}
					onClick={e => doAction(e, a)} {...a}>

				  <span className={classnames("btn-inner--icon", { 'mr-1': label })}>
					<i className={icon} />
				  </span>
				  { label && <span className="btn-inner--text">{label}</span> }
				</Button>
		  })}
		</div>
	)
}

export function AltToolbar({ actions }) {
	return <ButtonToolbar actions={actions} variant="link" buttonClasses="text-dark" />
}

export function IconToolbar({ actions }) {
	return <ButtonToolbar actions={actions} variant="link" buttonClasses="text-dark" />
}