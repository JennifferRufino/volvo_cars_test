import React from 'react'
import Image from 'next/image'
import chevronCircled from '../../../docs/chevron-circled.svg'
import { Click, Flex } from 'vcc-ui'
import { CarModel } from '../../types/Car'

interface Props {
  sliderOffset: number
  setSliderOffset: Function
  list: CarModel[]
}

export const calculateNextPage = (
  sliderOffset: number,
  list: CarModel[]
): number => {
  const fullPages = Math.floor(list.length / 4) - 1
  const isHalfPage = list.length % 4 > 0 ? 1 : 0
  return sliderOffset === fullPages + isHalfPage ? 0 : sliderOffset + 1
}

export const calculatePreviousPage = (
  sliderOffset: number,
  list: CarModel[]
): number => {
  const fullPages = Math.floor(list.length / 4) - 1
  const isHalfPage = list.length % 4 > 0 ? 1 : 0
  return sliderOffset === 0 ? fullPages + isHalfPage : sliderOffset - 1
}

const SliderDesktop = ({
  sliderOffset,
  setSliderOffset,
  list,
}: Props): React.ReactElement => {
  const handleScrollRight = (): void => {
    const newPage = calculateNextPage(sliderOffset, list)
    setSliderOffset(newPage)
  }

  const handleScrollLeft = (): void => {
    const newPage = calculatePreviousPage(sliderOffset, list)
    setSliderOffset(newPage)
  }

  return (
    <Flex
      as="nav"
      extend={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        width: 'fit-content',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '0.5rem',
      }}
    >
      <Click
        extend={{
          width: '3rem',
          height: '3rem',
          borderRadius: '100px',
          transition: '0.3s',
        }}
        onClick={handleScrollLeft}
      >
        <Image
          src={chevronCircled}
          width="800"
          height="600"
          alt={'nav button'}
          style={{ transform: 'rotate(180deg)' }}
        />
      </Click>

      <Click
        extend={{
          width: '3rem',
          height: '3rem',
          borderRadius: '100px',
          border: '1px solid #141414',
          transition: '0.3s',
        }}
        onClick={handleScrollRight}
      >
        <Image
          src={chevronCircled}
          width="800"
          height="600"
          alt={'nav button'}
        />
      </Click>
    </Flex>
  )
}

export default SliderDesktop
