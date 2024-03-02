import { Config } from "../../types/config";

const config: Config = {
  url: 'countries',
  title: 'countries',
  create: {
    label: 'create_new_country',
    permission: "CREATE_COUNTRY"
  },
  update: {
    label: 'update_country',
    permission: "UPDATE_COUNTRY"
  },
  delete: {
    label: 'delete_country',
    permission: "DELETE_COUNTRY"
  },
  show: {
    label: 'show_country',
    permission: "SHOW_COUNTRY"
  },
  queryClient: {
    list: 'countries',
    single: 'country'
  },
}

export default config;