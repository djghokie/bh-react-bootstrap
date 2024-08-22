import React from 'react';

import {
	ListGroup,
	ListGroupItem
} from 'reactstrap';

export function ContentListItem({ item, isSelected, nav, onSelect, children, ...props }) {
	function selectItem(e) {
		e.preventDefault();

		if (onSelect) onSelect(item);
	}

	return (
		<ListGroupItem action={nav !== undefined} active={isSelected} onClick={selectItem} {...props}>
		  { children || JSON.stringify(item, null, 2) }
	    </ListGroupItem>
	)
}

function DefaultListItem({ item, nav }) {
	function onNav(e) {
		e.preventDefault();

		nav(item);
	}

	return (
		<ListGroupItem className='d-flex justify-content-between' action={nav !== undefined} onClick={onNav}>
		  <div>{ item.id }</div>
		  <div className='text-uppercase small text-muted'>{ item.type }</div>
	    </ListGroupItem>
	)
}

export function ItemList({
		items=[],
		ItemComponent=DefaultListItem,
		nav,
		height,
		noItemsMessage="no items found",
		itemProps={},
		initialSelection,
		onSelectionChanged
	}) {

	const [selected, setSelected] = React.useState(initialSelection);

	const listStyle = {
		height,
		overflowY: 'scroll'
	}

	if (items.length === 0)
		return (
		    <div className='mt-4 d-flex justify-content-center' style={listStyle}>
		      <i>{noItemsMessage}</i>
		    </div>
	   )

	function onItemSelect(item) {
		if (onSelectionChanged) {
			setSelected(item.id);

			onSelectionChanged(item);
		}

		if (nav) nav(item);
	}

	return (
		<ListGroup flush style={listStyle}>
		  { items.map(item => <ItemComponent key={item.id} nav={nav} onSelect={onItemSelect} item={item} isSelected={item.id === selected} {...itemProps} />) }
		</ListGroup>
	)
}
