import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { NavBar, Button, Modal, ImageViewer, Space, Image } from 'antd-mobile'
import type { ButtonProps } from 'antd-mobile'
import Alipay from '~/assets/alipay.webp'
import Wechat from '~/assets/wechat.webp'
import './index.scss'

interface NavProps {
  title: string
  backArrow?: boolean | ReactNode
  showDonateOnLoad?: boolean
  onBack?: () => void
  className?: string
  buttonFill?: ButtonProps['fill']
}

const Nav = ({
  title,
  backArrow = false,
  showDonateOnLoad = false,
  onBack,
  className,
  buttonFill = 'none',
}: NavProps) => {
  const [showDonateState, setShowDonateState] = useState(showDonateOnLoad)
  const [imageViewer, setImageViewer] = useState<string | null>(null)

  useEffect(() => {
    if (!showDonateState) return

    Modal.alert({
      content: (
        <div id="donate">
          <div className="indent" style={{ marginBottom: 12 }}>
            <div style={{ marginBottom: 10 }}>
              如果此次测试对您有帮助，请考虑捐赠一定的金额用于本网站的开发和维护。捐赠全凭个人意愿，不捐赠您也可以使用。
            </div>
            <div>关闭此窗口后您可以点击网页右上角的“捐款”按钮重新打开。</div>
          </div>
          <Space align="center" justify="center">
            <Image
              src={Alipay}
              width="100%"
              onClick={() => setImageViewer(Alipay)}
            />
            <Image
              src={Wechat}
              width="100%"
              onClick={() => setImageViewer(Wechat)}
            />
          </Space>
        </div>
      ),
      closeOnMaskClick: true,
      confirmText: '关闭',
      afterClose: () => setShowDonateState(false),
    })
  }, [showDonateState])

  return (
    <>
      <NavBar
        backArrow={backArrow}
        onBack={onBack}
        className={className}
        right={
          <Button
            color="primary"
            fill={buttonFill}
            size="mini"
            onClick={() => setShowDonateState(true)}
          >
            捐款
          </Button>
        }
      >
        {title}
      </NavBar>

      {showDonateOnLoad || showDonateState ? (
        <ImageViewer
          image={imageViewer!}
          visible={imageViewer !== null}
          onClose={() => {
            setImageViewer(null)
          }}
        />
      ) : null}
    </>
  )
}

export default Nav
