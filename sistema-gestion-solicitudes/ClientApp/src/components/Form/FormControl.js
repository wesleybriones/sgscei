import React from "react";
import Input from "./Input";
import Checkbox from "./CheckBox";
import Select from "./Select";
import TextArea from "./TextArea";
import FileInput from "./File";
import DateTimePicker from "./Datetime";
import FormikAutocomplete from "./MultiSelect";
import RadioButton from "./RadioButton";

const FormikControl = (props) => {
    const { control, ...rest } = props;

    switch (control) {
        case "input":
            return <Input {...rest} />;
        case "checkbox":
            return <Checkbox {...rest} />;
        case "radiobutton":
            return <RadioButton {...rest} />;
        case "select":
            return <Select {...rest} />;
        case "textarea":
            return <TextArea {...rest} />;
        case "file":
            return <FileInput {...rest} />;
        case "datetime":
            return <DateTimePicker {...rest} />;
        case "autocomplete":
            return <FormikAutocomplete {...rest} />;
        default:
            return null;
    }
};

export default FormikControl;