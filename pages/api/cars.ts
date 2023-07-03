import { NextApiRequest, NextApiResponse } from 'next'
import carList from './data/cars.json'
import { CarModel } from '../../src/types/Car'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rechargeCarsList = carList as CarModel[]
    res.status(200).json(rechargeCarsList)
  } catch (err) {
    res.status(500).send(err)
  }
}

export default handler
