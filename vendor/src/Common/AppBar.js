import React, { useEffect, useState } from "react";
import { Toolbar, IconButton } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import auth from "../services/auth"
import SweetAlert from 'react-bootstrap-sweetalert';
import http from "../Helper/http";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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


const AppBar1 = (props) => {
  const [user, setUser] = useState({})
  const [warning, setWarning] = useState(false)
  const [profile, setProfile] = useState({})
  const [loder,setLoder] = useState(false)
  useEffect(() => {
    setLoder(true)
    http.getList(`v1/vendor/get_profile`)
      .then(result => {
        if (result.status == 200) {
          setProfile(result.data)
          setLoder(false)
          // setErrMessage(result.message)
        } else {
          setLoder(false)
          // setErrMessage(result.message)
        }
      })
      .catch(error => {
        setLoder(false)
        console.log(error)
      });
    setUser(auth.getUser())
  }, []);

  const handleLogout = () => {
    auth.logout()
    window.location.reload("/login")
  }


  let { open } = props;
  console.log(profile)
  return (<>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loder}
    // open="true"
    // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    {warning ? <SweetAlert
      warning
      showCancel
      // style={{ backgroundColor: 'black', color: 'white' }}
      confirmBtnText="OK"
      confirmBtnBsStyle="danger"
      title="Are You Sure !"
      onConfirm={() => handleLogout()}
      onCancel={() => setWarning(false)}
      focusCancelBtn
    >

    </SweetAlert> : ""
    }
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "#202026" }} >
      <Toolbar >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.hadleDrawerOpen}
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
                {/* <Form className="d-flex search_input">
                      <Form.Group controlId="formBasicPassword">
                          <Form.Control type="text" placeholder="Search here" />
                      </Form.Group>
                      <Button onClick={()=>this.handleButton(true)} variant="primary" type="submit" className="custom_btn">
                          <i class="fa fa-search" aria-hidden="true"></i>
                      </Button>
                  </Form> */}
                <Nav className="ms-auto">
                  <Nav.Link href="#link"><i className="fa fa-bell" aria-hidden="true"></i></Nav.Link>
                  {user
                    ? <div className="user_profile ms-1 " >
                      <img src={user && user.img ? user.img : `${process.env.PUBLIC_URL}/images/scaner.png`} alt="" height="130px" />
                      <p>{user.name}</p>
                      <NavDropdown title="" id="basic-nav-dropdown">
                        <img src={user && user.img ? user.img : `${process.env.PUBLIC_URL}/images/scaner.png`} alt="" />
                        <h5>{user.name}</h5>
                        <p>{profile && profile.email && profile.email}</p>
                        <p>{profile && profile.vendor_business_detail && profile.vendor_business_detail.location && profile.vendor_business_detail.location}</p>
                        <div className="text-center">
                          <Button variant="secondary" className="custom_btn mt-3" onClick={() => setWarning(true)}>Logout</Button>
                        </div>
                      </NavDropdown>
                    </div>
                    : <Nav.Link href="/login">Login</Nav.Link>}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

      </Toolbar>
    </AppBar></>)



}
export default AppBar1;