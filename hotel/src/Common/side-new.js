import * as React from 'react';
import {Drawer,Box,List} from '@mui/material';
import {Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png';
export default function SideNew(props) {

    const [active,setActive] = React.useState(1)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.handleState(open)
    // setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
      <aside className="login_slide d-flex align-items-center">
        <div className="w-100">
        <div className="sidebar">
          <div class="d-flex flex-column flex-shrink-0 py-3 addside">
                <a href="/" class="d-flex align-items-center mb-3 mx-md-auto text-decoration-none">
                    <img src={logo} alt="" height="75px" />
                </a>
                <ul class="nav nav-pills flex-column mb-auto textimgedit">
                    <li  onClick={()=>setActive(1)} className={" "+active==1?"active":""} >
                        <Link to="dashboard">Dashboard</Link>
                    </li>
                    <li  onClick={()=>setActive(2)} className={" "+active==2?"active":""}>
                        <Link to="myReferrals">My Referrals</Link>
                    </li>
                    <li  onClick={()=>setActive(3)} className={" "+active==3?"active":""}>
                        <Link to="/mybookings">My Bookingssssssssssssssssssss</Link>
                    </li>
                    <li onClick={()=>setActive(4)} className={" "+active==4?"active":""}>
                        <Link to="taxibooking">Taxi Bookings</Link>
                    </li>
                    <li onClick={()=>setActive(5)} className={" "+active==5?"active":""}>
                        <Link to="">Ledger</Link>
                    </li>
                   
                </ul>
            </div>
      </div>

          
        </div>
      </aside>
      </List>
    </Box>
  );

  return (
    <div>
       <React.Fragment>
          <Drawer
            anchor="right"
            open={props.state}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}


