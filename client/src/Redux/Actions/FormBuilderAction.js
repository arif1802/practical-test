import FormBuilderService from '../../Services/FormBuilderService';
import { GET_ANSWER_TYPES, GET_FORMS } from '../Constants/ApiConstants'
import { toast } from 'react-toastify';

function answerTypes(data) {
    return { type: GET_ANSWER_TYPES, payload: data }
}

function setFetchForms(data) {
    return { type: GET_FORMS, payload: data }
}

export const getAnswerTypes = () => (dispatch) => {
    try {
        FormBuilderService.fetchAnswerTypes()
            .then((res) => {
                if (res.success) {
                    dispatch(answerTypes(res.data))
                } else {
                    toast.error(res.msg);
                }
            });
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchForms = () => (dispatch) => {
    try {
        FormBuilderService.fetchForms()
            .then((res) => {
                if (res.success) {
                    dispatch(setFetchForms(res.data));
                } else {
                    toast.error(res.msg);
                }
            });
    } catch (error) {
        console.log(error.message);
    }
};

export const saveForm = (data) => (dispatch) => {
    try {
        FormBuilderService.saveForm(data)
            .then((res) => {
                if (res.success) {
                    toast.success(res.msg)
                } else {
                    toast.error(res.msg);
                }
            });
    } catch (error) {
        console.log(error.message);
    }
};
