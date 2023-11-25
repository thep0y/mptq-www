import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Collapse, Divider, NoticeBar, Popup } from 'antd-mobile'
import GradientLine from '../components/gradient-line'
import Radar from '../components/radar.tsx'
import { generateLinearColors, Color } from '~/utils'

interface SubdimensionInterpretationProps {
  close: () => void
  subdimensionInterpretations: NEOPiRSubdimensionInterpretation[]
  subdimensionResult: { [K in NEOPiRSubdimension]: NEOPiRResultItem }
}

const SubdimensionInterpretation = ({
  close,
  subdimensionInterpretations,
  subdimensionResult,
}: SubdimensionInterpretationProps) => {
  return (
    <Popup
      visible={subdimensionInterpretations.length > 0}
      showCloseButton
      onMaskClick={close}
      onClose={close}
    >
      <div style={{ marginTop: 40 }}>
        <Collapse accordion>
          {subdimensionInterpretations.map((sd) => (
            <Collapse.Panel
              key={sd.dimension}
              title={sd.name + '(' + sd.dimension + ')'}
            >
              <div style={{ marginBottom: '1rem' }}>{sd.description}</div>

              <Divider>得分</Divider>

              <GradientLine
                min={1}
                max={10}
                value={subdimensionResult[sd.dimension].transformRule.value}
                lowText={sd.low}
                highText={sd.high}
                colors={generateLinearColors(
                  new Color(0, 100, 50),
                  new Color(120, 100, 50),
                  3,
                )}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </Popup>
  )
}

const Result = () => {
  const location = useLocation()
  const {
    result,
    interpretation,
  }: { result: NEOPiRResult; interpretation: NEOPiRInterpretation } =
    location.state

  const [subProps, setSubProps] = useState<NEOPiRSubdimensionInterpretation[]>(
    [],
  )

  const closeSub = () => setSubProps([])

  return (
    <>
      <div
        id="chart"
        style={{ width: '100%', height: '20rem', position: 'relative' }}
      >
        {/*
        <RadarChart
          min={1}
          max={10}
          data={interpretation.dimensions.map((d) => ({
            item: d.name,
            value: result.dimensions[d.dimension].transformRule.value,
          }))}
          tickCount={6}
          nice={false}
        />
        */}

        <Radar
          data={interpretation.dimensions.map((d) => ({
            item: d.name,
            fields: {
              value: result.dimensions[d.dimension].transformRule.value,
            },
          }))}
          itemStyle={{
            fontSize: 14,
          }}
          scaleOption={{
            min: 1,
            max: 10,
            tickCount: 6,
          }}
        />
      </div>

      <div className="container">
        <NoticeBar
          wrap
          color="alert"
          content="不同的颜色不代表好坏程度，只是为了告诉您您的得分倾向于哪一侧。"
        />

        <Collapse>
          {interpretation.dimensions.map((d) => {
            const resultItem = result.dimensions[d.dimension]

            return (
              <Collapse.Panel
                key={d.dimension}
                title={d.name + '(' + d.dimension + ')'}
              >
                <div className="indent" style={{ marginBottom: '1rem' }}>
                  {d.description}
                </div>

                <Divider>得分</Divider>

                <GradientLine
                  min={1}
                  max={10}
                  value={resultItem.transformRule.value}
                  lowText={d.low}
                  highText={d.high}
                  colors={generateLinearColors(
                    new Color(0, 100, 50),
                    new Color(120, 100, 50),
                    3,
                  )}
                />

                <Button
                  onClick={() => setSubProps(d.subdimension_interpretations)}
                  size="small"
                  color="primary"
                  fill="outline"
                  style={{ float: 'right' }}
                >
                  查看子维度
                </Button>
              </Collapse.Panel>
            )
          })}
        </Collapse>

        <SubdimensionInterpretation
          close={closeSub}
          subdimensionInterpretations={subProps}
          subdimensionResult={result.subdimensions}
        />
      </div>
    </>
  )
}

export default Result
