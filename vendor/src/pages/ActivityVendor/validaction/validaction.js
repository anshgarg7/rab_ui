import moment from "moment"
const validactionFlaxed = (flaxedSlot, manageFlaxedSlots, val , category) => {
    console.log(flaxedSlot,"sasas")
    let error = {}
    console.log(manageFlaxedSlots,"sasasass",category)
    if (val == "add"&&category=="2") {
        if (flaxedSlot.slot_type.length == 0 || !flaxedSlot.duration || !flaxedSlot.start_time || !flaxedSlot.day_quantity || !flaxedSlot.duration_quantity) {
            error.manageFlaxedSlots = "Please fill all the details"
        }
        else if (parseInt(flaxedSlot.day_quantity) < parseInt(flaxedSlot.duration_quantity)) {
            error.manageFlaxedSlots = "Max Capacity/Slot Allways less then Max Capacity/Day"
        }
        else if (parseInt(flaxedSlot.pendingSlot) < parseInt(flaxedSlot.duration_quantity)) {
            error.manageFlaxedSlots = "Your Max Capacity/Slot limit is low"
        }
        else if (parseInt(flaxedSlot.pendingSlot) <= 0) {
            error.manageFlaxedSlots = "Your Max Capacity/Slot limit is Complete"
        }
        else if (manageFlaxedSlots.length != 0 && manageFlaxedSlots[manageFlaxedSlots.length - 1].newTime < flaxedSlot.start_time) {
            error.manageFlaxedSlots = "Start Time should be  greater then to last slot end time  "
        }
        else if (manageFlaxedSlots.length != 0) {
            let start = new Date(`08-09-2022 ${manageFlaxedSlots[manageFlaxedSlots.length - 1].end_time}`)
            let end = new Date(`08-09-2022 ${flaxedSlot.start_time}`)
            console.log(start, end)
            if (start > end) {
                error.manageFlaxedSlots = "Start Time Should be graeater than or equal to previous slot end time. Enter valid Time "
            }
        }
    }


    console.log(error)
    return error

}

const formValiaction = (form, val) => {

    let error = {}
    if (form.activity_id == null || form.activity_id == '0') {
        error.activity_id = " *Please select the activity category"
    }
    if (form.activity_adventure_type_id == null || form.activity_adventure_type_id == "" || form.activity_adventure_type_id == '0') {
        error.activity_adventure_type_id = " *Please select the sub category"
    }
    if (form.title == "") {
        error.title = " *Please enter the activity titile"
    }
    if (form.level == null || form.level == "" || form.level == '0') {
        error.level = " *Please select  the activity level"
    }
    if (form.altitude_depth_height == "" || form.altitude_depth_height == null) {
        error.altitude_depth_height = " *Altitude/Depth/Height is required"
    }
    if (form.language.length == 0) {
        error.language = " *Please select the languages "
    }
    if (form.age_from == "" || form.age_from == null) {
        error.age_from = " *Please enter the Age from"
    }
    if (form.age_to == "" || form.age_to == null) {
        error.age_to = " *Please enter the Age to"
    }
    if (form.price.length == 0) {
        error.price = " *Please enter the price"
    }
    if (form.age_from || form.age_to) {
        if (form.age_from > form.age_to) {
            error.age_from = " *Age from should be less then age to"
        }
    }
    if (form.description == "") {
        error.description = " *Please enter the description"
    }
    if (form.warning == "") {
        error.warning = " *Please enter the Warning"
    }
    // if (form.what_to_take.length == 0) {
    //     error.what_to_take = " *What to Take is required"
    // // } 
    // if (form.thing_service_included.length == 0){
    //     error.thing_service_included = " *Things and services included is required"
    // }
    // if (form.add_ons.length == 0){
    //     error.add_ons = " *Add Ons is required"
    // }
    if (form.is_pickup == null || form.is_pickup == "") {
        error.is_pickup = " *Please select the pickup option"
    }
    if (form.is_pickup == 1 && form.is_extra_charges == null) {
        error.is_extra_charges = " *Please select the charges option"
    }
    if (form.is_pickup == 1) {
        if (form.address_line_one == "") {
            error.address_line_one = " *Please enter the meeting Address line"
        } if (form.country == "") {
            error.country = " *Please select the meeting country"
        } if (form.state == "") {
            error.state = " *Please select meeting state"
        } if (form.pin_code == "") {
            error.pin_code = " *Please enter the meeting pin Code no"
        } if (form.location == "") {
            error.location = " *Please select meeting loaction"
        } if (form.city == "") {
            error.city = " *Please select meeting city"
        } if (form.landmark == "") {
            error.landmark = " *Please enter the landmark"
        }
    }
    if (!val) {
        if (form.activity_type_data.activity_type == null || form.activity_type_data.activity_type == "") {
            error.activity_type = " *Please select any Activity type"
        }
    }
    if (form.images.length == 0) {
        error.images = " *Choose the Images or videos"
    } if (form.list_date.length == 0) {
        error.list_date = " *Please select List date"
    } if (form.is_website == null || form.is_website == "") {
        error.is_website = " *Please select website option"
    } if (form.is_provide_all_parts == null || form.is_provide_all_parts == "") {
        error.is_provide_all_parts = " *Please select all the parts of this activity"
    }
    if (val != "edit") {
        if (form.activity_type_data.activity_type == "1" && form.activity_type_data.single_day_categories == "1" && form.activity_type_data.slot_type == "1") {
            if (form.activity_type_data.auto.start_time == "" || form.activity_type_data.auto.slot_time_duration == "" || form.activity_type_data.auto.day_slot == "" || form.activity_type_data.auto.time_slot == "") {
                error.autoSlot = " *Please Fill All the Fields"
            }
            if (form.activity_type_data.auto.start_time != "" && form.activity_type_data.auto.slot_time_duration != "" && form.activity_type_data.auto.day_slot != "" && form.activity_type_data.auto.time_slot != "" && form.activity_type_data.slot.length == 0) {
                error.autoSlot = " *Please Add the slots"
            }
        }
        if (form.activity_type_data.activity_type == "2") {
            if (form.activity_type_data.duration == "" || form.activity_type_data.start_date == "" || form.activity_type_data.no_of_spot == "" || form.activity_type_data.quantity == "" || form.activity_type_data.start_time == "" || form.activity_type_data.end_time == "") {
                error.multySlot = " *Please Fill All the Fields"
            }
            if (form.activity_type_data.duration != "" && form.activity_type_data.start_date != "" && form.activity_type_data.no_of_spot != "" && form.activity_type_data.quantity != "" && form.activity_type_data.start_time != "" && form.activity_type_data.end_time != "" && form.activity_type_data.itinerary.length == 0) {
                error.multySlot = " *Please Show All Itinerary"
            }
            if (form.activity_type_data.duration != "" && form.activity_type_data.start_date != "" && form.activity_type_data.no_of_spot != "" && form.activity_type_data.quantity != "" && form.activity_type_data.start_time != "" && form.activity_type_data.end_time != "" && form.activity_type_data.itinerary.length != 0) {
                form.activity_type_data.itinerary.map(op => {
                    if (op == "") {
                        error.multySlot = " *Please enter Itinerary  description for all days"
                    }
                })
            }
            if (form.activity_type_data.activity_repeat_in_future == 1) {
                if (form.activity_type_data.repeat_in_fature.length == 0) {
                    error.repeat = " *Please Add activity repeat in Future"

                }
            }


        }
        if(form.activity_type_data.activity_type=="1"&&form.activity_type_data.single_day_categories=="2"){
            if(form.activity_type_data.slot.length==0){
                error.managSlots  = " *Please Add Flexed Slots"
            }
          
        }
    }




    return error
}
export default {
    validactionFlaxed, formValiaction
}