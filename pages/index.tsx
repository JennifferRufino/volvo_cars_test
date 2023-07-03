import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { View, Text } from 'vcc-ui'
import RechargeCarList from '../src/components/RechargeCarsList'
import { CarModel } from '../src/types/Car'

const Home = (): React.ReactElement => {
  const [error, setError] = useState<boolean>(false)
  const [rechargeCarsList, setRechargeCarsList] = useState<CarModel[]>([])

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get<CarModel[]>('/api/cars')
        setRechargeCarsList(data)
      } catch (err) {
        setError(true)
      }
    }

    fetchCars()

    return () => {}
  }, [])

  if (error) {
    return (
      <View>
        <Text>
          Desculpe, tente novamente.
        </Text>
      </View>
    )
  }

  return (
    <View>
      <RechargeCarList carsList={rechargeCarsList} />
    </View>
  )
}

export default Home
