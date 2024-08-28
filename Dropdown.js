import React from "react";

import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from "reactstrap";

import classnames from 'classnames';

function noop(e) {
	e.preventDefault();
}

export function Action({ label, icon, onClick=noop }) {
	return (
		<DropdownItem onClick={onClick}>
		  <i className={icon} />
		  <span>{label}</span>
	    </DropdownItem>
	)
}

export function ActionsDropdown({ color, actions=[], selected, defaultLabel="<select>", icon, onChange=noop }) {
	const selectedAction = actions.find(a => a.id === selected) || {};
	const { label=defaultLabel } = selectedAction;

	function doTrigger(action) {
		if (action.onTrigger) action.onTrigger();
	}

	const iconClasses = classnames({
		'mr-2': icon,
		[icon]: icon
	})

	return (
        <UncontrolledDropdown group>
          <DropdownToggle className="m-0" caret color={color}><i className={iconClasses} />{label}</DropdownToggle>
          <DropdownMenu>
			{ actions.map(a => {
				return (
					<DropdownItem key={a.id} onClick={z => doTrigger(a)}>
					  { a.label }
					</DropdownItem>
				)
			}) }
          </DropdownMenu>
        </UncontrolledDropdown>
	)
}

export function ItemDropdown({ items=[], labelProperty, selectedItem={}, color, onItemSelected }) {
	return (
		<UncontrolledDropdown className="btn-group">
		  <DropdownToggle
				aria-expanded={false}
				aria-haspopup={true}
				caret
				color={color}
				data-toggle="dropdown"
				type="button"
				className="text-uppercase font-weight-bold"
		  		>
			{selectedItem[labelProperty]}
		  </DropdownToggle>
		  <DropdownMenu>
			{
				items.map(item =>
					<DropdownItem key={item.id} onClick={z => onItemSelected(item)}>
					  {item[labelProperty]}
					</DropdownItem>
				)
			}
		  </DropdownMenu>
		</UncontrolledDropdown>
	);
}

export function NumberDropdown({ min=1, max=10, selected, color, onSelected }) {
	function renderItems() {
		const items = [];

		for (let i = min; i <= max; i++) {
			items.push(<DropdownItem key={i} onClick={z => onSelected(i)}>{i}</DropdownItem>)
		}

		return items;
	}

	return (
		<UncontrolledDropdown className="btn-group">
		  <DropdownToggle
				aria-expanded={false}
				aria-haspopup={true}
				caret
				color={color}
				data-toggle="dropdown"
				type="button"
				className="text-uppercase font-weight-bold"
		  		>
			{selected === undefined ? '<select>' : selected}
		  </DropdownToggle>
		  <DropdownMenu>{ renderItems() }</DropdownMenu>
		</UncontrolledDropdown>
	);
}
