import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form'
import { FormattedMessage } from 'react-intl';


export default function CustomSelect({
  label,
  name,
  control,
  errors,
  options,
  optionLabel = 'label',
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
      }) => (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label"><FormattedMessage id={label} /></InputLabel>
          <Select
            {...rest}
            value={value}
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          >
            {options?.map(option => {
              return <MenuItem value={option.value}>
                <FormattedMessage id={option[optionLabel]} />
              </MenuItem>
            })}
          </Select>
          <FormHelperText>
            {errors[name] && <FormattedMessage id={errors[name]?.message} />}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}