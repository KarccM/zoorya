import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";

const Radio2 = ({ name, control, options, label }) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">
                {<FormattedMessage id={label} />}
            </FormLabel>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <RadioGroup {...field}>
                        {options.map((option) => {
                            return (
                                <FormControlLabel
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            );
                        })}
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
};

export default Radio2;
