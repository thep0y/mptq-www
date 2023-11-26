import { NavBar, NoticeBar } from 'antd-mobile'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import suspense from '~/advance/suspense'
import {
  LazySCL90Result,
  Lazy16pfResult,
  LazyCommonResult,
  LazyYbocsResult,
  LazyEPTResult,
  LazyEpqRscResult,
  LazyNeoPiRResult,
  LazyFooter,
} from '~/pages'
import './index.scss'

export const WARNING =
  '本测试结果仅供参考，不提供医疗建议，如果你确实感到不适可参考本结果去精神专科医院咨询心理医生。'

const Result = () => {
  const { path } = useParams() as { path: Path }
  const location = useLocation()
  const navigate = useNavigate()

  const render = () => {
    if (path === 'scl90') {
      return <LazySCL90Result />
    }

    if (path === '16pf') {
      return <Lazy16pfResult />
    }

    if (path === 'y_bocs') {
      return <LazyYbocsResult />
    }

    if (path === 'ept') {
      return <LazyEPTResult />
    }

    if (path === 'epq_rsc') {
      return <LazyEpqRscResult />
    }

    if (path === 'neo_pi_r') {
      return <LazyNeoPiRResult />
    }

    return <LazyCommonResult />
  }

  return (
    <div className="main">
      <NavBar
        backArrow={<HomeOutlined />}
        onBack={() => navigate('/', { replace: true })}
      >
        {location.state.name + '结果'}
      </NavBar>

      <NoticeBar
        wrap
        color="info"
        style={{ marginBottom: '1rem' }}
        content="您的测试结果本网站不会保存，如果需要保存请截图。"
      />

      {suspense(render())}

      {suspense(<LazyFooter />)}
    </div>
  )
}

export default Result
