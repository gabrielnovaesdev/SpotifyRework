<div align="center">

# 🎵 Clone de Interface do Spotify

### Recriação da landing page do Spotify Premium — React, TypeScript, Tailwind CSS e GSAP

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-0AE448?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?style=flat-square&logo=github)](https://gabrielnovaesdev.github.io/Clone-de-Interface-do-Spotify/)
[![Uso](https://img.shields.io/badge/Uso-educacional-green?style=flat-square)](#-aviso-legal)

**[🚀 Ver Demo ao Vivo](https://gabrielnovaesdev.github.io/Clone-de-Interface-do-Spotify/)**

</div>

---

## 📋 Sobre o Projeto

O **Clone de Interface do Spotify** recria a landing page do Spotify Premium. A versão **1.1** reescreve o projeto (antes em HTML + Bootstrap 3) com uma stack atual e animações de scroll no estilo dos sites de produto modernos.

---

## ✨ Funcionalidades

- 🧈 **Smooth scroll** com Lenis, sincronizado ao ticker do GSAP
- 🎬 **Hero animado** — título revelado letra a letra (SplitText), capas de álbum com parallax de mouse e de scroll
- 🎠 **Carrossel infinito** de playlists que acelera e inclina conforme a velocidade do scroll
- 📌 **Seção "É fácil" fixa (pin)** — as telas do app trocam sincronizadas ao scroll, com snap entre etapas
- ✍️ **Texto que acende palavra por palavra** conforme a rolagem (scrub)
- 💳 **Cards de planos** com entrada em 3D e inclinação ao passar o mouse
- 💡 **Cards de benefícios** com spotlight que segue o cursor
- ❓ **FAQ em acordeão** com animação de altura via CSS grid
- 🟢 **CTA final** que se expande com clip-path no scroll e botão magnético
- 📱 **Responsivo** e com suporte a `prefers-reduced-motion`

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| React 19 + TypeScript | Componentes e tipagem |
| Vite 7 | Dev server e build |
| Tailwind CSS 4 | Estilização e design tokens |
| GSAP 3 (ScrollTrigger, SplitText) | Animações e scroll animations |
| Lenis | Smooth scroll |

---

## 🏗️ Estrutura do Projeto

```
├── index.html
├── public/imagens/        # Imagens e ícones
└── src/
    ├── App.tsx            # Montagem das seções
    ├── lib.ts             # Registro dos plugins GSAP e helpers
    ├── hooks/useLenis.ts  # Smooth scroll
    └── components/        # Nav, Hero, Marquee, Benefits, Showcase, Plans, Faq...
```

---

## ⚙️ Como Rodar Localmente

Requer Node.js 20+.

```bash
git clone https://github.com/gabrielnovaesdev/SpotifyRework.git
cd SpotifyRework
npm install
npm run dev        # abre em http://localhost:5173
```

Para gerar a versão de produção: `npm run build` (saída em `dist/`) e `npm run preview` para testá-la.

---

## 📚 Aprendizados

Durante o desenvolvimento foram aplicados e consolidados os seguintes conceitos:

- Estruturação semântica com **HTML5**
- Estilização avançada e layouts com **CSS3**
- Uso de **Bootstrap** para grid e componentes responsivos
- **Responsividade** para múltiplos dispositivos
- Componentes interativos do Bootstrap, como a navbar recolhível
- Organização de arquivos em projetos front-end
- Deploy com **GitHub Pages**
- Versionamento com **Git e GitHub**

---

## 👨‍💻 Desenvolvedor

<div align="center">

**Gabriel Novaes**

Estudante de Análise e Desenvolvimento de Sistemas (ADS) na UniCarioca.
Apaixonado por desenvolvimento web, mobile e inteligência artificial.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-gabrielnovaesdev-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/gabrielnovaesdev/)
[![GitHub](https://img.shields.io/badge/GitHub-gabrielnovaesdev-181717?style=flat-square&logo=github)](https://github.com/gabrielnovaesdev)

</div>

---

## 📄 Aviso Legal

Este projeto foi desenvolvido exclusivamente para fins educacionais e de aprendizado, sem qualquer vínculo oficial com o Spotify. Todos os direitos relacionados à marca, nome e identidade visual pertencem à **Spotify AB**.

---

<div align="center">
  Feito com dedicação por <a href="https://github.com/gabrielnovaesdev">Gabriel Novaes</a>
</div>
