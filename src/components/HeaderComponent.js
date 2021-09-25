import React, { Component } from "react";
import {Nav,Navbar,NavbarBrand,NavbarToggler,Collapse,NavItem,} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
    };
  }
  toggleNav(){
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="bg-secondary mb-4" expand="md">
          <div className="container">
            <NavbarToggler onClick={() =>this.toggleNav()} className="fa fa-bars" />
            <NavbarBrand className="mr-auto nav-brand" href="/">
              <img src="/assets/images/logo.jfif" height="30" width="41" alt="logo" />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link text-white" to="/" style={{color : "black"}}>
                    <span className="fa fa-users p-2 "></span> Nhân viên
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link text-white" to="/departments" style={{color : "black"}}>  
                  <span className="fa fa-address-card p-2 " ></span> Phòng Ban
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link text-white" to="/salary" style={{color : "black"}}>
                    <span className="fa fa-cc-mastercard p-2 "></span> Bảng lương
                  </NavLink>
                  
                </NavItem>
              </Nav>
            </Collapse>
          </div> 
        </Navbar>
      </div>
    );
  }
}

export default Header;
