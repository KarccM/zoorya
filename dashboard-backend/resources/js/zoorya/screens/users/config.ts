import { Config } from "../../types/config";

const config: Config = {
  url: 'users',
  title: 'users',
  create: {
    label: 'create_user',
    permission: "User.create"
  },
  update: {
    label: 'update_user',
    permission: "User.update"
  },
  delete: {
    label: 'delete_user',
    permission: "User.delete"
  },
  queryClient: {
    list: 'faqs',
    single: 'user'
  },
}
export default config;