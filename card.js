/**
 * WIP: ported from other projects
 * 	- this might depend on theme specific styles
 */

import React from "react";

import PropTypes from "prop-types";

import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle
} from "reactstrap";

import { View as ViewLoading } from './loading';
import { ViewNav } from "./nav";
import { IconToolbar } from "./toolbar";

const DEFAULT_CARD_TITLE = "Card Title"

export function SimpleHeader({ title=DEFAULT_CARD_TITLE, subtitle }) {
	return (
		<CardHeader>
		  { subtitle && <h6 className="text-muted text-uppercase ls-1 mb-1">{subtitle}</h6> }
		  <h3 className="mb-0">{title}</h3>
	    </CardHeader>
	)
}

export function ActionHeader({ title=DEFAULT_CARD_TITLE, subtitle, actions=[], actionVariant }) {
	return (
		<CardHeader className="d-flex justify-content-between align-items-start">
		<div>
		  { subtitle && <h6 className="small text-uppercase mb-1">{subtitle}</h6> }
		  <h4 className="mt-0 mb-0">{title}</h4>
		</div>
		<div className="mb-0">
		  {/* <ButtonToolbar actions={actions} variant={actionVariant} /> */}
		  <IconToolbar actions={actions} />
		</div>
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

export function ActionsCard({ className, title="Actions Card", subtitle, children, actions=[], loading=false }) {
	if (loading)  return <LoadingCard title={title} />

	return (
		<Card className={className}>
		  <ActionHeader title={title} subtitle={subtitle} actions={actions} />
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

export function ItemsCard(props) {
	const {
		title="Items",
		titleTag="h4",
		secondaryTitle,
		className,
		contentHeight,
		loading,
		items=[],
		navDetails,
		actions,
		views=[],
		activeView,
		viewsComponent="tabs",
		onViewChanged,
		noItemsMessage="No items to display",
		message,
		previous,
		next,
		ItemsComponent = z => <div className="text-center">ItemsComponent not configured</div>
	} = props;

	const hasItems = items.length > 0;

	if (contentHeight) {
		var bodyStyle = {
			height: contentHeight,
			overflowY: "scroll"
		}
	}

	function renderViewControls() {
		if (viewsComponent === 'dropdown')
			return (
				<ActionsDropdown color="primary" actions={views} selected={activeView}
					onChange={i => onViewChanged(i.id)}
					/>
			)

		return <ViewNav views={views} activeView={activeView} onViewChanged={onViewChanged} />
	}

	return (
		<Card className={className}>
		  <CardHeader className="border-0 d-flex justify-content-between">
		    <div>
			  <h6 className="text-muted text-uppercase ls-1 mb-1">{secondaryTitle}</h6>
			  <CardTitle tag={titleTag}>{title}</CardTitle>
		    </div>
		  
		    <div className="d-flex align-items-center">
			  { renderViewControls() }
			  <IconToolbar actions={actions} />
			</div>
		  </CardHeader>

		  <div style={bodyStyle}>
		    { !loading && !hasItems && <div className="my-5 text-center"><i>{noItemsMessage}</i></div> }
		  
		    { hasItems && <ItemsComponent items={items} navDetails={navDetails} /> }
		  </div>
		  
		  <CardFooter className='d-flex justify-content-between align-items-start'>
			<div>
			  { loading && <ViewLoading /> }
			</div>

			<div>
			  { message && <IconAlert color="warning" icon="fas fa-exclamation" text={message} /> }
			</div>

			<div className='d-flex justify-content-end'>
			  <div>
			    { previous && <PreviousPage className="mx-1" disabled={!hasItems} onClick={previous} /> }
			    { next && <NextPage className="mx-1" disabled={!hasItems} onClick={next} /> }
			  </div>
			</div>
		  </CardFooter>
		</Card>
	)
}

ItemsCard.propTypes = {
	title: PropTypes.string,  // card title
	secondaryTitle: PropTypes.string,  // card secondary title
	className: PropTypes.string,  // classes to apply to Card
	loading: PropTypes.bool,  // whether or not item data is being loading from an external source
	items: PropTypes.arrayOf(PropTypes.object),  // items to display
	navDetails: PropTypes.func,  // function to navigate to item details
	// views=[],
	// activeView,
	// onViewChanged,
	noItemsMessage: PropTypes.string,  // message to display if no items are available
	message: PropTypes.string,  // message to display in footer (errors, no items in page, etc)
	previous: PropTypes.func,  // if provided, previous button displayed and function will be called onClick
	next: PropTypes.func,  // if provided, next button displayed and function will be called onClick
	ItemsComponent:  PropTypes.elementType  // React component to render items
};
