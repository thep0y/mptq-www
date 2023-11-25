import { useEffect, useState } from 'react'
import {
  SafeArea,
  List,
  Card,
  Tag,
  Ellipsis,
  Toast,
  NoticeBar,
  ErrorBlock,
} from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import { api, isPC } from '~/utils'
import suspense from '~/advance/suspense'
import { LazyFooter } from '~/pages'
import './index.scss'

const tagNames: Record<keyof Tag, string> = {
  info: 'primary',
  normal: 'success',
  warning: 'warning',
  error: 'danger',
}

const Index = () => {
  const navigate = useNavigate()

  const [error, setError] = useState<HttpError | null>(null)
  const [list, setList] = useState<ListItem[]>([])

  useEffect(() => {
    const getList = async () => {
      const data = await api<ListItem[]>('/list')

      if (data instanceof Error) {
        setError({ title: '网络请求异常', description: '无法从服务器获取数据' })
        return
      }

      setList(data)
    }

    getList()
  }, [])

  if (error) {
    return <ErrorBlock fullPage status="disconnected" {...error} />
  }

  const onHeaderClick = (path: string) => {
    navigate('/scale/' + path)
  }

  const onContentClick = () => {
    Toast.show('点击标题可进入测试')
  }

  if (isPC()) {
    Toast.show('本网站专为手机设计，在 PC 浏览器中效果可能不好。')
  }

  return (
    <div style={{ position: 'relative' }}>
      <SafeArea position="top" />

      <List className="list">
        {list.map((v) =>
          !v.disabled ? (
            <List.Item key={v.path} className="list__item">
              <Card
                title={v.name}
                extra={<RightOutline />}
                onHeaderClick={() => onHeaderClick(v.path)}
              >
                {v.warning ? (
                  <NoticeBar content={v.warning} wrap color="alert" />
                ) : null}

                <Ellipsis
                  className="introduction"
                  direction="end"
                  rows={3}
                  content={v.introduction}
                  expandText="展开"
                  collapseText="收起"
                  onContentClick={onContentClick}
                />
                <div className="tags">
                  {Object.keys(v.tags).map(
                    (k) =>
                      (v.tags[k as keyof Tag] as string[] | undefined)?.map(
                        (s, i) => (
                          <Tag key={i} round color={tagNames[k as keyof Tag]}>
                            {s}
                          </Tag>
                        ),
                      ),
                  )}
                </div>
              </Card>
            </List.Item>
          ) : null,
        )}
      </List>

      {suspense(<LazyFooter />)}
      <SafeArea position="bottom" />
    </div>
  )
}

export default Index
