import React from "react";

import Link from 'next/link'

import {
	Nav,
	NavItem,
	NavLink,
	Pagination,
	PaginationItem,
	PaginationLink,
} from "reactstrap";

import classnames from "classnames";

export function InternalLink({ label, href }) {
	return (
		<NavItem>
		  <Link href={href} passHref>
		    <NavLink href={href}>
		      { label }
		    </NavLink>
		  </Link>
	    </NavItem>
	)
}

export function ExternalLink({ label, href }) {
	return (
		<NavItem>
		  <NavLink href={href} target="_blank">
		    { label }
		  </NavLink>
	    </NavItem>
	)
}

export function NavButton({ icon, onClick }) {
	function doClick(e) {
		e.preventDefault();

		if (onClick) return onClick();
	}

	return (
		<NavItem className="">
		  <NavLink onClick={doClick}>
		    <i className={icon} />
		  </NavLink>
	    </NavItem>
	)
}

export function ViewToggle({ label, shortLabel, active, onClick }) {
	const classes = classnames("py-2 px-3", { active });

	return (
		<NavItem className="mr-2 mr-md-0">
		  <NavLink className={classes} href="#" onClick={onClick}>
		    <span className="d-none d-md-block">{label}</span>
		    <span className="d-md-none">{shortLabel}</span>
		  </NavLink>
	    </NavItem>
	)
}

export function ViewNav({ views=[], activeView, onViewChanged }) {
	function changeView(e, view) {
    	e.preventDefault();

		if (onViewChanged) onViewChanged(view)
  	}

	return (
		<Nav className="justify-content-end" pills>
		  { views.map(view => <ViewToggle key={view.id} active={activeView === view.id} onClick={e => changeView(e, view.id)} {...view} /> )}
	    </Nav>
	)
}

export function PageNavigation({ pages=[] }) {
	const [activePage, setActivePage] = React.useState(-1);

	React.useEffect(z => {
		if (pages.length > 0) setActivePage(0);
	}, [pages]);

	function backPage() {
		setActivePage(activePage - 1);
	}

	function forwardPage() {
		setActivePage(activePage + 1);
	}

	return (
	  <nav aria-label="...">
		<Pagination className="mb-0 pagination justify-content-end" listClassName=" mb-0 justify-content-end">
		  <PaginationItem className={activePage > 0 ? "" : "disabled"}>
			<PaginationLink tabIndex="-1" onClick={backPage}>
			  <i className="fas fa-angle-left" />
			  <span className="sr-only">Previous</span>
			</PaginationLink>
		  </PaginationItem>
		  { pages.map((page, index) => {
			  return (
				  <PaginationItem key={`page-${index}`} className={index === activePage ? "active" : ''}>
					<PaginationLink onClick={e => setActivePage(index)}>{index+1}</PaginationLink>
				  </PaginationItem>
			  )
		  })}
		  <PaginationItem className={activePage === pages.length - 1 ? "disabled" : ''}>
			<PaginationLink onClick={forwardPage}>
			  <i className="fas fa-angle-right" />
			  <span className="sr-only">Next</span>
			</PaginationLink>
		  </PaginationItem>
		</Pagination>
	  </nav>
	)
}