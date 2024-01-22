import React           from "react";
import TextLinkExample from "../Navbar";
import Sidebar         from "../sidebar";
import PlumbingIcon    from '@mui/icons-material/Plumbing';
import '../Client/CSS/register-style.scss';

export const PANTALLA = (props) => {

  return (
    <>
    <TextLinkExample />
    <Sidebar></Sidebar>

    <h1 className="work"> WORK IN PROGRESS </h1>
    <h1 className="work">  <PlumbingIcon className="icon-work"></PlumbingIcon></h1>


  </>
  );
};