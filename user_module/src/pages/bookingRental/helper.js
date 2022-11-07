import http from '../../Helper/http';

import moment from 'moment'

const callApi = (price, start_date, end_date, form,addOnList) => {
  // "2"= per_day "3" per_hour

  let startDate = moment(start_date).format('MM/DD/YYYY');
  let endDate = moment(end_date).format('MM/DD/YYYY');
  let t1 = moment(start_date).format('HH:mm:ss a');
  let t2 = moment(end_date).format('HH:mm:ss a');

  var urlencoded = new URLSearchParams();
  urlencoded.append("activity_category", form.activity_category);
  urlencoded.append("activity_id", form.id);
  urlencoded.append("quantity", price.quantity);
  urlencoded.append("price_type", price.peried);
  urlencoded.append("price", price.amount);
  urlencoded.append("total_price", price.amount);
  urlencoded.append("start_date", startDate);
  urlencoded.append("end_date", endDate);
  urlencoded.append("start_time", moment(t1, "h:mm:ss A").format("HH:mm:ss"));
  urlencoded.append("end_time", moment(t2, "h:mm:ss A").format("HH:mm:ss"));
  if (addOnList.length != 0) {
    addOnList.map(op => {
      urlencoded.append("booking_add_ons", JSON.stringify({id:op.id,quantity:op.setQuantity}));
    })
    // addOnList.map((op, index) => {
    //   urlencoded.append(`booking_add_ons[${index}][id]`, op.id);
    //   urlencoded.append(`booking_add_ons[${index}][quantity]`, op.setQuantity);
    // })
  }


  return urlencoded



}

export default {
  callApi
}