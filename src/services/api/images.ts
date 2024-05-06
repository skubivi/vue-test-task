import { IMAGES_URL } from '../const/images'
import type { TImagesData } from '../types/images'

export const fetchImages = async () => {
  let result: TImagesData = { hits: [] }
  try {
    const response = await fetch(IMAGES_URL)
    result = await response.json()
  } catch (error) {
    console.error(error)
  }
  return result
}
