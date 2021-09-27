import petsStore from "../apis/petsStore";
import { LOAD_PETS, GET_PET, EDIT_PET } from "./types";

export const loadPets = (status) => async dispatch => {
    const response = await petsStore.get(`/pet/findByStatus?status=${status}`);

    dispatch({type: LOAD_PETS, payload: response.data});
};

export const getPet = petId => async dispatch => {
    console.log(petId);
    const response = await petsStore.get(`/pet/${petId}`);
  
    dispatch({ type: GET_PET, payload: response.data });
};

export const editPet = (values) => async dispatch => {
    const response = await petsStore.put('/pet', values);
  
    dispatch({ type: EDIT_PET, payload: response.data });
};
  