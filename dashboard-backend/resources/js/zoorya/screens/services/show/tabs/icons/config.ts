import { Config } from "../../../../../types/config";

const config:Config = {
  url: 'our-service-icons',
  title: 'service_icons',
  create: {
    label: 'create_new_service_icon',
    permission: "CREATE_OUR_SERVICE_ICON"
  },
  update: {
    label: 'update_service_icon',
    permission: "UPDATE_OUR_SERVICE_ICON"
  },
  delete: {
    label: 'delete_service_icon',
    permission: "DELETE_OUR_SERVICE_ICON"
  },
  show: {
    label: 'show_service_icon',
    permission: "SHOW_OUR_SERVICE_ICON"
  },
  queryClient: {
    list: 'service_icons',
    single: 'service_icon'
  },
}
export default config;