/**
 * WIP: ported from other projects
 * 	- this might depend on theme specific styles
 */

import React from "react";

import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
} from "reactstrap";

// import { ButtonBar } from 'bh-dashboard/Actions';
// import { Card as LoadingCard  } from 'bh-dashboard/Loading';

// import { ButtonToolbar } from "./toolbar";

const DEFAULT_CARD_TITLE = "Card Title"

export function SimpleHeader({ title=DEFAULT_CARD_TITLE, subtitle }) {
	return (
		<CardHeader>
		  { subtitle && <h6 className="text-muted text-uppercase ls-1 mb-1">{subtitle}</h6> }
		  <h3 className="mb-0">{title}</h3>
	    </CardHeader>
	)
}

export function ControlsHeader({ title=DEFAULT_CARD_TITLE, subtitle, HeaderControls=z => <></> }) {
	return (
		<CardHeader className="d-flex justify-content-between">
		  <div>
		    { subtitle && <h6 className="text-muted text-uppercase ls-1 mb-1">{subtitle}</h6> }
		    <h4 className="m-0">{title}</h4>
		  </div>
		  <HeaderControls />
	    </CardHeader>
	)
}

export function ActionHeader({ title=DEFAULT_CARD_TITLE, subtitle, actions=[], actionVariant }) {
	return (
		<CardHeader className="d-flex justify-content-between align-items-start">
		<div>
		  { subtitle && <h6 className="text-muted text-uppercase mb-1">{subtitle}</h6> }
		  <h4 className="mt-0 mb-0">{title}</h4>
		</div>
		<div className="mb-0">
		  <ButtonToolbar actions={actions} variant={actionVariant} />
		</div>
	  </CardHeader>
	)
}

export function ViewNavHeader({ title=DEFAULT_CARD_TITLE, subtitle, views, activeView, onViewChanged }) {
	return (
		<CardHeader className="d-flex justify-content-between align-items-start">
		  <div>
		    { subtitle && <h6 className="text-muted text-uppercase ls-1 mb-1">{subtitle}</h6> }
		    <h3 className="mb-0">{title}</h3>
		  </div>
		
		  <ViewNav views={views} activeView={activeView} onViewChanged={onViewChanged} />
	  </CardHeader>
	)
}

export function SimpleCard({ title=DEFAULT_CARD_TITLE, subtitle, HeaderControls, children, ...props }) {
	return (
		<Card {...props}>
		  <ControlsHeader title={title} subtitle={subtitle} HeaderControls={HeaderControls} />

	      <CardBody>
			{ children }
		  </CardBody>
		</Card>
	)
}

export function ActionsCard({ title="Actions Card", children, actions=[], loading=false }) {
	if (loading)  return <LoadingCard title={title} />

	return (
		<Card>
		  <CardHeader className='pt-1 d-flex justify-content-between align-items-end'>
		    <CardTitle tag="h5">{ title }</CardTitle>
			<div className='d-flex'>
			  <ButtonBar actions={actions} />
			</div>
		  </CardHeader>
		  <CardBody>
		    { children }
		  </CardBody>
		  {/* <CardFooter>
		    <FooterAction />
		  </CardFooter> */}
	    </Card>
	)
}

/**
 * WIP: issue with re-rendering...
 * 
 * @param {*} param0 
 * @returns 
 */
export function ViewNavCard({ title=DEFAULT_CARD_TITLE, secondaryTitle, onViewChanged, ...props }) {
	const {
		loading,
		views,
		activeView,
		contentHeight
	} = props;

	const def = views.find(v => v.id === activeView);
	const ViewComponent = def ? def.Component : (props => <div>undefined view</div>);

	if (contentHeight) {
		var bodyStyle = {
			height: contentHeight,
			overflowY: "scroll"
		}
	}

	return (
		<Card {...props}>
		  <CardHeader className="border-0 d-flex justify-content-between">
		    <div>
			  <h6 className="text-muted text-uppercase ls-1 mb-1">{secondaryTitle}</h6>
			  <h3 className="mb-0">{title}</h3>
		    </div>
			
			<ViewNav views={views} activeView={activeView} onViewChanged={onViewChanged} />
		  </CardHeader>

		  <CardBody className="m-0 px-4 py-0" style={bodyStyle}>
			<ViewComponent />
		  </CardBody>

		  <CardFooter className='d-flex justify-content-between align-items-start'>
			<div>
			  { loading && <ViewLoading /> }
			</div>
		  </CardFooter>
		</Card>
	)
}

export function FormCard({ title="Form", secondaryTitle, complete, onSave, onCancel, children }) {
	return (
		<Card>
		  <CardHeader className="border-0">
		    <div className="col">
			  <h6 className="text-muted text-uppercase ls-1 mb-1">{secondaryTitle}</h6>
			  <h3 className="mb-0">{title}</h3>
		    </div>
		  </CardHeader>
	      <CardBody>
			{ children }
		  </CardBody>
		  <CardFooter className="d-flex justify-content-end">
			<IconButton icon="fas fa-hard-drive" label="Save" disabled={!complete} onClick={onSave} />
			<IconButton icon="fas fa-xmark" label="Cancel" color="danger" onClick={onCancel} />
		  </CardFooter>
		</Card>
	)
}

export function SearchCard({ title="Search", secondaryTitle, contentHeight, placeholder, onQueryChange, children }) {
	const [searchQuery, setSearchQuery] = React.useState('');

	function queryChanged(query) {
		setSearchQuery(query);

		onQueryChange(query);
	}

	if (contentHeight) {
		var bodyStyle = {
			height: contentHeight,
			overflowY: "scroll"
		}
	}

	return (
		<Card>
		  <CardHeader>
			{ secondaryTitle && <h6 className="text-muted text-uppercase ls-1 mb-1">{secondaryTitle}</h6> }
			<h3 className="mb-0">{title}</h3>
		  </CardHeader>
		  <div>
			<SearchField placeholder={placeholder} value={searchQuery} onChange={queryChanged} />
		  </div>
	      <CardBody className="p-0" style={bodyStyle}>
			{ children }
		  </CardBody>
		</Card>
	)
}
