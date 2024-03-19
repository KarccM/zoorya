import { Config } from "../../types/config";

export default {
  url: 'sliders',
  title: 'sliders',
  create: { label: 'create_slider', permission: "Slider.create" },
  update: { label: 'update_slider', permission: "Slider.update" },
  delete: { label: 'delete_slider', permission: "Slider.delete" },
  queryClient: { list: 'sliders', single: 'faq' },
} as Config