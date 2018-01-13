import memoize from 'lodash/memoize'
import isArray from 'lodash/isArray'
import nav from './nav'

function innerFormatter(navDatas, parentPath = '', parentAuth) {
  return navDatas.reduce((acc, navData) => {
    const { name, path, children, auth,
      menu: isMenu = true, models, page, ...restProps } = navData.props
    const fullPath = `${parentPath}${path || ''}`.replace(/\/+/g, '/').replace(/^\//, '')
    const childDatas = children ? innerFormatter(isArray(children)
      ? children
      : isArray(children.type)
        ? children.type
        : [children], fullPath, auth) : null
    const ret = []
    if (isMenu) {
      const menuNode = {
        ...restProps,
        name,
        path: fullPath,
        authority: auth || parentAuth,
      }
      if (children) {
        menuNode.children = childDatas
      }
      ret.push(menuNode)
    } else if (children) {
      ret.push(...childDatas)
    }
    return [
      ...acc,
      ...ret,
    ]
  }, [])
}

// function formatter(data, parentPath = '', parentAuthority) {
//   return data.map((item) => {
//     const result = {
//       ...item,
//       path: `${parentPath}${item.path}`,
//       authority: item.authority || parentAuthority,
//     }
//     if (item.children) {
//       result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
//     }
//     return result
//   })
// }
const formatter = memoize(innerFormatter)

export const getMenuData = () => formatter(nav)
