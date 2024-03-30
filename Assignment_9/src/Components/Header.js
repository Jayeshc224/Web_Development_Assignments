import { Navbar, Nav, Container } from "react-bootstrap"
import { Outlet } from "react-router-dom";

function Header(){
return(
  <>
<Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">GetHired</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/listings">Job Listings</Nav.Link>
            <Nav.Link href="/comp_showcase">Company Showcase</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
      </Container>
    </Navbar> 
    <Outlet/>
    </>

)
}

export default Header;