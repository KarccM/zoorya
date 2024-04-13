import { Config } from "../../types/config";

export default {
  url: 'categories',
  title: 'categories',
  create: { label: 'create_category', permission: "Category.create" },
  update: { label: 'update_category', permission: "Category.update" },
  delete: { label: 'delete_category', permission: "Category.delete" },
  queryClient: { list: 'categories', single: 'category' },
} as Config