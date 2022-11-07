import http from '../../Helper/http';

import moment from 'moment'

const callApi = (price, form, data) => {
  // "2"= per_day "3" per_hour
  console.log(price,form,data)
  if (data.activity_type == "1") {
    let startDate = moment(form.date).format('YYYY-MM-DD');
    let endDate = moment(form.date).format('YYYY-MM-DD');
    form.date = startDate
    form.endDate = endDate
  }
  // var formBody = [];
  //       var details=[{"id":1,"quantity":2}]
  // for (var property in details) {
  //       var encodedKey = encodeURIComponent(property);
  //       var encodedValue = encodeURIComponent(details[property]);
  //       formBody.push(encodedKey + "=" + encodedValue);
  // }


  var urlencoded = new URLSearchParams();
  urlencoded.append("activity_category", data.activity_category);
  urlencoded.append("activity_id", data.id);
  urlencoded.append("slot_id", form.slot_id);
  urlencoded.append("quantity", price.person);
  urlencoded.append("price_type", 1);
  urlencoded.append("price", price.amount);
  urlencoded.append("total_price", price.amount);
  urlencoded.append("start_date", form.date);
  urlencoded.append("end_date", form.endDate);
  urlencoded.append("is_pickup", form.is_pickup);
  urlencoded.append("activity_type", data.activity_type);
  if (data.activity_type == "1") {
    urlencoded.append("start_time", moment(form.slot.start_time, "h:mm:ss A").format("HH:mm:ss"));
    urlencoded.append("end_time", moment(form.slot.end_time, "h:mm:ss A").format("HH:mm:ss"));
  } else {
    urlencoded.append("start_time", form.slot.start_time);
    urlencoded.append("end_time", form.slot.end_time);
  }

  if (form.addOnList.length != 0) {
    form.addOnList.map(op => {
      urlencoded.append("booking_add_ons",JSON.stringify({id:op.id,quantity:op.setQuantity}));
    })
    // form.addOnList.map((op, index) => {
    //   urlencoded.append(`booking_add_ons[${index}][id]`, op.id);
    //   urlencoded.append(`booking_add_ons[${index}][quantity]`, op.setQuantity);
    // })
  }
  // urlencoded.append("booking_add_ons", details);


  return urlencoded



}

export default {
  callApi
}