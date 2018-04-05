import React from 'react'
import Route from 'src/components/Route'

export default (
  <Route
    menu={false}
    name="首页"
    path="/"
    layout="BasicLayout"
    models={['/user', '/login']}
    page={() => import('src/layouts/BasicLayout')}
  >
    <Route name="Dashboard" path="/dashboard" icon="dashboard">
      <Route
        name="分析页"
        path="/analysis"
        models={['/chart']}
        page={() => import('src/pages/Dashboard/Analysis')}
      />
      <Route
        name="监控页"
        path="/monitor"
        models={['/monitor']}
        page={() => import('src/pages/Dashboard/Monitor')}
      />
      <Route
        name="工作台"
        path="/workplace"
        models={['/project', '/activities', '/chart']}
        page={() => import('src/pages/Dashboard/Workplace')}
      />
    </Route>
    <Route name="表单页" path="/form" icon="form">
      <Route
        name="基础表单"
        path="/basic-form"
        models={['/form']}
        page={() => import('src/pages/Forms/BasicForm')}
      />
      <Route
        name="分步表单"
        path="/step-form"
        models={['/form']}
        page={() => import('src/pages/Forms/StepForm')}
      >
        <Route
          path="/info"
          models={['/form']}
          page={() => import('src/pages/Forms/StepForm/Step1')}
        />
        <Route
          path="/confirm"
          models={['/form']}
          page={() => import('src/pages/Forms/StepForm/Step2')}
        />
        <Route
          path="/result"
          models={['/form']}
          page={() => import('src/pages/Forms/StepForm/Step3')}
        />
      </Route>
      <Route
        name="高级表单"
        path="/advanced-form"
        models={['/form']}
        page={() => import('src/pages/Forms/AdvancedForm')}
      />
    </Route>
    <Route name="列表页" path="/list" icon="table">
      <Route
        name="查询表格"
        path="/table-list"
        models={['/rule']}
        page={() => import('src/pages/List/TableList')}
      />
      <Route
        name="标准列表"
        path="/basic-list"
        models={['/list']}
        page={() => import('src/pages/List/BasicList')}
      />
      <Route
        name="卡片列表"
        path="/card-list"
        models={['/list']}
        page={() => import('src/pages/List/CardList')}
      />
      <Route name="搜索列表" path="/search" page={() => import('src/pages/List/List')}>
        <Route
          name="搜索列表（文章）"
          path="/articles"
          models={['/list']}
          page={() => import('src/pages/List/Articles')}
        />
        <Route
          name="搜索列表（项目）"
          path="/projects"
          models={['/list']}
          page={() => import('src/pages/List/Projects')}
        />
        <Route
          name="搜索列表（应用）"
          path="/applications"
          models={['/list']}
          page={() => import('src/pages/List/Applications')}
        />
      </Route>
    </Route>
    <Route name="详情页" path="/profile" icon="profile">
      <Route
        name="基础详情页"
        path="/basic"
        models={['/profile']}
        page={() => import('src/pages/Profile/BasicProfile')}
      />
      <Route
        name="高级详情页"
        path="/advanced"
        models={['/profile']}
        page={() => import('src/pages/Profile/AdvancedProfile')}
      />
    </Route>
    <Route name="结果页" path="/result" icon="check-circle-o">
      <Route name="成功" path="/success" page={() => import('src/pages/Result/Success')} />
      <Route name="失败" path="/fail" page={() => import('src/pages/Result/Error')} />
    </Route>
    <Route name="异常页" path="/exception" icon="warning">
      <Route name="403" path="/403" page={() => import('src/pages/Exception/403')} />
      <Route name="404" path="/404" page={() => import('src/pages/Exception/404')} />
      <Route name="500" path="/500" page={() => import('src/pages/Exception/500')} />
      <Route
        menu={false}
        name="触发异常"
        path="/trigger"
        models={['/error']}
        page={() => import('src/pages/Exception/triggerException')}
      />
    </Route>
  </Route>
)
