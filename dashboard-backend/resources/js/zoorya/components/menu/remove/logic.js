const { mutate: handleRemoveClick, isLoading } = useMutation(({ id }) => client(`${config.url}/${id}`, { method: 'DELETE' }), {
  onSuccess: () => {
    queryClient.invalidateQueries(config.queryClientKeys.list);
    setIsOpen(false);
    successWithCustomMessage('delete_success_msg');
  },
  onError: (data) => {
    if (!data.success) {
      errorWithCustomMessage(data?.error);
    }
    setIsOpen(false);
  },
});
