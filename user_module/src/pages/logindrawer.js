import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { Drawer, Box, List } from '@mui/material';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../Helper/http";
import auth from "../services/auth";
import SweetAlert from 'react-bootstrap-sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoginDrawer(props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  })
  const [loder, setLoder] = useState(false)
  const [massege_err, setMassege] = useState("")
  const [alert, setAlert] = useState({
    warning: false,
    message: "",
    success: false,
    loginsuccess: false,
    loginMessage: false,
  })
  const [phoneObj, setPhoneObj] = useState({ phone: "", country_iso: "", country_code: "" })

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.handleState(open)
    // setState({ ...state, [anchor]: open });
  };



  const handleLogin = () => {
    setLoder(true)
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", form.email);
    urlencoded.append("password", form.password);

    http.Login_APi(`v1/user/login`, urlencoded)
      .then(result => {
        let { data } = result;
        console.log(data);
        if (data && data.status === 200) {
          let user = {
            token: data.data.token,
            name: data.data.first_name,
            img: data.data.image,
            email: data.data.email,
            // is_otp_verified: data.data.is_otp_verified,
            address: data.data.address + ' ' + data.data.city + ' ' + data.data.state + ' ' + data.data.country + ' ' + data.data.pin_code
          }
          auth.login(user)
          setLoder(false)
          setAlert({ ...alert, loginsuccess: true, loginMessage: data.message })
        }
        else {
          if (data.data && data.data.is_otp_verified == 0) {
            setMassege("")
            setLoder(false)
            setAlert({ ...alert, warning: true, message: result.data.data.message })
            setPhoneObj({ phone: data.data.mobile_no, country_iso: data.data.country_iso, country_code: data.data.country_code })
          } else {
            setLoder(false)
            setMassege(data.message)
          }
        }
      })
      .catch(error => {
        setLoder(false)
        setMassege(error)
      });


  }

  const history = useHistory();

  const redirectOTP = async () => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("old_mobile_no", phoneObj.phone);
    urlencoded.append("new_mobile_no", phoneObj.phone);
    urlencoded.append("country_iso", phoneObj.country_iso);
    urlencoded.append("country_code", phoneObj.country_code);

    http.Login_APi(`v1/user/update/mobile_no`, urlencoded)
      .then(result => {

        let { data } = result;
        if (data && data.status == 200) {

          history.push({
            pathname: '/verifyOtp',
            state: {
              data: phoneObj.phone,
            }
          });
        }
        else {
          console.log(data.message)
        }
      })
      .catch(error => {
        setMassege(error)
      });

  }

  const onloginSuccess = () => {
    setAlert({ ...alert, loginsuccess: false, loginMessage: "" })
    window.location.reload("/home")
    // toggleDrawer(false)
  }

  const onSuccess = () => {
    setAlert({ ...alert, success: false, message: "" })
    redirectOTP()
  }
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450 }}
      role="presentation"
    // onClick={toggleDrawer(false)}
    // onKeyDown={toggleDrawer(false)}
    >
      <List>
        <aside className="login_slide d-flex align-items-center">
          <div className="w-100">
            <div className="text-center logo_box">
              <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
              <p className="mt-3">Enter your register email address to <br />login </p>
            </div>

            <Form className="label_form mt-5" >
              <Form.Group className="mt-3 mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" value={form.email} onChange={(ev) => setForm({ ...form, email: ev.target.value })} placeholder="Enter Email Address" />
              </Form.Group>

              <Form.Group className="mt-3 mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="password" value={form.password} onChange={(ev) => setForm({ ...form, password: ev.target.value })} placeholder="Enter Password" />
              </Form.Group>
              {massege_err ? <p style={{ color: "red", fontSize: "15px" }}> {massege_err} </p> : ""}
              <div className="text-end mb-4">
                <Link className="link_white" to="/forgotPassword">Forgot Password?</Link>
              </div>

              <Button type="button" className="custom_btn w100" onClick={() => handleLogin()}>Login</Button>
              <Link to="/register" className="custom_btn white_btn w100">Register Now</Link>
            </Form>
          </div>
        </aside>
      </List>
    </Box>
  );

  return (

    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loder}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {alert.warning ? <SweetAlert
        confirmBtnText="OK"
        confirmBtnBsStyle="danger"
        title={alert.message}
        onConfirm={() => setAlert({ ...alert, success: true, warning: false, message: "" })}
        focusCancelBtn
      >
        Please verify your mobile Number
      </SweetAlert> : ""
      }
      {
        alert.success ?
          <SweetAlert
            success
            title="OTP will be send your register mobile Number"
            confirmBtnBsStyle={'danger'}
            onConfirm={() => onSuccess()}
          >
            Mobile number : {phoneObj.phone}
          </SweetAlert> : ""
      }

      {
        alert.loginsuccess ?
          <SweetAlert
            success
            title={alert.loginMessage}
            confirmBtnBsStyle={'danger'}
            onConfirm={() => onloginSuccess()}
          >
            Login Successfully
          </SweetAlert> : ""
      }
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


