import FormBuilderService from '../../Services/FormBuilderService';
import { GET_FORM } from '../Constants/ApiConstants'
import { toast } from 'react-toastify';
import { push } from 'connected-react-router'

function setFetchForm(data) {
    return { type: GET_FORM, payload: data }
}

export const fetchForm = (slug) => (dispatch) => {
    try {
        FormBuilderService.fetchForm(slug)
            .then((res) => {
                if (res.success) {
                    dispatch(setFetchForm(res.data));
                } else {
                    toast.error(res.msg)
                    dispatch(push('/'))
                }
            });
    } catch (error) {
        console.log(error.message);
    }
};

export const saveSurvey = (data) => (dispatch) => {
    try {
        FormBuilderService.saveSurvey(data)
            .then((res) => {
                if (res.success) {
                    toast.success(res.msg)
                    dispatch(push('/'))
                } else {
                    toast.error(res.msg);
                }
            });
    } catch (error) {
        console.log(error.message);
    }
};
