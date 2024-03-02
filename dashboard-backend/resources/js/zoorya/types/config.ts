export interface Config {
  url: string,
  title?: string,
  create: {
    label: string,
    permission: string,
  },
  update: {
    label: string,
    permission: string,
  },
  delete: {
    label: string,
    permission: string,
  },
  show?: {
    label: string,
    permission: string,
  },
  queryClient: {
    single: string,
    list: string,
  }
}