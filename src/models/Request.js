// @flow
import { type ExecFunc, type Option } from '../utils/types'
import { type Middleware } from '../utils/middleware'
import { encoded } from '../utils/url'
import execMid from '../utils/middleware'
import { request, download, upload } from '../utils/request'

export default class Request {
  _befores: Middleware[] = []
  _afters: Middleware[] = []
  _exec: ExecFunc = request

  async _do(option: Option) {
    await execMid(this._befores, option)

    const response = await this._exec(option)
    const ctx = { response, body: response.data }

    await execMid(this._afters, ctx)
    return ctx.body
  }

  _use(name: 'before' | 'after', wares: Middleware[]) {
    this[`_${name}`] = this[`_${name}`].concat(wares)
  }

  get(url: string, data?: Object, header?: Object) {
    url = encoded(url, data)
    return this._do({ url, header, method: 'GET' })
  }

  post(url: string, data: Object, header?: Object) {
    return this._do({ url, data, header, method: 'POST' })
  }

  put(url: string, data: Object, header?: Object) {
    return this._do({ url, data, header, method: 'PUT' })
  }

  delete(url: string, data?: Object, header?: Object) {
    url = encoded(url, data)
    return this._do({ url, header, method: 'DELETE' })
  }

  download(url: string, header?: Object) {
    this.exec(download)
    return this._do({ url, header, method: 'GET' })
  }

  upload(url: string, filePath: string, name = 'file', header?: Object) {
    this.exec(download)
    return this._do({ url, header, filePath, name })
  }

  exec(func: (option: Option, oldExec: ExecFunc) => Promise<*>) {
    this._exec = (option: Option) => func(option, this._exec)
  }

  before(...wares: Middleware[]) {
    this._use('before', wares)
  }

  after(...wares: Middleware[]) {
    this._use('after', wares)
  }
}