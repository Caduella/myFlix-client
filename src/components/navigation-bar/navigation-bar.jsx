import Container from "react-bootstrap/Container";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const NavigationBar = ({ user, onLoggedOut, movies, search, setSearch}) => {

  return (
    <Navbar bg="secondary" expand="lg" fixed="top" className="mb-5">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My Quick Movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end d-flex flex-grow-1">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                <Form className="d-flex navbar-style">
                  <Form.Control
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />               
                </Form>
              </>            
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};