<div align="center">

<img src=".github/assets/banner.svg" alt="Spotify Premium, releitura: landing page em React e GSAP, versão 1.2" width="100%">

<br>

<img src="https://img.shields.io/badge/React-19-111111?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=ffe600" alt="React 19">
<img src="https://img.shields.io/badge/TypeScript-5-111111?style=for-the-badge&logo=typescript&logoColor=3178C6&labelColor=ffe600" alt="TypeScript 5">
<img src="https://img.shields.io/badge/Tailwind-4-111111?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&labelColor=ffe600" alt="Tailwind CSS 4">
<img src="https://img.shields.io/badge/GSAP-3-111111?style=for-the-badge&logo=greensock&logoColor=0AE448&labelColor=ffe600" alt="GSAP 3">
<img src="https://img.shields.io/badge/Vite-7-111111?style=for-the-badge&logo=vite&logoColor=646CFF&labelColor=ffe600" alt="Vite 7">

<br>

<sub>

**[Sobre](#-sobre)** &nbsp;·&nbsp; **[Destaques](#-destaques)** &nbsp;·&nbsp; **[Tecnologias](#-tecnologias)** &nbsp;·&nbsp; **[Rodando](#-rodando-localmente)** &nbsp;·&nbsp; **[Estrutura](#-estrutura)** &nbsp;·&nbsp; **[Versões](#-versões)**

</sub>

</div>

<br>

## ◆ Sobre

Releitura da landing page do **Spotify Premium (Brasil)**, feita como projeto de portfólio para mostrar front-end e movimento. Na versão **1.2**, a página vira um **muro de lambe-lambe**: cada oferta, recurso e plano é um cartaz colado sobre o anterior, com fita, cores fortes (rosa, amarelo e verde) e tipografia de cartaz (Anton e Archivo).

As decisões de design estão registradas em [`DESIGN.md`](DESIGN.md) e [`PRODUCT.md`](PRODUCT.md); o mapa do sistema de movimento está em [`docs/motion-map.md`](docs/motion-map.md).

## ◆ Destaques

- **Hero com o símbolo do Spotify em luz** e objetos animados que entram junto com o título
- **Letras-rolo** e blocos tipográficos que reagem à rolagem
- **Sistema de movimento** com GSAP (ScrollTrigger e SplitText) e rolagem suave com Lenis
- **Carrossel de benefícios e faixas** que respondem ao scroll
- **Planos, FAQ e chamadas finais** no mesmo estilo de cartaz
- **Acessível:** contraste revisado nos destaques e suporte a `prefers-reduced-motion`
- **Responsivo**, com animações que pausam fora da tela

## ◆ Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React 19 e TypeScript | Componentes e tipagem |
| Vite 7 | Servidor de desenvolvimento e build |
| Tailwind CSS 4 | Estilização e tokens de design |
| GSAP 3 | Animações e animações de scroll |
| Lenis | Rolagem suave |

## ◆ Rodando localmente

Requer Node.js 20 ou superior.

```bash
git clone https://github.com/gabrielnovaesdev/SpotifyRework.git
cd SpotifyRework
npm install
npm run dev       # http://localhost:5173
npm run build     # gera a versão de produção em dist/
npm run preview   # serve dist/ para conferência
```

## ◆ Estrutura

```text
├── index.html
├── public/                 Imagens, ícones e mídia
├── docs/                   Mapa de movimento e notas de revisão
├── tools/motion-recorder/  Grava o movimento da página para análise
└── src/
    ├── App.tsx             Montagem das seções
    ├── components/         Hero, Nav, Plans, Faq, Footer e demais seções
    ├── hooks/              Lenis, pausa fora da tela, salto de quadros
    ├── motion.ts           Sistema de movimento
    └── media.ts            Mídia usada pelas seções
```

## ◆ Versões

| Versão | O que é |
| --- | --- |
| **1.2** (esta, no `main`) | Releitura como muro de lambe-lambe, em React, TypeScript, Tailwind e GSAP |
| 1.1 | Reescrita em React e novas seções inspiradas na página do Premium (branch `v1.1-Teste`) |
| 1.0 | A primeira versão, em HTML, CSS e Bootstrap 3 (branch `v1.0`) |

## ◆ Aviso legal

Projeto feito apenas para estudo e portfólio, sem vínculo oficial com o Spotify. Marca, nome e identidade visual pertencem à **Spotify AB**.

<br>

<div align="center"><sub>Feito por <a href="https://github.com/gabrielnovaesdev">Gabriel Novaes</a></sub></div>
