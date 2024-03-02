import { QueryCache } from 'react-query';
import { errorWithCustomMessage } from './notifications';

export default async function errorHandler(error) {
  const queryCache = new QueryCache();
  if (error.response?.status === 401) {
    queryCache.clear();
  }
  if (error.response?.status === 419) location.reload()
  else if (error.response?.status !== 422) errorWithCustomMessage(error.response?.data?.message);
  throw error;
}