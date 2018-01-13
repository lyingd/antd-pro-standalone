import { delay } from 'roadhog-api-doc'
import fs from 'fs'
import path from 'path'

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true'

const proxy = fs.readdirSync(path.join(__dirname + '/mock'))
  .filter(file => file !== 'utils.js' && file.endsWith('.js'))
  .reduce((acc, file) => {
    const module = require('./mock/' + file)
    return {
      ...acc, 
      ...(module.default || module)
    }
  }, {})

console.log('所有代理接口：')
console.log(Object.keys(proxy))

export default noProxy ? {} : delay(proxy, 1000)
