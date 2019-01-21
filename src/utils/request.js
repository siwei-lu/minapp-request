// @flow
export const _wrapApi = (name: string) => (option: string) =>
  new Promise((res, rej) =>
    wx[name]({...option,
      success: res,
      fail: rej,
    })
  )

const _request = _wrapApi('request')
const _download = _wrapApi('downloadFile')
const _upload = _wrapApi('uploadFile')

export const request = (option: Object) =>
  _request({...option,
    dataType: 'json',
  })

export const download = (option: Object) => _download(option)
  .then(({ tempFilePath: data, ...resp }) => ({ ...resp, data }))

export const upload = (option: Object) => _upload(option)
  .then(({ data, ...resp }) => ({...resp,
    data: JSON.parse(data)
  }))