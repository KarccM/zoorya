import React from 'react';
import ReactTableV2 from '@/components/ReactTableV2';
import Form from './Form';
import queryString from 'query-string';
import ClickAwayModal from '@/components/ClickAwayModal';
import ModalTableLayout from '@/layouts/ModalTableLayout';
import { useParams } from 'react-router-dom';
import config from './config';
import { tableColumns } from './data';
import { useQuery } from 'react-query';
import { useClient } from '@/context/auth-context';
import { errorWithCustomMessage } from '@/utils/notifications';
import { readQueryParams } from '@/hooks/useFilter';


const Icons = () => {
  const { id: serviceId } = useParams()
  const [modal, setModal] = React.useState();
  const columns = React.useMemo(() => tableColumns, []);
  const client = useClient();

  const fetchDataOptions = readQueryParams();
  fetchDataOptions.ourService = serviceId;

  const { data: icons, isLoading } = useQuery(
    [config.queryClient.list, fetchDataOptions],
    () => client(`${config.url}?${queryString.stringify(fetchDataOptions)}`),
    {
      keepPreviousData: true,
      onError: () => {
        errorWithCustomMessage('failed_with_reload_msg');
      },
    }
  );

  let table = <ReactTableV2
    columns={columns}
    tableData={icons}
    isLoading={isLoading}
    isToolbar={false}
  />

  return (
    <ModalTableLayout table={table} config={config} openConfirmationModal={() => setModal(true)} breadcrumbs={false} >
      {modal &&
        <ClickAwayModal handleClose={() => setModal(false)} open={modal} >
          <Form cancel={() => setModal(false)} />
        </ClickAwayModal>}
    </ModalTableLayout>
  );
}

export default Icons;
