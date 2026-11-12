/**
 * Mídias externas usadas nas seções inspiradas na página oficial do Spotify Premium.
 * Ficam centralizadas aqui para serem trocadas por arquivos próprios
 * (ex.: o vídeo gerado no Google Flow em public/videos/) sem mexer nos componentes.
 */
const CDN = 'https://wwwmarketing.scdn.co'

export const heroVideo = {
  desktop: `${CDN}/video/voyager/brazil/HERO_16x9.mp4`,
  mobile: `${CDN}/video/voyager/brazil/HERO_9x16.mp4`,
  poster: `${CDN}/static/images/premium/voyager/brazil/hero-mobile-poster.jpg`,
}

export const moments = [
  { src: `${CDN}/static/images/premium/voyager/brazil/Reel_Mobile_Image1.jpg`, caption: 'Luísa Sonza homenageia Marília Mendonça em um show especial de tributo.', alt: 'Cantora no palco diante de um estádio lotado iluminado por lanternas de celulares' },
  { src: `${CDN}/static/images/premium/voyager/brazil/Reel_Mobile_Image2.jpg`, caption: 'MC Hariel comemorando o lançamento do álbum Eh Noiz ki Tá.', alt: 'Artista segurando uma corrente com medalhão dourado sob luz azul' },
  { src: `${CDN}/static/images/premium/voyager/brazil/Reel_Mobile_Image3.jpg`, caption: 'AJULLIACOSTA se apresenta no EQUAL DAY no Brasil.', alt: 'Cantora no palco com dançarinos sob luz verde e névoa' },
  { src: `${CDN}/static/images/premium/voyager/brazil/Reel_Mobile_Image4.jpg`, caption: 'Matchola se apresenta no Video Sessions.', alt: 'Artista cantando em um palco de madeira com luz quente, visto de cima' },
  { src: `${CDN}/static/images/premium/voyager/brazil/Reel_Mobile_Image5.jpg`, caption: 'Luedji Luna na celebração especial do Spotify para o Grammy Latino.', alt: 'Cantora sorrindo com o queixo apoiado na mão em um lounge com luz verde' },
]

/** Logo do Spotify como máscara (círculo com as três barras vazadas). */
const LOGO_PATH =
  'M84 0a84 84 0 1 0 0 168A84 84 0 0 0 84 0Zm38.5 121.2a5.2 5.2 0 0 1-7.2 1.7c-19.7-12-44.4-14.7-73.6-8.1a5.2 5.2 0 1 1-2.3-10.2c31.9-7.3 59.3-4.2 81.4 9.3a5.2 5.2 0 0 1 1.7 7.3Zm10.3-22.8a6.5 6.5 0 0 1-9 2.1c-22.5-13.8-56.8-17.8-83.4-9.8a6.5 6.5 0 1 1-3.8-12.5c30.4-9.2 68.2-4.8 94 11.1a6.5 6.5 0 0 1 2.2 9.1Zm.9-23.8C106.7 58.6 62.2 57.1 36.4 65a7.8 7.8 0 1 1-4.5-15c29.6-9 78.8-7.2 109.8 11.2a7.8 7.8 0 0 1-8 13.4Z'
export const logoMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168"><path d="${LOGO_PATH}"/></svg>`,
)}")`
export { LOGO_PATH }
