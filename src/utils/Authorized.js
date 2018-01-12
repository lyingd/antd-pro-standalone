import RenderAuthorized from 'ant-design-pro/lib/Authorized'
import { getAuthority } from './authority'

const Authorized = RenderAuthorized(getAuthority())
export default Authorized
