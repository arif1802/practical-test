import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import {
    Switch
} from "react-router-dom";
const FormBuilderComponent = React.lazy(() => import('../Pages/FormBuilder'));
const SurveyComponent = React.lazy(() => import('../Pages/Survey'));

export default function Routes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/" component={FormBuilderComponent} />
                <Route exact path="/survey/:slug" component={SurveyComponent} />
            </Switch>
        </Suspense>
    );
}