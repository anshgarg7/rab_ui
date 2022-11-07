const re = /^[A-Za-z]+$/;

const valdaction = (form) => {
    let error = {}
    // if (form.profile_image.length == 0) {
    //     error.images = "* Image is required"
    // } 
    // if(form.profile_image.length > 4||form.images.length>4){
    //     error.images = "* you can upload only is 4 images"
    // }
    if (form.activity == '' || form.activity == null) {
        error.activity = "*  Category is required"
    }

    if (form.brand == ""||form.brand == null) {
        error.brand = "*  Brand is required"
    }

    if (form.model == '' ||  form.model == null) {
        error.model = "*  Model is required"
    }
    if (form.title == '') {
        error.title = "*  title is required"
    }
    // if (form.title != '') {
    //     for (let i = 0; i <= form.title.length; i++) {
    //         if (re.test(form.title[i])) {

    //         } else {
    //             error.title = "* Only Alphabat  is required jjjj"
    //         }
    //     }
    // }


    if (form.quantity == '' || form.quantity == null) {
        error.quantity = "*  Quantity is required"
    } if (form.quantity < form.vehicle_details.length) {
        error.vehicle_details = "*  Please remove any vehicle details because Inventory is less then your vechicle details"
    }
    if(form.quantity>form.vehicle_details.length){
        error.vehicle_details = "*  Please remove some  vehicale details because you Inventory is less"
    }
    if (form.description == '') {
        error.description = "*  Description is required"
    } if (form.warning == '') {
        error.warning = "*  Warning is required"
    } if (form.vehicle_details.length == 0) {
        error.vehicle_details = "*  Vehicle Details is required"
    } if (form.price.per_hour.amount == '' || form.price.per_day.amount == null) {
        error.per_hour = "*  Price Per_hour is required"
    } if (form.price.per_day.amount == null || form.price.per_day.amount == '') {
        error.per_day = "*  Price Per_day is required"
    } 
    // if (form.what_to_take.length == 0) {
    //     error.what_to_take = "what_to_take items is required"
    // } if (form.thing_service_included == '') {
    //     error.thing_service_included = "* thing_service_included  is required"
    // } if (form.add_ons == '') {
    //     error.add_ons = "*  add_ons is required"
    // }
    return error

}

export default {
    valdaction
}