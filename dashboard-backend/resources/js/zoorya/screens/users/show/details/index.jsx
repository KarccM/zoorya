import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useClient } from '@/context/auth-context';
import { useParams } from "react-router-dom";
import { ModalSpinner } from "@/components/lib";
import { Box, Grid, Typography, styled } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { fDate } from '../../../../utils/formatTime';
import { useForm } from 'react-hook-form';
import CustomCheckbox from "../../../../components/form/components/custom-checkbox";
import CustomInput from '@/components/form/components/custom-input';
import { successWithCustomMessage } from '@/utils/notifications';

import SubmitLayout from '@/components/SubmitLayout';
import { useEffect } from 'react';

export default function details() {
  const { id } = useParams();
  const client = useClient();
  const queryClient = useQueryClient();

  const { isLoading: fetchLoading, data: user } = useQuery({
    queryKey: `user_${id}`,
    queryFn: () => client(`users/${id}`).then((data) => data.data),
    enabled: id !== undefined,
  });


  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme?.palette?.mode === 'dark' ? theme?.palette?.grey[500_12] : theme?.palette?.grey[100],
    borderRadius: '16px',
    padding: '24px',
    height: 'fit_content',
    boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
  }));


  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      subscribeNewsletter: false,
      meditationPractice: false,
      exercisePractice: false,
      physicalDisability: false,
      medicationTaken: false,
      spiritualSessionsTaken: false,
      married: false,
      specialization: ''
    },
  });

  useEffect(() => {
    if (user && id !== undefined) {
      reset({ ...user });
    }
  }, [user]);

  const { mutate, isError, isLoading } = useMutation(
    (data) =>
      client(`${id ? `users/${id}` : `users`} `, {
        method: 'POST',
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`user_${id}`);
        successWithCustomMessage("updated_success_msg");
      },
      onError: (error) => {
        setBackendErrors(error.response.data.errors);
      },
    }
  );

  const onSubmitForm = ({
    subscribeNewsletter,
    meditationPractice,
    exercisePractice,
    physicalDisability,
    medicationTaken,
    spiritualSessionsTaken,
    married,
    specialization
  }) => {
    const formData = new FormData();
    formData.append("subscribeNewsletter", subscribeNewsletter)
    formData.append("meditationPractice", meditationPractice)
    formData.append("exercisePractice", exercisePractice)
    formData.append("physicalDisability", physicalDisability)
    formData.append("medicationTaken", medicationTaken)
    formData.append("spiritualSessionsTaken", spiritualSessionsTaken)
    formData.append("married", married)
    formData.append("specialization", specialization)
    mutate(formData);
  };


  let checkBoxes = [
    'subscribeNewsletter',
    'meditationPractice',
    'exercisePractice',
    'physicalDisability',
    'medicationTaken',
    'spiritualSessionsTaken',
    'married'
  ];

  if (fetchLoading) return <ModalSpinner />

  return (
    <>
      <StyledBox>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography fontWeight='800'>
              <FormattedMessage id="firstName" />
            </Typography>
            <Typography sx={{
              color: "grey",
            }}>
              {user.firstName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight='800'>
              <FormattedMessage id="lastName" />
            </Typography>
            <Typography sx={{
              color: "grey",
            }}>
              {user.lastName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight='800'>
              <FormattedMessage id="gender" />
            </Typography>
            <Typography sx={{
              color: "grey",
            }}>
              {user.gender.label}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight='800'>
              <FormattedMessage id="dateOfBirth" />
            </Typography>
            <Typography sx={{
              color: "grey",
            }}>
              {fDate(user.dateOfBirth)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight='800'>
              <FormattedMessage id="email" />
            </Typography>
            <Typography sx={{
              color: "grey",
            }}>
              {user.email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight='800'>
              <FormattedMessage id="phone_number" />
            </Typography>
            <Typography sx={{
              color: "grey",
            }}>
              <span dir="ltr">

                {user.phoneNumber}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </StyledBox>
      <StyledBox mt={2}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Grid container>
            {checkBoxes.map(checkbox =>
              <Grid item xs={6} key={checkbox}>
                <CustomCheckbox control={control} label={checkbox} name={checkbox} />
              </Grid>
            )}
            <Grid item xs={12} mt={2}>
              <CustomInput label='specialization' name='specialization' control={control} errors={errors} />
            </Grid>
          </Grid>
          <SubmitLayout isLoading={isLoading} isDisabled={!isDirty} label={id !== undefined ? 'update' : 'save'} cancelAction={() => navigate(-1)} />
        </form>
      </StyledBox>
    </>
  )
}