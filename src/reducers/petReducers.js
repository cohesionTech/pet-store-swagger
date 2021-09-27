import { LOAD_PETS, GET_PET, EDIT_PET } from "../actions/types";

export default (state = [], action) => {
    switch(action.type){
        case LOAD_PETS:
            return action.payload;
        case GET_PET:
            return action.payload;
        case EDIT_PET:
            return action.payload;
        default:
            return state;
    }
}