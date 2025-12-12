import { faker } from '@faker-js/faker'
import { type RatingData } from '../types/entities/rating'

export const createMockedRatingData = (): RatingData => ({
  rating: faker.number.float(5),
  reviews: faker.number.int(10000),
})
