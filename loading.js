import {
	Card as BootstrapCard,
	CardBody,
    CardHeader,
	Container,
	Spinner
} from "reactstrap"

export function Widget() {
	return (
		<Spinner color="primary">
			{/* Loading... */}
	  	</Spinner>
	)
}

export function Card({ title="Loading" }) {
	return (
		<BootstrapCard>
		  <CardHeader>
		    <h3 className="mb-0">{title}</h3>
		  </CardHeader>
		<CardBody>
		  <Container className="p-5 d-flex justify-content-center align-items-center" fluid>
		    <Widget />
	  	  </Container>
		</CardBody>
		{/* <CardFooter>
		  <Button className="btn-fill" color="primary" type="submit">
			Submit
		  </Button>
		</CardFooter> */}
	  </BootstrapCard>
	)
}

export function View() {
	return (
		<Container className="flex-grow-1 d-flex justify-content-center align-items-center" fluid>
		  <Widget />
	  	</Container>
	)
}

export function Page() {
	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }} fluid>
		  <Widget />
	  	</Container>
	)
}
