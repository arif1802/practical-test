import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { saveForm } from '../../../Redux/Actions/FormBuilderAction';

export default function FormBuilderDialog(props) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const showChoices = watch(`answer_type`);

    const handleClose = (needToResetParentForm = false) => {
        reset();
        props.handleDialog({ value: false, needToResetParentForm });
    };

    const onSubmit = (data) => {
        const body = { ...data };
        body.form_name = props.formName;
        body.slug = props.formName.replace(new RegExp(" ", "g"), "-").toLowerCase();
        body.choices = manageChoices(data.choices);
        dispatch(saveForm(body))
        handleClose(true);
    }

    // Function to prepare choices
    const manageChoices = (choices) => {
        if (choices) {
            const choicesArray = choices.split('\n');
            const modifedChoices = choicesArray.filter((item, index) => {
                return item && choicesArray.indexOf(item) === index;
            })
            return modifedChoices.join(',')
        } else {
            return "";
        }
    }

    return (
        <div>
            <Dialog fullWidth open={props.openDialog ? props.openDialog : false} onClose={handleClose}>
                <DialogTitle>Form Builder</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill below fields to create the form
                    </DialogContentText>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Question/Title"
                                    error={errors.question ? true : false}
                                    helperText={errors.question ? "Please enter title" : ""}
                                    {...register("question", { required: true })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={errors.answer_type ? true : false}>
                                    <InputLabel id="demo-simple-select-error-label">Answer Types</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-error-label"
                                        label="Answer Types"
                                        {...register("answer_type", { required: true })}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {props.answerTypes.map((row, index) => (
                                            <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.answer_type ? "Please select answer type" : ""}</FormHelperText>
                                </FormControl>
                            </Grid>
                            {showChoices === 2 &&
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Choices"
                                        multiline
                                        rows={4}
                                        error={errors.choices ? true : false}
                                        helperText={errors.choices ? "Please enter choices" : ""}
                                        {...register("choices", { required: true })}
                                    />
                                </Grid>
                            }
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(onSubmit)}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
