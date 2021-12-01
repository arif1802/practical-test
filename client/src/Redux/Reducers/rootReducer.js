import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import FormBuilderReducer from './FormBuilderReducer'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    formBuilder: FormBuilderReducer
})
export default createRootReducer