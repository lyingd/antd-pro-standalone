import React, { PureComponent } from 'react'

const Route = ({
  children,
  name,
  icon,
  path,
  models,
  page,
  menu,
  auth,
  ...restProps
}) => (
  <PureComponent
    name={name}
    icon={icon}
    path={path}
    models={models}
    page={page}
    menu={menu}
    auth={auth}
    {...restProps}
  >{children}
  </PureComponent>
)

export default Route
