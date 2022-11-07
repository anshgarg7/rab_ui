import React, { useState ,useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import NavBar from "./Common/navBar";
import {Protected,ProtectedActivity,ProtectedRental,ProtectedLogin} from "./Protected/Protected"
import MyBooking from "./pages/myBookings";
import SearchVendor from "./pages/searchVendor";
import ActivityDetails from "./pages/activityDetails";
import RentalactivityDetails from "./pages/rentalactivityDetails";
import Dashboard from "./pages/dashboard";
import ActivityDetails1 from "./pages/activityDetails1";
import RentalActivityDetails1 from "./pages/rentalActivityDetails1";
import BookActivity from "./pages/bookActivity";
import BookActivity1 from "./pages/bookActivity1";
import MyReferrals from "./pages/myReferrals";
import Taxibooking from "./pages/taxibooking";
import VendorDetails from "./pages/vendorDetails";
import Searchlist from "./pages/searchlist";
import TaxibookingForm from "./pages/taxibookingForm";
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SideBar1 from "./Common/sideNav";
import AppBar1 from "./Common/AppBar";
import Login from "./pages/vendorAuth/login"
import auth from "./services/auth"
import ForgetPassword from "./pages/vendorAuth/forgot"
import VerifyOtp from "./pages/vendorAuth/verifyOtp"
import VerifyMobile from "./pages/vendorAuth/verifyMobile"
import CreateNewPassword from "./pages/vendorAuth/newpassword"
import Settings from "./pages/Settings/settings"
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [state, setState] = useState(false)
  const [active, setActive] = useState(1)
  const [user,setUser] = useState({})
  
  useEffect(() => {
    setUser(auth.getUser());
  }, []);

  const handleState = (open) => {
    console.log(open)
    setState(open)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };





  return (
    <Box sx={{ display: 'flex' }}>

      <Router>
        < CssBaseline />
        {/* {
          user && user.token ? */}
            <>
                 <AppBar1 handleDrawerOpen={handleDrawerOpen} open={open} />
                 <SideBar1 open={open} handleDrawerClose={handleDrawerClose} setActive={setActive} active={active} />
            </>
        {/* //     : ''
        // } */}


        <Main open={open}>
        {/* { */}
        {/* // user&&user.token?  */}
        <DrawerHeader />
        {/* :"" */}
        {/* } */}
          <div className="wrapper">
            {/* <NavBar1 handleState={handleState} state={state} /> */}
            {/* <NavBar handleState={handleState} /> */}
            {/* <SideNav/> */}
            <Switch>
              <ProtectedLogin path="/login" component={Login} />
              <ProtectedLogin path="/forgotPassword" component={ForgetPassword}/>
              <ProtectedLogin path="/verifyOtp" component={VerifyOtp}/>
              <ProtectedLogin path="/verifyMobile" component={VerifyMobile} />
              <ProtectedLogin path="/newpassword/:token?" component={CreateNewPassword}/>
              <Route path="/mybookings" component={MyBooking} />
              <Route path="/searchVendor" component={SearchVendor} />
              <Route path="/activityDetails" component={ActivityDetails} />
              <Route path="/rentalactivityDetails" component={RentalactivityDetails} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/activityDetails1" component={ActivityDetails1} />
              <Route path="/rentalActivityDetails1" component={RentalActivityDetails1} />
              <Route path="/bookActivity" component={BookActivity} />
              <Route path="/bookActivity1" component={BookActivity1} />
              <Route path="/bookActivity1" component={BookActivity1} />
              <Route path="/myReferrals" component={MyReferrals} />
              <Route path="/taxibooking" component={Taxibooking} />
              <Route path="/vendorDetails" component={VendorDetails} />
              <Route path="/searchlist" component={Searchlist} />
              <Route path="/taxibookingForm" component={TaxibookingForm} />
              <Route exact path="/settings" component={Settings} />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </div>
        </Main>
      </Router>
    </Box>
  );
}
