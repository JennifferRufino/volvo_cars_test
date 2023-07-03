import React, { useEffect, useRef, useState } from 'react'
import { Block, Flex } from 'vcc-ui'
import SliderDesktop from './SliderDesktop'
import SliderMobile from './SliderMobile'
import { CarModel } from '../../types/Car'

interface Props {
  list: CarModel[]
  children: JSX.Element[]
}

const Slider = ({ list, children }: Props): React.ReactElement => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  const [sliderOffset, setSliderOffset] = useState<number>(0)
  const [SSR, setSSR] = useState<boolean>(true)
  const listRef = useRef<HTMLUListElement>(null)
  const desktopLimit = 680

  const handleMobileScroll = (targetItem: number) => {
    if (!listRef.current) {
      return
    }
    setSliderOffset(targetItem)

    const gap = 16 * targetItem
    const itemWidth = window.innerWidth * 0.8 * targetItem
    const offset = gap + itemWidth

    listRef.current.scrollLeft = offset
  }

  const calculateOffset = () => {
    return sliderOffset === 1
      ? sliderOffset * window?.innerWidth - 32
      : sliderOffset * window.innerWidth - 64
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    setSSR(false)

    const handleResize = () => {
      const isWindowDesktop = window.innerWidth >= desktopLimit
      setIsDesktop(isWindowDesktop)
      setSliderOffset(0)
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {!SSR && (
        <Block
          as="section"
          extend={{
            position: 'relative',
            width: '100%',
            minHeight: 'fit-content',
            paddingBottom: '4rem',
            overflow: 'hidden',
          }}
        >
          <Flex
            as="ul"
            extend={{
              boxSizing: 'border-box',
              display: 'flex !important',
              flexDirection: 'row',
              gap: '1rem',
              width: '100%',
              padding: '1rem',
              paddingRight: '2rem',
              overflowX: 'scroll',
              transition: '0.3s ease-out',
              scrollbarWidth: 'none',

              '::-webkit-scrollbar': {
                display: 'none',
              },

              '@media (min-width: 680px)': {
                overflowX: 'visible',
                transform: `translateX(-${calculateOffset()}px)`,
              },
            }}
            onScroll={(e: React.UIEvent<HTMLElement>) =>
              setSliderOffset(e.currentTarget.scrollLeft)
            }
            ref={listRef}
          >
            {children.map((item, i) => {
              return (
                <Block
                  as="li"
                  extend={{
                    minWidth: '80vw',
                    width: '80vw',
                    '@media (min-width: 680px)': {
                      minWidth: 'calc(25vw - 24px)',
                      width: 'calc(25vw - 24px)',
                    },
                  }}
                  key={i}
                >
                  {item}
                </Block>
              )
            })}
          </Flex>
          {isDesktop ? (
            <SliderDesktop
              sliderOffset={sliderOffset}
              setSliderOffset={setSliderOffset}
              list={list}
            />
          ) : (
            <SliderMobile
              sliderOffset={sliderOffset}
              list={list}
              handleMobileScroll={handleMobileScroll}
            />
          )}
        </Block>
      )}
    </>
  )
}

export default Slider
