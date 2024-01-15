import  React, { useState }              from 'react';
import { Link }                        from 'react-router-dom';
import  styled                                      from 'styled-components';
import { FaBars }                                   from "react-icons/fa";
import { MdOutlineClose}                            from "react-icons/md";
import { SidebarData }                              from './SidebarData';
import { SubMenu } from './SubMenu';


const Nav = styled.div`
  background      : #f0f0f0;
  width           : 255px;
  height          : 60px;
  display         : flex;
  justify-content : flex-start;
  align-items     : start;
  position        : fixed;
`;

const NavIcon = styled(Link)`
  margin-left       : 2rem;
  font-size         : 2rem;
  height            : 80px;
  display           : flex;
  justify-content   : flex-start;
  align-items       : center;
  position          : relative;
  bottom            : 10px;
  color             : #212529;
`;
const SidebarNav =  styled.nav`
  background        : #F0F0F0;
  width             : 255px;
  height            : 100vh;
  display           : flex; 
  justify-content   : center;
  position          : fixed;
  top               : 100;
  left              : ${({sidebar}) => (sidebar ? '0': '-100%')};
  transition        : 1s;
  z-index           : 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = ()=> setSidebar(!sidebar);

  return (
    <>
      <Nav>
        <NavIcon>
          <FaBars onClick={showSidebar}/>
        </NavIcon>
      </Nav> 
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon>
            < MdOutlineClose onClick={showSidebar}/>
          </NavIcon>
          {SidebarData.map((item,index) =>{
            return <SubMenu item = {item} key={index}/>
          })}
        </SidebarWrap>
      </SidebarNav>
        
    </>
  );
};

export default Sidebar;