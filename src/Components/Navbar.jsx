import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function TextLinkExample() {
  return (
    <Navbar className="nav-bar">
      <Container>
        <Navbar.Brand href="#home">
        { <img
              src="https://media.licdn.com/dms/image/D4E16AQHgAeVU6eftxQ/profile-displaybackgroundimage-shrink_200_800/0/1667424920841?e=2147483647&v=beta&t=TeMb0NsfjdHM3ined015pwS0O8ABSB5WPHSmVd97hS0"
              width="30"
              height="30"
              className="logo d-inline-block align-top"
              alt="React Bootstrap logo"

            /> }
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Created by: <a className='link'   href="https://kopernicus.tech/">KPS</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;