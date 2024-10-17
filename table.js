import React from 'react';

import {
	Table,
} from 'reactstrap';

import { IconButton } from './button';

import { format } from 'date-fns';

const CELL_FORMATS = {
	date: val => val ? format(val, 'P') : '',
	datetime: val => val ? format(val, 'Pp') : '',
	time: val => val ? format(val, 'p') : '',
}

export function TableRow({ model, session, navDetails }) {
	function cellValue(col) {
		const { render, attribute, type='string', value } = col;

		if (render) return render(session);

		const f = value || CELL_FORMATS[type];
		if (attribute) {
			var val = f ? f(session[attribute]) : session[attribute];
		} else {
			var val = 'n/a';
		}

		return val;
	}

	function renderActions() {
		if (!navDetails) return;

		return (
			<td className='text-right'>
			  <IconButton id="btn-details" className="btn-icon mr-1" size="sm" color="link" icon="fa fa-info"
			  		onClick={z => navDetails(session)}
			  		/>
		    </td> 
		)
	}

	return (
		<tr>
		  { model.map(col => <td key={col.id}>{cellValue(col)}</td>) }

		  { renderActions() }
		</tr>
	)
}

export function ItemsTable({ model=[], items=[], navDetails }) {
	return (
		<Table className="align-items-center table-flush" responsive>
		  <thead>
			<tr>
			{ model.map(col => <th key={col.id} className={col.className}>{col.label}</th>) }
			<th />
			</tr>
		  </thead>
		  <tbody>
		    { items.map(session => <TableRow key={session.id} model={model} session={session} navDetails={navDetails} />) }
		  </tbody>
	    </Table>
	)
}