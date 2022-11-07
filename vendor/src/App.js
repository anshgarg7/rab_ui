import React, { useState ,useEffect,useRef } from "react";
import {Protected,ProtectedActivity,ProtectedRental,ProtectedLogin} from "./Protected/Protected"
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";
import MyActivity from "./pages/ActivityVendor/myActivity";
import MyActivity2 from "./pages/ActivityVendor/myActivity2";
import MyBooking from "./pages/BokingVendor/myBookings";
import AddNewActivity from "./pages/ActivityVendor/addActivity/addNewActivity";
import ActivityDetails from "./pages/ActivityVendor/activityDetails";
import AvailableSlots from "./pages/availableSlotsDetails";
import BookActivity from "./pages/BokingVendor/bookActivity";
import BookingDetails from "./pages/BokingVendor/bookingDetails";
import Myinventory from "./pages/Inventory/inventory";
import InventoryDetails from "./pages/Inventory/inventoryDetails";
import Settings from "./pages/Settings/settings";
import VerifyMobile from "./pages/RagisterVendor/verifyMobile"
import VerifyOtp from "./pages/RagisterVendor/verifyOtp"
import AddNewRental from "./pages/Rental/addNewRental"
import Rentalactivity from "./pages/Rental/rentalactivity"
import Dashboard from "./pages/dashboard";
import AppBar1 from "./Common/AppBar"
import SideBar1 from "./Common/SideBar";
import Login from "./pages/vendorAuth/login"
import BusinessDetails from "./pages/RagisterVendor/businessDetails"
import RegisterNow from "./pages/RagisterVendor/registerNow"
import Registerbankdetails from "./pages/RagisterVendor/registerbankdetails"
import Registerkycdetails from "./pages/RagisterVendor/registerkycdetails"
import MyRental from "./pages/Rental/myrental";
import auth from "./services/auth"
import CreateNewPassword from "./pages/vendorAuth/newpassword"
import Forgot from "./pages/vendorAuth/forgot";
import editProfile from "./pages/Settings/editProfile";
import EditRental from "./pages/Rental/editRental";
import MyRental2 from "./pages/Rental/myrental2";
import InventoryTable from "./pages/Inventory/inventoryTable";
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
  const [active, setActive] = useState(localStorage.getItem("active"))
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
        <CssBaseline />
       {
           user&&user.token?
           <> 
            <AppBar1 hadleDrawerOpen={handleDrawerOpen} open={open}/> 
            <SideBar1 open={open} handleDrawerClose={handleDrawerClose} setActive={setActive} active={active}/> 
            </>
          : ''
        }
          
        <Main open={open}>
          {user&&user.token? <DrawerHeader />:""}
         {/* <DrawerHeader /> */}
          <div className="wrapper">
            <Switch>
              {/* {token? <>{window.location.reload("/dashboard")}</>:""} */}
              <ProtectedLogin exact path="/login" component={Login}/>
              <ProtectedLogin path="/forgotPassword" component={Forgot}/>
              <ProtectedLogin path="/verifyMobile" component={VerifyMobile} />
              <ProtectedLogin path="/verifyOtp" component={VerifyOtp} />
              <ProtectedLogin path="/registerNow" component={RegisterNow} />
              <ProtectedLogin path="/newpassword/:token?" component={CreateNewPassword}/>
              <ProtectedLogin path="/businessDetails" component={BusinessDetails} />
              <Protected  exect path="/registerbankdetails" component={Registerbankdetails} />
              <Protected exect path="/registerkycdetails" component={Registerkycdetails} />
              <Protected exact path="/dashboard" component={Dashboard} />
              <ProtectedActivity exact path="/myactivity" component={MyActivity2} />
              <Protected exact path="/mybookings" component={MyBooking} />
              <ProtectedRental exact path="/myrental" component={MyRental2}/>
              <ProtectedActivity exact path="/editActivity/:id" component={AddNewActivity}/>
              {/* <Protected exact path="/myrental" component={MyRental}/> */}
              <ProtectedRental exact path="/addnewrental" component={AddNewRental}/>
              <ProtectedRental exact path="/editRental/:id" component={EditRental}/>
              <ProtectedRental exact path="/rentaldetail/:id?" component={Rentalactivity}/>
              <ProtectedActivity exact path="/mynewactivity/:id?" component={AddNewActivity} />
              <ProtectedActivity exact path="/activitydetails/:id" component={ActivityDetails} />
              <Protected exact path="/availableslots" component={AvailableSlots} />
              <Protected exact path="/bookactivity" component={BookActivity} />
              <Route exact path="/bookingdetails/:category/:id" component={BookingDetails} />
              <ProtectedActivity exact path="/myinventory" component={InventoryTable} />
              <ProtectedActivity exact path="/inventoryDetails/:index" component={InventoryDetails} />
              <Protected exact path="/settings" component={Settings} />
              <Protected exact path="/edit-profile" component={editProfile} />
              <Redirect from="/" to="/dashboard"/>
            </Switch>
          </div>

        </Main>
      </Router>

    </Box>
  );
}
