import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Table,Row,Col,Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModelAvailability(props) {
   
  return (
    <div className='modalavaibility'>
      <Modal
         className='modalavaibility'
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={()=>props.handleModel(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
        <Box sx={{ ...style, width: 800 }}>
          <div className='bookingslot'>
            <h4 className='text-center text-white mb-4'>Availability Slot</h4>
            <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>10-11 AM</th>
      <th>11-12 AM</th>
      <th>12-01 PM</th>
      <th>01-02 PM</th>
      <th>02-03 PM</th>
      <th>03-04 PM</th>
      <th>04-05 PM</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>4</td>
      <td>8</td>
      <td>2</td>
      <td>4</td>
      <td>2</td>
     
    </tr>
   
  </tbody>
</Table>
<Row className="">
<Col lg={6}>
                                
                            </Col>
                            <Col lg={3}>
                                
                                <Link to="/activity-details" className="custom_btn w100">Book Now</Link>
                            </Col>
                            <Col lg={3}>
                               
                                <Link to="/" className="custom_btn w100" onClick={()=>props.handleModel(false)}>Cancel</Link>
                            </Col>
                        </Row>

          </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
