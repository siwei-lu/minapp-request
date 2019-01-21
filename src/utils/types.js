// @flow
export type Option = {
  url: string,
  method: string,
  data?: Object,
  header?: Object,
  filePath?: string,
  name?: string,
}

export type ExecFunc = (option: Option) => Promise<*>