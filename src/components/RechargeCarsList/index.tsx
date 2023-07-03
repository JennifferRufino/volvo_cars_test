import React, { useState } from 'react'
import Slider from '../Slider'
import CarCard from './CarCard'
import CarFilter from './CarFilter'
import { Block } from 'vcc-ui'
import { CarModel } from '../../types/Car'

interface Props {
  carsList: CarModel[]
}

const CarsList = ({ carsList }: Props): React.ReactElement => {
  const [filteredCars, setFilteredCars] = useState<CarModel[] | null>(null)

  const displayedList = filteredCars ? filteredCars : carsList

  return (
    <Block>
      <CarFilter carsList={carsList} setFilteredCars={setFilteredCars} />
      <Slider list={displayedList}>
        {displayedList.map(car => {
          return <CarCard car={car} key={car.id} />
        })}
      </Slider>
    </Block>
  )
}

export default CarsList
