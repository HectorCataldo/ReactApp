import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
    display           : flex;
    color             : #212529;
    justify-content   : space-between;
    align-items       : center;
    padding           : 20px;
    list-style        : none;
    height            : 60px;
    text-decoration   : none;
    font-size         : 18px;
    border-top        : #a8a8a8 1px solid;

    &:hover{
      background      : #00304e;
      color           : #F0F0F0;
      border-left     : 4px solid #632ce4;
      cursor          : pointer;
    }
`;

const SiderbarLabel = styled.span`
  margin-left         : 10px;
`;

const DropdownLink = styled(Link)`
  background          : #ffffff;
  height              : 60px;
  padding-left        : 3rem;
  display             : flex;
  align-items         : center;
  text-decoration     : none;
  color               : #212529;
  font-size           : 18px;
  
  &:hover{
    background        : #0166a5;
    color             : #F0F0F0;
    border-left       : 4px solid #632ce4;
    cursor            : pointer;
  }
  `;

export const SubMenu = ({item}) => {
// const [subnav, setSubnav] = useState(false);
//Nuevo1
const initialSubnavState = JSON.parse(window.localStorage.getItem(`subnav-${item.title}`)) || false;

const [subnav, setSubnav] = useState(initialSubnavState);

useEffect(() => {
  // Guardar el estado actual de subnav en el localStorage
  window.localStorage.setItem(`subnav-${item.title}`, JSON.stringify(subnav));
}, [subnav, item.title]);


const showSubnav = () => {
  setSubnav(!subnav);
  // console.log(subnav);
}
  return (
    <>
    <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
      <div>
        {item.icon}
        <SiderbarLabel>{item.title}</SiderbarLabel>
      </div>
      <div>
        {item.subNav && subnav 
          ? item.iconOpened
          : item.subNav
          ? item.iconClosed 
          : null
          }
      </div>      
    </SidebarLink>
    {subnav && item.subNav.map((item, index)=>{
      return(
        <DropdownLink to={item.path} key={index}>
          {item.icon}
          <SiderbarLabel>
            {item.title}
          </SiderbarLabel>
        </DropdownLink>
      )
    })}
    </>
)
}