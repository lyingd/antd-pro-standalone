// import { routerRedux } from 'dva/router'
import { message } from 'antd'

const error = (e, dispatch) => {
  if (e.response) {
    message.error(`请求错误，${e.message}`)
    if (e.name === 401) {
      dispatch({ type: 'login/logout' })
    }
    // if (e.name === 403) {
    //   dispatch(routerRedux.push('/exception/403'))
    //   return
    // }
    // if (e.name <= 504 && e.name >= 500) {
    //   dispatch(routerRedux.push('/exception/500'))
    //   return
    // }
    // if (e.name >= 404 && e.name < 422) {
    //   dispatch(routerRedux.push('/exception/404'))
    // }
  } else {
    message.error(e.message)
  }
}

export default error
