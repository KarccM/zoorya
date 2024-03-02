import { Config } from "../../types/config";

const config: Config = {
  url: 'services',
  title: 'our_services',
  create: {
    label: 'create_new_service',
    permission: "Service.create"
  },
  update: {
    label: 'update_service',
    permission: "Service.update"
  },
  delete: {
    label: 'delete_service',
    permission: "Service.delete"
  },
  show: {
    label: 'show_service',
    permission: "Service.show"
  },
  queryClient: {
    list: 'services',
    single: 'service',
  },
}
export default config;