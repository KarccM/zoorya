import { Config } from "../../types/config";

export default {
  url: 'faqs',
  title: 'faqs',
  create: { label: 'create_faq', permission: "Faq.create" },
  update: { label: 'update_faq', permission: "Faq.update" },
  delete: { label: 'delete_faq', permission: "Faq.delete" },
  queryClient: { list: 'faqs', single: 'faq' },
} as Config