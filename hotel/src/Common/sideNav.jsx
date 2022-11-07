import React, { Component } from "react";

import {Link  } from "react-router-dom";
import '../assets/css/style.css'
import { styled, useTheme } from '@mui/material/styles';
import {IconButton,Divider,Drawer} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import logo from '../assets/images/logo.png';
import zIndex from "@mui/material/styles/zIndex";


const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
     const SideNav = (props) =>{
        let {open,setActive,active,handleDrawerClose} = props
       
     return(

<React.Fragment>
  <Drawer sideback
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: "#202026",
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
<DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon sx={{ color:"white", } } />
            </IconButton>
          </DrawerHeader>
          <Divider />
      <div className="sidebar testClass">
          <div class="d-flex flex-column flex-shrink-0 py-3 addside">
          <a href="/" class="d-flex align-items-center mb-3 mx-md-auto text-decoration-none">
                      <img src={`${process.env.PUBLIC_URL}/images/logo.png`}alt="" height="75px" />
                  </a>
                <ul class="nav nav-pills flex-column mb-auto textimgedit">
                
                    <li  onClick={()=> setActive(1)} className={" "+active==1?"active":""} >
                        <Link to="dashboard">Dashboard</Link>
                    </li>
                    <li  onClick={()=> setActive(2)} className={" "+active==2?"active":""}>
                        <Link to="myReferrals">My Referrals</Link>
                    </li>
                    {/* <li  onClick={()=> setActive(3)} className={" "+active==3?"active":""}>
                        <Link to="/mybookings">My Bookings</Link>
                    </li>
                    <li onClick={()=> setActive(4)} className={" "+active==4?"active":""}>
                        <Link to="taxibooking">Taxi Bookings</Link>
                    </li> */}
                    <li onClick={()=> setActive(5)} className={" "+active==5?"active":""}>
                        <Link to="">Ledger</Link>
                    </li>
                    <li onClick={() => setActive(6)} className={" " + active == 6 ? "active" : ""}>
                          <Link to="/settings">Settings</Link>
                      </li>
                   
                </ul>
            </div>
      </div>
      </Drawer>
    </React.Fragment>)

}
export default SideNav;