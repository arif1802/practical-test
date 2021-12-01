import { GET_ANSWER_TYPES, GET_FORMS, GET_FORM } from '../Constants/ApiConstants'
const intialState = {
    answerTypes: [],
    forms: [],
    surveyForm: {}
}
export default function ApiReducer(state = intialState, action) {
    switch (action.type) {
        case GET_ANSWER_TYPES:
            return { ...state, answerTypes: action.payload };
        case GET_FORMS:
            return { ...state, forms: action.payload };
        case GET_FORM:
            return { ...state, surveyForm: action.payload };
        default:
            return state;
    }
}