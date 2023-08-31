import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function TextLinkExample() {
  return (
    <Navbar className="bg-body-tertiary" bg='dark' data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Kopernicus Tech
        {/* <img
              src=""
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            /> */}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Created by: <a href="#login">KPS</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;