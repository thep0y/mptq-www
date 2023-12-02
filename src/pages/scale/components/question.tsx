import { CheckList } from 'antd-mobile'
import { CheckCircleFill } from 'antd-mobile-icons'
import type { CheckListValue } from 'antd-mobile/es/components/check-list'
import './index.scss'

type InferValueType<B extends boolean> = B extends true ? number[] : number

interface QuestionProps<M extends boolean> {
  index: number
  title: string
  selected?: InferValueType<M>
  handleChange: (v: InferValueType<M>) => void
  options: Option[]
  useIndex?: boolean
  prefix?: string[]
  multiple?: boolean
}

const Question = <M extends boolean>({
  index,
  title,
  selected,
  handleChange,
  options,
  useIndex = true,
  prefix,
  multiple,
}: QuestionProps<M>) => {
  const onChange = (val: CheckListValue[]) => {
    // 在单选时禁止空选择
    if (!multiple && val.length === 0) return

    if (!multiple) {
      const v = val[0]

      if (typeof v !== 'number') {
        throw Error(`不正确的类型：${v} -> string`)
      }

      handleChange(v as InferValueType<M>)
    } else {
      handleChange(val as InferValueType<M>)
    }
  }

  return (
    <div className="question">
      <div className="title">
        <span>{index + 1 + '. ' + title}</span>
      </div>

      <div>
        <CheckList
          value={
            selected !== undefined
              ? typeof selected === 'number'
                ? [selected]
                : selected
              : []
          }
          onChange={onChange}
          activeIcon={<CheckCircleFill />}
          multiple={multiple}
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

export type QuestionType = typeof Question

export default Question
