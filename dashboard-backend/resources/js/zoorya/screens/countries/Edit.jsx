import React from 'react';
import Form from './partials/Form';
import FormLayout from '@/layouts/FormLayout';
import config from './config';

export default function Edit() {
  return <FormLayout form={<Form />} label={config.update.label} />
}
