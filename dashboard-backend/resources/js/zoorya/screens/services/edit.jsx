import Form from './partials/form';
import FormLayout from '@/layouts/FormLayout';
import config from './config';

export default function EditService() {
  return <FormLayout form={<Form />} label={config.update.label} />
}
