import React from "react"
import ReactTableV2 from '@/components/ReactTableV2';
import queryString from 'query-string';
import TableLayout from "@/layouts/TableLayout";
import { tableColumns } from './data';
import { useQuery } from 'react-query';
import config from './config';
import { useClient } from '@/context/auth-context';
import { readQueryParams } from '@/hooks/useFilter';
import { errorWithCustomMessage } from '@/utils/notifications';

export default function Faqs({ params, ...rest }) {
  const columns = React.useMemo(() => tableColumns, []);
  const client = useClient();

  let fetchDataOptions = readQueryParams()
  fetchDataOptions = { ...fetchDataOptions, ...params };

  const { data: faqs, isLoading } = useQuery(
    [config.queryClient.list, fetchDataOptions],
    () => client(`${config.url}?${queryString.stringify(fetchDataOptions)}`),
    {
      keepPreviousData: true,
      onError: () => {
        errorWithCustomMessage("failed_with_reload_msg");
      },
    }
  );

  let table = <ReactTableV2 columns={columns} tableData={faqs} isLoading={isLoading} isToolbar={false} />

  return (
    <TableLayout table={table} config={config} {...rest} />
  );
}
