import http from "../../../Helper/http";

import moment from 'moment'

const callApi = (form) => {
    // console.log(form)
    // let time = "12:23 AM"
    // var formatted = moment(time, "hh:mm A").format("hh:mm");
    console.log(form.activity_type_data)
    let slots = []
    if (form.activity_type_data.slot.length != 0) {
        form.activity_type_data.slot.map(op => {
            let obj = { start_time: moment(op.start_time, "hh:mm A").format("hh:mm"), end_time: moment(op.end_time, "hh:mm A").format("hh:mm"), quantity: op.quantity }
            slots.push(obj)
        })
    }

    var formdata = new FormData();

    formdata.append("activity_id", parseInt(form.activity_id));
    formdata.append("activity_adventure_type_id", parseInt(form.activity_adventure_type_id));
    formdata.append("title", form.title);
    formdata.append("level", parseInt(form.level));
    formdata.append("altitude_depth_height", parseInt(form.altitude_depth_height));
    formdata.append("age_from", parseInt(form.age_from));
    formdata.append("age_to", parseInt(form.age_to));
    formdata.append("description", form.description);
    formdata.append("warning", form.warning);
    formdata.append("is_pickup", parseInt(form.is_pickup));
    formdata.append("is_website", parseInt(form.is_website));
    formdata.append("is_provide_all_parts", parseInt(form.is_provide_all_parts));
    formdata.append("website_link", form.website_link);
    formdata.append("video", form.video);
    form.language.map((op, index) => {
        formdata.append(`language[${index}]`, op)
    })
    // formdata.append("longitude", form.longitude);
    // form.language&&form.language.map((i, index) => (
    //     formdata.append(`language[${index}]`, i)
    // ))
    form.price.map((i, index) => {
        formdata.append(`price[${index}][amount]`, parseInt(i.amount))
        formdata.append(`price[${index}][no_of_person]`, parseInt(i.no_of_person))

    })
    form.what_to_take.map((i, index) => (

        formdata.append(`what_to_take[${index}][name]`, i.name)

    ))
    form.thing_service_included.map((i, index) => (

        formdata.append(`thing_service_included[${index}][name]`, i.name)

    ))
    form.add_ons.map((i, index) => {

        formdata.append(`add_ons[${index}][item]`, i.item)
        formdata.append(`add_ons[${index}][price]`, parseInt(i.price))
        formdata.append(`add_ons[${index}][quantity]`, parseInt(i.quantity))

    })
    form.list_date.map((i, index) => {
        formdata.append(`list_date[${index}][start_date]`, i.start_date)
        formdata.append(`list_date[${index}][end_date]`, i.end_date)
    })
    for (var i = 0; i < form.images.length; i++) {
        formdata.append('images', form.images[i]);
    }

    if (form.is_pickup == "1") {
        formdata.append("is_extra_charges", parseInt(form.is_extra_charges));
        formdata.append("address_line_one", form.address_line_one);
        formdata.append("address_line_two", form.address_line_two);
        formdata.append("landmark", form.landmark);
        formdata.append("country", form.country);
        formdata.append("state", form.state);
        formdata.append("city", form.city);
        formdata.append("pin_code", parseInt(form.pin_code));
        formdata.append("latitude", form.latitude);
        formdata.append("longitude", form.longitude);
        formdata.append("location", form.location);
    }
    /////////////////////////////////////////// ACTIVITY TYPE ////////////////////////////////////////////////////////
    formdata.append(`activity_type_data[activity_type]`, form.activity_type_data.activity_type)

    if (form.activity_type_data.activity_type == "1" && form.activity_type_data.single_day_categories == "1") {
        formdata.append(`activity_type_data[single_day_categories]`, form.activity_type_data.single_day_categories)
        formdata.append(`activity_type_data[slot_type]`, form.activity_type_data.slot_type)
    }
    ///////////////////////////////////////////////SINGLR AUTO//////////////////////////////////////////////////////////////

    if (form.activity_type_data.activity_type == "1" && form.activity_type_data.single_day_categories == "1" && form.activity_type_data.slot_type == "1") {
        formdata.append(`activity_type_data[auto][start_time]`, form.activity_type_data.auto.start_time)
        formdata.append(`activity_type_data[auto][slot_time_duration]`, form.activity_type_data.auto.slot_time_duration)
        formdata.append(`activity_type_data[auto][day_slot]`, parseInt(form.activity_type_data.auto.day_slot))
        formdata.append(`activity_type_data[auto][time_slot]`, parseInt(form.activity_type_data.auto.time_slot))
    }
    /////////////////////////////////////////////Multi DAY //////////////////////////////////////////////////////////////
    if (form.activity_type_data.activity_type == "2") {
        formdata.append("activity_type_data[activity_repeat_in_future]", parseInt(form.activity_type_data.activity_repeat_in_future));
        formdata.append("activity_type_data[duration]", parseInt(form.activity_type_data.duration));
        formdata.append("activity_type_data[quantity]", parseInt(form.activity_type_data.quantity));
        formdata.append("activity_type_data[start_date]", form.activity_type_data.start_date);
        formdata.append("activity_type_data[no_of_spot]", parseInt(form.activity_type_data.no_of_spot));
        formdata.append("activity_type_data[start_time]", form.activity_type_data.start_time);
        formdata.append("activity_type_data[end_time]", form.activity_type_data.end_time);
        form.activity_type_data.itinerary.map((op, index) => {
            formdata.append(`activity_type_data[itinerary][${index}]`, op);
        })
        if (form.activity_type_data.activity_repeat_in_future == "1") {
            form.activity_type_data.repeat_in_fature.map((op, index) => {
                formdata.append(`activity_type_data[repeat_in_fature][${index}][repeat_start_date]`, op.repeat_start_date);
                formdata.append(`activity_type_data[repeat_in_fature][${index}][spot]`, parseInt(op.spot));

            })
        }
    }
    ///////////////////////////////////////////////////FLEXD SINGLE/////////////////////////////////////////////////////////
    if (form.activity_type_data.activity_type == "1" && form.activity_type_data.single_day_categories == "2") {
        formdata.append(`activity_type_data[single_day_categories]`, form.activity_type_data.single_day_categories)
        form.activity_type_data.flexd.map((i, index) => {
            console.log(i.slot_type)
            formdata.append(`activity_type_data[flexd][${index}][itinerary]`, i.itinerary)
            if (i.slot_type == "Morning") {
                let num = 3
                formdata.append(`activity_type_data[flexd][${index}][slot_type]`, "3")
            } else if (i.slot_type == "Afternoon") {
                let num = 4
                formdata.append(`activity_type_data[flexd][${index}][slot_type]`, "4")
            } else if (i.slot_type == "Evening") {
                let num = 5
                formdata.append(`activity_type_data[flexd][${index}][slot_type]`, "5")
            }
            formdata.append(`activity_type_data[flexd][${index}][duration]`, parseInt(i.duration))
            formdata.append(`activity_type_data[flexd][${index}][start_time]`, i.start_time)
            formdata.append(`activity_type_data[flexd][${index}][duration_quantity]`, parseInt(i.duration_quantity))
            formdata.append(`activity_type_data[flexd][${index}][day_quantity]`, parseInt(i.day_quantity))
        })
    }

    if(form.activity_type_data.activity_type == "1" && form.activity_type_data.single_day_categories == "3"){
        formdata.append(`activity_type_data[single_day_categories]`, form.activity_type_data.single_day_categories)

    }
    /////////////////////////////////////////////////// SINGLE SPOT ////////////////////////////////////////////////////////
    if (slots.lenght != 0 && form.activity_type_data.activity_type == "1") {
        slots.map((i, index) => {
            formdata.append(`activity_type_data[slot][${index}][start_time]`, i.start_time)
            formdata.append(`activity_type_data[slot][${index}][end_time]`, i.end_time)
            formdata.append(`activity_type_data[slot][${index}][quantity]`, parseInt(i.quantity))
        })
    }



    return formdata


}
const editApi = (form) => {
    var formdata = new FormData();

    formdata.append("activity_id", parseInt(form.activity_id));
    formdata.append("activity_adventure_type_id", parseInt(form.activity_adventure_type_id));
    formdata.append("title", form.title);
    formdata.append("level", parseInt(form.level));
    formdata.append("altitude_depth_height", parseInt(form.altitude_depth_height));
    formdata.append("age_from", parseInt(form.age_from));
    formdata.append("age_to", parseInt(form.age_to));
    formdata.append("description", form.description);
    formdata.append("warning", form.warning);
    formdata.append("is_pickup", parseInt(form.is_pickup));
    formdata.append("is_website", parseInt(form.is_website));
    formdata.append("is_provide_all_parts", parseInt(form.is_provide_all_parts));
    formdata.append("website_link", form.website_link);
    formdata.append("meeting_point_id", form.meeting_point_id);
    formdata.append("video", form.video);
    // formdata.append("language[0]", "hINDI");

    form.language.map((op, index) => {
        formdata.append(`language[${index}]`, op)
    })
    if (form.is_pickup == "1") {
        formdata.append("is_extra_charges", parseInt(form.is_extra_charges));
        formdata.append("address_line_one", form.address_line_one);
        formdata.append("address_line_two", form.address_line_two);
        formdata.append("landmark", form.landmark);
        formdata.append("country", form.country);
        formdata.append("state", form.state);
        formdata.append("city", form.city);
        formdata.append("pin_code", parseInt(form.pin_code));
        formdata.append("latitude", form.latitude);
        formdata.append("longitude", form.longitude);
        formdata.append("location", form.location);
    }
    form.price.map((i, index) => {
        i.id && formdata.append(`price[${index}][id]`, parseInt(i.id)) 
        formdata.append(`price[${index}][amount]`, parseInt(i.amount))
        formdata.append(`price[${index}][no_of_person]`, parseInt(i.no_of_person))

    })
    form.what_to_take.map((i, index) => {
        i.id && formdata.append(`what_to_take[${index}][id]`, i.id) 
        formdata.append(`what_to_take[${index}][name]`, i.name)
    })
    form.thing_service_included.map((i, index) => {

        i.id &&formdata.append(`thing_service_included[${index}][id]`, i.id) 
        formdata.append(`thing_service_included[${index}][name]`, i.name)
    })
    form.add_ons.map((i, index) => {
        i.id && formdata.append(`add_ons[${index}][id]`, i.id)
        formdata.append(`add_ons[${index}][item]`, i.item)
        formdata.append(`add_ons[${index}][price]`, parseInt(i.price))
        formdata.append(`add_ons[${index}][quantity]`, parseInt(i.quantity))
    })
    form.list_date.map((i, index) => {
        i.id && formdata.append(`list_date[${index}][id]`, i.id)
        formdata.append(`list_date[${index}][start_date]`, i.start_date)
        formdata.append(`list_date[${index}][end_date]`, i.end_date)
    })
    for (var i = 0; i < form.images.length; i++) {
        formdata.append('images', form.images[i]);
    }


    return formdata

}
export default {
    callApi, editApi
}