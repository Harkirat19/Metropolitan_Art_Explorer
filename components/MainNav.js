import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState("");
    const [isExpanded, setExpand] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    function expand() {
      setExpand(!isExpanded);
    }

    function toggleExpand() {
      setExpand(false);
    }

    function submitForm(e) {
        e.preventDefault();
        if (!searchField){
          return null;
        }
        let queryString ="";
        queryString += `title=true&q=${searchField}`;
        setSearchHistory(current => [...current, queryString]);
        toggleExpand();
        router.push(`/artwork?${queryString}`);
    }

    function changeForm(e) {
        setSearchField(e.target.value);
    }

  return (
    <Navbar expanded={isExpanded} expand="lg" className="navbar-dark bg-primary">
      <Container>
        <Navbar.Brand>Harkirat Singh</Navbar.Brand>
        <Navbar.Toggle onClick={expand} aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={toggleExpand}>Home</Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
                <Nav.Link active onClick={toggleExpand}>Advanced Search</Nav.Link>
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={submitForm} >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField}
              onChange={changeForm}
            />
            <Button type="submit" variant="btn btn-success">Search</Button>
          </Form>
          <Nav>
            <NavDropdown title="User Name" id="navbarScrollingDropdown">
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item onClick={toggleExpand}>
                  Favourites
                </NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item active onClick={toggleExpand}>
                  Search History
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
          <br />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}