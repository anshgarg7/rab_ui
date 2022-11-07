import React, { Component } from "react";
import {Container,Navbar,Nav,NavDropdown,Form,Button} from "react-bootstrap";
import '../assets/css/style.css'
import MuiAppBar from '@mui/material/AppBar';
import {Toolbar,IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import hotel_img from '../assets/images/hotel.png';
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));


const  NavBar = (props) =>{
 
    let {open} = props;
  

   
        return ( <AppBar position="fixed" open={open} sx={{ backgroundColor: "#202026" }} >
            <Toolbar >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={props.handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
             <header>
          <Navbar bg="" expand="lg">
              <Container fluid>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                  <Form className="d-flex search_input">
                      {/* <Form.Group controlId="formBasicPassword">
                          <Form.Control type="text" placeholder="Search here" />
                      </Form.Group> */}
                      {/* <Button onClick={()=>this.handleButton(true)} variant="primary" type="submit" className="custom_btn">
                          <i class="fa fa-search" aria-hidden="true"></i>
                      </Button> */}
                  </Form>
                  <Nav className="ms-auto">
                      <Nav.Link href="#link"><i class="fa fa-bell" aria-hidden="true"></i></Nav.Link>

                      <div className="user_profile ms-1">
                      <img src={`${process.env.PUBLIC_URL}/images/scaner.png`} alt="" height="130px" />
                          <p>Adevntures</p>
                          <NavDropdown title="" id="basic-nav-dropdown">
                              <img src="" alt="" />
                              <h5>Adevnture King</h5>
                              <p>shivhotel @gmail.com</p>
                              <p>1st Block, Rammurthy nagar,Bangalore, 6472</p>
                              <div className="text-center">
                                  <Button variant="secondary" className="custom_btn mt-3">Logout</Button>
                              </div>  
                          </NavDropdown>
                      </div>
                  </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
      </header>
      </Toolbar>
        </AppBar>)
    }



export default NavBar