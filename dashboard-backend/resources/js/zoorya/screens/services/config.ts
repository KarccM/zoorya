import { Config } from "../../types/config";

export default {
  url: 'services',
  title: 'services',
  create: { label: 'create_service', permission: "Service.create" },
  update: { label: 'update_service', permission: "Service.update" },
  delete: { label: 'delete_service', permission: "Service.delete" },
  queryClient: { list: 'services', single: 'service' },
} as Config