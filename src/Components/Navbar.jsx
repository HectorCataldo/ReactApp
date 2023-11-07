import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserOutlined } from '@ant-design/icons';

function TextLinkExample() {
  return (
    <Navbar className="nav-bar">

        <Navbar.Collapse className="justify-content-between">
          <div className="d-flex flex-column align-items-start">
            <Navbar.Brand href="#home">
            {/* <img src="src\img\logo-kps.png"  width="30" height="30"  className="logo d-inline-block align-top"  alt="" /> */}
            <a className='Title'>Xplorer Insurance</a>
          </Navbar.Brand>
          </div>

          <button className='btn-admin-log'><UserOutlined className='admin-log' />Admin</button>
        </Navbar.Collapse>
        <Navbar.Toggle />

    </Navbar>
  );
}

export default TextLinkExample;
