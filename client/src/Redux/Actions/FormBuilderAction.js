import FormBuilderService from '../../Services/FormBuilderService';
import { GET_ANSWER_TYPES, GET_FORMS, SAVE_QUESTION, REMOVE_QUESTION } from '../Constants/ApiConstants'
import { toast } from 'react-toastify';

function answerTypes(data) {
    return { type: GET_ANSWER_TYPES, payload: data }
}

function setFetchForms(data) {
    return { type: GET_FORMS, payload: data }
}

function setSaveQuestion(data) {
    return { type: SAVE_QUESTION, payload: data }
}

function setRemoveQuestion() {
    return { type: REMOVE_QUESTION }
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
                    dispatch(removeQuestion())
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
                    dispatch(removeQuestion())
                    dispatch(fetchForms())
                } else {
                    toast.error(res.msg);
                }
            });
    } catch (error) {
        console.log(error.message);
    }
};

export const saveQuestion = (data) => (dispatch) => {
    try {
        dispatch(setSaveQuestion(data))
        toast.success('Question added. You need to click `Create Form` button to create the form');
    } catch (error) {
        console.log(error.message);
    }
};

export const removeQuestion = (data) => (dispatch) => {
    try {
        dispatch(setRemoveQuestion(data))        
    } catch (error) {
        console.log(error.message);
    }
};
