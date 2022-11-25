export const baseUrl = 'https://api.themoviedb.org'

export const ApiKey = '57309969f55d0b3d29084effa0d8081c'

export const imgUrl = 'https://image.tmdb.org/t/p'

export function poster(path){
    return (`https://image.tmdb.org/t/p/w500/${path}`)
}