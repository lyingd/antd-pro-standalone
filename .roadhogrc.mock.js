import { delay } from 'roadhog-api-doc'
import fs from 'fs'
import path from 'path'
import { proxy } from './mock/utils'

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true'

const mock = fs.readdirSync(path.join(__dirname + '/mock'))
  .filter(file => file !== 'utils.js' && file.endsWith('.js'))
  .reduce((acc, file) => {
    const module = require('./mock/' + file)
    let mocks = (module.default || module)
    const result = {}
    for(const key in mocks) {
      if(!proxy.is(mocks[key])){
        result[key] = mocks[key]
      }
    }
    return {
      ...acc,
      ...result,
    }
  }, {})

console.log('所有代理接口：')
console.log(Object.keys(mock))

export default noProxy ? {} : delay(mock, 1000)
