import React, { useState, useEffect } from "react";
import { Protected, ProtectedLogin } from "./Protected/Protected"
import { styled, useTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Home from "./pages/home/home";
import Register from "./pages/userRegister/register";
import RegisterTwo from "./pages/userRegister/registersteptwo";

import VerifyMobile from "./pages/userRegister/verifyMobile";
import VerifyOtp from "./pages/userRegister/verifyOtp";
import Forgot from "./pages/userRegister/forgot";
import CreateNewPassword from "./pages/userRegister/newpassword";

import RegisterThree from "./pages/userRegister/registerstepthree";


import ExploreLocation from "./pages/explorelocation";
import ActivityDetails from "./pages/booking/activitydetails";

import ActivityPayment from "./pages/activitypayment";
import MyBookings from "./pages/mybookings";
import MyBookingDetails from "./pages/bookingDetails/mybookingdetail"
import RentalDetails from "./pages/bookingRental/rentaldetails";
import RentalPayment from "./pages/rentalpayment";
import MyBookingRentalDetails from "./pages/mybookingrentaldetails";
import ExploreCategory from "./pages/exploreCategory/exploreCategory";
import Settings from "./pages/settings";
import SearchTaxi1 from "./pages/Taxi/searchtaxi1";
import Searchtaxiresult from "./pages/Taxi/searchtaxiresult";
import ConfirmBooking from "./pages/Taxi/confirmBooking";
import ConfirmBooking1 from "./pages/confirmBooking1";
import ConfirmBooking2 from "./pages/confirmBooking2";
import AllAdventure from "../src/pages/allAdventure/allAdventure";
import RatingReview from "./pages/Rating/rating";
export default function App() {



  return (<>
  
    <Router>

      <Switch>

        <ProtectedLogin path="/register" component={Register} />
        <ProtectedLogin path="/register-two" component={RegisterTwo} />
        <ProtectedLogin path="/verifyMobile" component={VerifyMobile} />
        <ProtectedLogin path="/verifyOtp" component={VerifyOtp} />
        <ProtectedLogin path="/forgotPassword" component={Forgot} />
        <ProtectedLogin path="/newpassword/:token?" component={CreateNewPassword} />

        <Route path="/register-three" component={RegisterThree} />

        <Route path="/home" component={Home} />
        <Route path="/all/:category" component={AllAdventure} />
        <Route path="/explorelocation/:state/:activity_category/:id" component={ExploreCategory} />
        <Route path="/explorelocation/:activity_category/:id" component={ExploreCategory} />
        <Route path="/explorelocation/:loaction" component={ExploreLocation} />
        <Route path="/explorelocation" component={ExploreLocation} />
        <Route path="/activity-details/:id" component={ActivityDetails} />
        <Route path="/activity_payment" component={ActivityPayment} />
        <Protected path="/mybookings" component={MyBookings} />
        <Route path="/mybooking_details/:category/:id" component={MyBookingDetails} />
        <Route path="/rental_details/:id" component={RentalDetails} />
        <Route path="/rental_payment" component={RentalPayment} />
        <Route path="/mybooking_rental_details" component={MyBookingRentalDetails} />
        <Route path="/settings" component={Settings} />
        <Protected path="/search_taxi" component={SearchTaxi1} />
        <Protected path="/search_taxi_result" component={Searchtaxiresult} />
        <Protected path="/confirmBooking/:id" component={ConfirmBooking} />
        <Route path="/my_ride" component={ConfirmBooking1} />
        <Route path="/my_booking_details" component={ConfirmBooking2} />

        <Redirect from="/" to="/home" />
      </Switch>

    </Router>
    <RatingReview/>
   </>

  );
}
