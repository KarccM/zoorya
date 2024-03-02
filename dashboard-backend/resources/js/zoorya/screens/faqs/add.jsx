import Form from './partials/form';
import FormLayout from '@/layouts/FormLayout';
import config from './config';

export default function Edit() {
  return <FormLayout form={<Form />} label={config.create.label} />
}