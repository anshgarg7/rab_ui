import React, { useState } from "react"
import { Container, Tabs, Tab, Row, Col, Button, Form, Modal, ModalBody } from "react-bootstrap";
import "../../assets/css/style.css"
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import activity_image from "../../assets/images/activity_image.png"
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const RatingReview = () => {
    const [showRating, setRating] = useState(false)
    const [value, setValue] = useState(2)
    const [hover, setHover] = useState(-1)

    return (
        <>
            <Modal className="rating-model" show={showRating} onHide={() => setRating(false)} >
                <Modal.Header className="main-popupheader" closeButton > <h6>Comment & Reviews</h6>
                    <hr />
                </Modal.Header>

                <Modal.Body>
                    <div className="mainfile ">
                        <div className="formcolr3">
                            <div className="fixed-rate-box1">
                                <Row>
                                    <Col md={12}> <h4 class="main-titePOPUP">Mahindra Thar (4*4) Red Color </h4></Col>
                                    <Col md={12}>



                                        <div className="bankname d-flex align-items-center">
                                            <span>
                                                <img class="round-imguser d-flex" src={activity_image} style={{ borderRadius: "50%", width: "70px", height: "70px" }} />
                                            </span>
                                            <span className="ms-3">
                                                <h4>Sonam Designer</h4>
                                                <p className="star-rate"><i class="fa fa-star ms-1" aria-hidden="true"></i>
                                                    <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                                    <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                                    <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                                    <i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                                    <small>Poor+</small>
                                            </span>
                                            <div className="comment-area"> <textarea className="form-control" placeholder="What's in Your Mind" rows="3"></textarea> </div>
                                        </div>

                                      
                                    </Col>
                                    {/* <Col md={8}>
                                        <Box
                                            sx={{
                                                width: 20,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}

                                        >
                                            <Rating
                                                name="hover-feedback"
                                                value={value}
                                                precision={0.5}
                                                getLabelText={getLabelText}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            {value !== null && (
                                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                            )}
                                        </Box>
                                        <div className="comment-area"> <textarea className="form-control" placeholder="What's in Your Mind" rows="3"></textarea> </div>
                                        <div className="text-right">
                                            <button type="button" class="btn clk-btn custom_btn w50" data-toggle="modal" data-target="#formsss" onClick={() => setRating(false)}>  Send
                                            </button>
                                        </div>


                                    </Col> */}
                                </Row>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>





























            <div className="fixed-rate-box">
                <Row>
                    <Col md={12}>
                        <h4>Sonam Bhardwaj</h4>
                        <button type="button" class="btn-close rating-close" data-bs-dismiss="modal" aria-label="Close"></button>

                    </Col>
                    <Col md={4}>
                        <div class="rating-img"><img className="rounded-circle" src="https://admin.tripperpedia.in/uploadImages/activityMedia/1653475702635.jpg " /></div>
                    </Col>
                    <Col md={8}>
                        <Box
                            sx={{
                                width: 20,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.5}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover)
                                }}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            {value !== null && (
                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                            )}
                        </Box>
                        <button type="button" class="btn clk-btn" data-toggle="modal" data-target="#formsss" onClick={() => setRating(true)}>  Click Here
                        </button>
                    </Col>
                </Row>
            </div>
        </>
    )

}
export default RatingReview;