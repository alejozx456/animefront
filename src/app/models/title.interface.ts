export interface TitleModel{

  anner: string
  debut: string
  episodes: Episode[]
  genres: string[]
  id: string
  poster: string
  rating: string
  synopsis: string
  title: string
  type: string
}

export interface Episode {
  anime: string
  id: number
  image_preview: string
}
