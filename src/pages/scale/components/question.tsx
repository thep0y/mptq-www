import { CheckList } from 'antd-mobile'
import { CheckCircleFill } from 'antd-mobile-icons'
import type { CheckListValue } from 'antd-mobile/es/components/check-list'
import './index.scss'

interface QuestionProps {
  index: number
  title: string
  selected?: number
  handleChange: (v: number) => void
  options: Option[]
  useIndex?: boolean
  prefix?: string[]
}

const Question = ({
  index,
  title,
  selected,
  handleChange,
  options,
  useIndex = true,
  prefix,
}: QuestionProps) => {
  const onChange = (val: CheckListValue[]) => {
    // 禁止取消选择
    if (val.length === 0) return

    const v = val[0]

    if (typeof v === 'string') {
      throw Error(`不正确的类型：${v} -> string`)
    }

    handleChange(v)
  }

  return (
    <div className="question">
      <div className="title">
        <span>{index + 1 + '. ' + title}</span>
      </div>

      <div>
        <CheckList
          value={selected !== undefined ? [selected] : []}
          onChange={onChange}
          activeIcon={<CheckCircleFill />}
        >
          {options.map((v, i) => (
            <CheckList.Item key={i} value={useIndex ? i : v.point}>
              {(prefix ? prefix[i] + '. ' : '') + v.text}
            </CheckList.Item>
          ))}
        </CheckList>
      </div>
    </div>
  )
}

export default Question
