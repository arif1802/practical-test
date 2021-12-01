import Axios from "../Api/AxiosInterceptor";

function fetchAnswerTypes(data) {
    return Axios.get("api/get-answer-types");
}

function saveForm(data) {
    return Axios.post('api/save-form', data)
}

function checkFormExist(data) {
    return Axios.post('api/check-form-exist', data)
}

function fetchForms() {
    return Axios.get("api/forms");
}

function fetchForm(slug) {
    return Axios.get(`api/form/${slug}`);
}

function saveSurvey(data) {
    return Axios.post('api/survey', data)
}

export default { fetchAnswerTypes, saveForm, checkFormExist, fetchForms, fetchForm, saveSurvey };
