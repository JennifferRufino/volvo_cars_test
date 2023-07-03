import React from 'react'
import { Click, Flex } from 'vcc-ui'
import { CarModel } from '../../types/Car'

interface Props {
  sliderOffset: number
  list: CarModel[]
  handleMobileScroll: Function
}

const SliderMobile = ({
  sliderOffset,
  list,
  handleMobileScroll,
}: Props): React.ReactElement => {
  return (
    <Flex
      as="nav"
      extend={{
        position: 'absolute',
        bottom: '1rem',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: '0.5rem',
      }}
    >
      {list.map(({ id }, i) => {
        const poistion = Math.floor(
          (sliderOffset + 100) / (window?.innerWidth * 0.8)
        )

        return (
          <Click
            extend={{
              width: '.75rem',
              height: '.75rem',
              borderRadius: '100px',
              transition: '0.3s',
              background: poistion === i ? '#141414' : '#ebebeb',
            }}
            onClick={() => handleMobileScroll(i)}
            key={id}
          ></Click>
        )
      })}
    </Flex>
  )
}

export default SliderMobile
