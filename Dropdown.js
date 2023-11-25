import React from "react";

import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from "reactstrap";

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

export function ActionsDropdown({ color, actions=[], selected, defaultLabel="<select>", onChange=noop }) {
	const selectedAction = actions.find(a => a.id === selected) || {};
	const { label=defaultLabel } = selectedAction;

	return (
        <UncontrolledDropdown>
          <DropdownToggle className="m-0" caret color={color}>{label}</DropdownToggle>
          <DropdownMenu>
			{ actions.map(a => {
				return (
					<DropdownItem key={a.id} onClick={z => onChange(a)}>
					  { a.label }
					</DropdownItem>
				)
			}) }
          </DropdownMenu>
        </UncontrolledDropdown>
	)
}
