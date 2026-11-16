/**
 * Tokens de movimento (os poucos que se repetem). Medidos na referência por gravação
 * frame a frame (docs/motion-map.md) e ajustados ao nosso muro; valores em segundos.
 */
export const dur = {
  tap: 0.18, // feedback de controles
  reveal: 0.6, // revelações de título/conteúdo
  slide: 0.6, // troca de slide/aba
  frameIn: 0.38, // página encolhendo no quadro
  frameHold: 0.55,
  frameOut: 0.45,
}
export const gap = {
  item: 0.06, // entre itens escalonados
  link: 0.04, // cascata dos links do header
  word: 0.1, // palavras da frase de apoio
}
export const ease = {
  out: 'expo.out',
  inOut: 'power3.inOut',
  back: 'back.out(2)',
}
/** Intervalo do avanço automático do carrossel (medido ~3,3 s; mais tempo de leitura aqui). */
export const autoplayMs = 4200
