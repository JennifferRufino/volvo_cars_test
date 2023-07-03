import React, { useEffect, useMemo, useState } from 'react'
import { SelectInput, Block } from 'vcc-ui'
import { CarModel } from '../../types/Car'

interface Props {
  carsList: CarModel[]
  setFilteredCars: Function
}

const CarFilter = ({
  carsList,
  setFilteredCars,
}: Props): React.ReactElement => {
  const [inputValue, setInputValue] = useState<string>('')

  const getBodyTypes = (carsList: CarModel[]): string[] => {
    const bodyTypesList: string[] = []
    carsList.forEach(car => {
      if (!bodyTypesList.includes(car.bodyType)) {
        bodyTypesList.push(car.bodyType)
      }
    })
    return bodyTypesList
  }

  const bodyTypes = useMemo(() => getBodyTypes(carsList), [carsList])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setInputValue(value)
  }

  useEffect(() => {
    if (!inputValue) {
      setFilteredCars(null)
      return
    }

    const newList = carsList.filter(car => car.bodyType === inputValue)
    setFilteredCars(newList)
  }, [inputValue, carsList, setFilteredCars])

  return (
    <Block extend={{ maxWidth: '600px', margin: '1rem auto' }}>
      <SelectInput
        onChange={handleChange}
        label={'Body Type'}
        value={inputValue}
        description="filter by body type"
      >
        <option value={''}>All</option>
        {bodyTypes.map(type => {
          return (
            <option value={type} key={type}>
              {type}
            </option>
          )
        })}
      </SelectInput>
    </Block>
  )
}

export default CarFilter
