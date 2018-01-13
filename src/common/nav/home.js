import React from 'react'
import Route from 'src/components/Route'

export default
  <Route menu={false} name="首页" path="/" layout="BasicLayout" models={['/user', '/login']} page={() => import('../../layouts/BasicLayout')}>
    <Route name="Dashboard" path="/dashboard" icon="dashboard">
      <Route name="分析页" path="/analysis" models={['/chart']} page="/Dashboard/Analysis" />
      <Route name="监控页" path="/monitor" models={['/monitor']} page="/Dashboard/Monitor" />
      <Route name="工作台" path="/workplace" models={['/project', '/activities', '/chart']} page="/Dashboard/Workplace" />
    </Route>
    <Route name="表单页" path="/form" icon="form">
      <Route name="基础表单" path="/basic-form" models={['/form']} page="/Forms/BasicForm" />
      <Route name="分步表单" path="/step-form" models={['/form']} page="/Forms/StepForm">
        <Route path="/info" models={['/form']} page="/Forms/StepForm/Step1" />
        <Route path="/confirm" models={['/form']} page="/Forms/StepForm/Step2" />
        <Route path="/result" models={['/form']} page="/Forms/StepForm/Step3" />
      </Route>
      <Route name="高级表单" path="/advanced-form" models={['/form']} page="/Forms/AdvancedForm" />
    </Route>
    <Route name="列表页" path="/list" icon="table">
      <Route name="查询表格" path="/table-list" models={['/rule']} page="/List/TableList" />
      <Route name="标准列表" path="/basic-list" models={['/list']} page="/List/BasicList" />
      <Route name="卡片列表" path="/card-list" models={['/list']} page="/List/CardList" />
      <Route name="搜索列表" path="/search" page="/List/List" >
        <Route name="搜索列表（项目）" path="/projects" models={['/list']} page="/List/Projects" />
        <Route name="搜索列表（应用）" path="/applications" models={['/list']} page="/List/Applications" />
        <Route name="搜索列表（文章）" path="/articles" models={['/list']} page="/List/Articles" />
      </Route>
    </Route>
    <Route name="详情页" path="/profile" icon="profile">
      <Route name="基础详情页" path="/basic" models={['/profile']} page="/Profile/BasicProfile" />
      <Route name="高级详情页" path="/advanced" models={['/profile']} page="/Profile/AdvancedProfile" />
    </Route>
    <Route name="结果" path="/result" icon="check-circle-o">
      <Route name="成功" path="/success" page="/Result/Success" />
      <Route name="失败" path="/fail" page="/Result/Error" />
    </Route>
    <Route name="异常" path="/exception" icon="warning">
      <Route menu={false} name="403" path="/403" page="/Exception/403" />
      <Route menu={false} name="404" path="/404" page="/Exception/404" />
      <Route menu={false} name="500" path="/500" page="/Exception/500" />
      <Route name="触发异常" path="/trigger" models={['/error']} page="/Exception/triggerException" />
    </Route>
  </Route>
