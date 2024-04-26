import {
  Autocomplete,
  TextField,
  Typography,
} from '@mui/material'
import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import useModal from '../../../../hooks/useModal';
import { useClient } from "@/context/auth-context";
import { useQuery } from 'react-query'

export default function Dropdown({
  title,
  name,
  optionUrl,
  optionLabel,
  multiple = false,
}) {
  const client = useClient()
  const { control, errors } = useFormContext();

  const { modal: menu, openModal: openMenu, closeModal: closeMenu } = useModal();

  const { data, isLoading } = useQuery({
    queryKey: [`${title}-Dropdown`, optionUrl],
    queryFn: () => client(optionUrl).then(data => data.data),
    enabled: menu,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={props => {
        let { onChange, value } = props.field
        return (
          <Autocomplete
            multiple={multiple}
            open={menu}
            onOpen={openMenu}
            onClose={closeMenu}
            options={data ?? []}
            loading={isLoading}
            value={value}
            onChange={(_, data) => {
              onChange(data);
            }}
            isOptionEqualToValue={(option, value) => optionLabel ? option[optionLabel] === value[optionLabel] : option === value}
            getOptionLabel={option => optionLabel ? option[optionLabel] : option}
            renderOption={dataSet => (
              <Typography component="li" {...dataSet} noWrap key={`${dataSet?.key}`}>
                <FormattedMessage id={`${dataSet?.key}`} />
              </Typography>
            )
            }
            renderInput={params => {
              return (
                <TextField
                  {...params}
                  label={<FormattedMessage id={title} />}
                  error={!!errors[name]}
                  helperText={errors[name] && <FormattedMessage id={errors[name]?.message} />}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              )
            }}
          />
        )
      }}
    />
  )
}
