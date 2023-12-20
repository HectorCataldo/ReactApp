import React, { useState, useEffect, useMemo } from "react";
import TextLinkExample from "./Navbar";
import Sidebar from "./sidebar";
import '../CSS/register-style.scss';
import PlumbingIcon from '@mui/icons-material/Plumbing';

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