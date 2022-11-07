import React, { useState, useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { IconButton, Divider, Drawer } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom";
import http from "../Helper/http";


const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const SideBar1 = (props) => {
  let { open, setActive, active, handleDrawerClose } = props
  const [dropdown, setDropdown] = useState(false)
  const [profile, setProfile] = useState({})
  const handleChange = () => {
    setDropdown(!dropdown)
  }
  useEffect(() => {
    http.getList(`v1/vendor/get_profile`)
      .then(result => {
        if (result.status == 200) {
          setProfile(result.data)
          // setErrMessage(result.message)
        } else {
          // setErrMessage(result.message)
        }
      })
      .catch(error => {
        console.log(error)
      });
  }, []);
  console.log(profile)
  return (
    <React.Fragment>
      
      <Drawer
      // sideback
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
            <ChevronLeftIcon sx={{ color: "white" }} />
          </IconButton>
        </DrawerHeader>
        <Divider />

        <div className="sidebar">
          <div className="d-flex flex-column flex-shrink-0 p-3 addside">
            <a href="/" className="d-flex align-items-center mb-3 mx-md-auto text-decoration-none">
              <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" height="75px" />
            </a>
            <ul className="nav nav-pills flex-column mb-auto textimgedit">
              <li onClick={() => setActive(1)} className={" " + active == 1 ? "active" : ""} >
                <Link to="/dashboard" className="iconshow" >Dashboard</Link>

              </li>
              {profile && profile.vendor_business_detail && profile.vendor_business_detail.category && profile.vendor_business_detail.category.title =="Adventure"
                ? <li onClick={() => setActive(2)} className={" " + active == 2 ? "active" : ""}>
                  <Link to="/myactivity" className="iconshow icon2">Activity</Link>
                </li>
                : <li onClick={() => setActive(2)} className={" " + active == 2 ? "active" : ""}>
                  <Link to="/myrental" className="iconshow icon2">Rental</Link>
                </li>}
              {/* <li onClick={() => setActive(2)} className={" " + active == 2 ? "active" : ""}>
                <a href="javascript:void(0)" onClick={handleChange} className="iconshow icon2">Activity {
                  dropdown == true ? <span className="dropIcon downIcon"></span> : <span className="dropIcon upIcon"></span>
                } </a>
                {dropdown == true ?
                  <> <Link to="/myactivity" className="iconshow1 icon6">Adventure</Link>
                    <Link to="/myrental" className="iconshow1 icon6">Rental</Link>
                  </>

                  : ''}
              </li> */}
              {/* <li onClick={() => setActive(2)} className={" " + active == 2 ? "active" : ""}>
                          <Link to="/myactivity">My Activity</Link>
                      </li>
                      <li onClick={() => setActive(3)} className={" " + active == 3 ? "active" : ""}>
                          <Link to="/myrental">My Rental</Link>
                      </li> */}
              <li onClick={() => setActive(4)} className={" " + active == 4 ? "active" : ""}>
                <Link to="/mybookings" className="iconshow icon3">My Bookings</Link>
              </li>
              {profile && profile.vendor_business_detail && profile.vendor_business_detail.category && profile.vendor_business_detail.category.title =="Adventure"
                ?   <li onClick={() => setActive(5)} className={" " + active == 5 ? "active" : ""}>
                <Link to="/myinventory" className="iconshow icon4">Inventory</Link>
              </li>
                : ""}
              {/* <li onClick={() => setActive(5)} className={" " + active == 5 ? "active" : ""}>
                          <Link to="">Ledger</Link>
                      </li> */}
              <li onClick={() => setActive(6)} className={" " + active == 6 ? "active" : ""}>
                <Link to="/settings" className="iconshow icon5">Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </Drawer>
    </React.Fragment>)



}
export default SideBar1;