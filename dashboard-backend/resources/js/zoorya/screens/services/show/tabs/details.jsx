import { useQuery } from 'react-query';
import { useClient } from '@/context/auth-context';
import { ModalSpinner } from '@/components/lib';
import config from '../../config';
import DetailsWithAvatar from '@/layouts/details/with.avatar';
import { useMatches } from 'react-router-dom';

export default function Details() {
  let matches = useMatches();
  const client = useClient();
  let bId = matches[matches.length - 1].params.id
  const { isLoading, data: service } = useQuery({
    queryKey: `${config.queryClient.single}_${bId}`,
    queryFn: () => client(`${config.url}/${bId}`).then((data) => data.data),
    enabled: !!bId
  });
  if (isLoading) return <ModalSpinner />
  let cells = [
    { title: 'title', content: service?.title, type: 'normal' },
    { title: 'content', content: service?.content, type: 'html' },
  ];
  return <>{service && <DetailsWithAvatar cells={cells} avatarUrl={service?.externalImageUrl} />}</>
}