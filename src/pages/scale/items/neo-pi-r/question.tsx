import { useState, useEffect } from 'react'
import suspense from '~/advance/suspense'
import { LazyQuestion } from '~/pages'

interface QuestionProps extends NEOPiRQuestion {
  value?: NEOPiRValue
  updateValues: (index: number, value: NEOPiRValue) => void
  index: number
}

const NEOPiRQuestion = ({
  title,
  dimension,
  subdimension,
  options,
  index,
  value,
  updateValues,
}: QuestionProps) => {
  const [selected, setSelected] = useState<number | undefined>(value?.point)

  useEffect(() => {
    setSelected(value?.point)
  }, [index, title, value])

  const handleChange = (optionIndex: number) => {
    setSelected(optionIndex)

    updateValues(index, {
      dimension,
      subdimension,
      point: options[optionIndex].point,
    })
  }

  return suspense(
    <LazyQuestion
      index={index}
      title={title}
      selected={selected}
      handleChange={handleChange}
      options={options}
      useIndex={false}
    />,
  )
}

export default NEOPiRQuestion
