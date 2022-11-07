import { ADD_SIGNUP_FORM } from "../actions/type"
const initialState = {
    form:{
            first_name: "",
            last_name: "",
            mobile_no: "",
            email: "",
            password: "",
            gender: "",
            dob: "",
            country: "",
            state: "",
            city: "",
            pin_code: "",
            address: "",
            landmark: "",
            image:"",
            status:"",
            business_name:"",
            aletrnate_mobile_no:"",
            category_id:"",
            location:"",
            description:"",
            is_visiting_card:"",
            visiting_card_image:"",
            award_certification_image:""
        }
}
const reducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case ADD_SIGNUP_FORM:
            const formData = [...form, action.payload]
            return { ...state,form:formData };
        default:
            return {...state};
    }

    return state

}

export default reducer;