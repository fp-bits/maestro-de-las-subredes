# TrustIT // Subnet Master - con la traducción al ES de [Librebits](https://librebits.info)

*[Read in English](README.md)*

Una calculadora de subredes IPv4 interactiva, con modo de práctica — pensada
para hacer el subnetting *visible* en lugar de memorizado. Escribes una
dirección, arrastras el deslizador de prefijo, y ves en tiempo real cuáles
de los 32 bits pertenecen a la network y cuáles al host.

Forma parte de las herramientas de [TrustIT.ir](https://trustit.ir), junto a
Ping — una pequeña herramienta de mensajería anónima con el mismo lenguaje
visual inspirado en terminal.

## Qué hace

- **Modo Calculadora** — desglose completo de la subred (network, broadcast,
  subnet mask, wildcard mask, hosts usables, rango de hosts) además de la
  clasificación de la dirección (clase A–E, privada/pública/loopback/
  link-local/multicast).
- **Modo Práctica** — preguntas de subnetting generadas aleatoriamente en
  tres niveles de dificultad, con puntuación en vivo, contador de racha y
  récord de mejor racha.
- **Multiidioma** — inglés, persa y español, con un selector que cambia
  todos los textos *y*, en el caso del persa, invierte todo el layout a
  RTL, incluida la dirección en que se rellena el deslizador.

  - **Demo en vivo** — [TrustIT Subnet Master](https://trustit.ir/subnetting)

## Stack

Deliberadamente minimalista: **HTML, CSS y JavaScript puros. Sin framework,
sin paso de build, sin dependencias en tiempo de ejecución.** La única
petición externa es para dos Google Fonts.

Eso no era una limitación con la que había que lidiar — era precisamente la
idea. La herramienta tenía que vivir en un hosting cPanel compartido sin
backend, desplegarse en GitHub Pages sin configuración, y cargar al
instante en un móvil con conexión mediocre. Un framework y un bundler no
habrían aportado nada aquí.

## Cosas de las que estoy orgulloso por debajo

**La cuadrícula de bits está hecha a mano, no es una librería.** Cada
renderizado recorre los 32 bits de la dirección, calcula cada uno a partir
del entero IP con un desplazamiento de bits, y decide si es network u host
comparando su posición con el valor del CIDR. Es todo el concepto de
subnetting representado como 32 divs.

**El motor matemático de subredes es un pequeño engine, escrito y
verificado desde cero** — conversión IP ↔ entero de 32 bits, generación de
la máscara a partir de un prefijo CIDR mediante desplazamiento de bits
(`0xFFFFFFFF << (32 - cidr)`), y cálculo de network/broadcast/wildcard a
partir de ahí con AND/OR/NOT bit a bit simples. Casos límite como `/0`,
`/31` (punto a punto, 2 hosts usables) y `/32` (ruta de host, 1 dirección)
se gestionan de forma explícita en lugar de derivarse de una fórmula
genérica.

**El sistema i18n es un único objeto JS, no una librería.** Cada cadena
vive en un diccionario `I18N = { en: {...}, fa: {...}, es: {...} }`;
cambiar de idioma reasigna una variable `lang`, vuelve a ejecutar una
función que recorre cada elemento `data-i18n`, y cambia el `dir` del
`<html>`. El RTL no es una hoja de estilos aparte — son un puñado de
overrides `html[dir="rtl"]` superpuestos al mismo CSS, incluyendo invertir
la dirección en que se rellena el deslizador de CIDR para que visualmente
se rellene de derecha a izquierda, a juego con el sentido de lectura.

**El motor de preguntas normaliza respuestas, no solo cadenas de texto.**
Convierte los numerales persas a dígitos latinos antes de comparar, quita
espacios en blanco, y regenera un par IP/CIDR aleatorio nuevo (con rangos
de prefijo acordes a la dificultad) en cada pregunta, así que no repite
siempre los mismos escenarios.

## Ficheros

```
subnetting-master/
├── index.html      # markup + ganchos data-i18n
├── style.css       # tokens de diseño, layout, overrides RTL
├── script.js       # motor matemático de subredes, cuadrícula de bits, lógica del quiz, i18n
├── README.md       # README original, en inglés
└── README.es.md    # este fichero
```

## Por qué lo construí (el autor original)

La mayoría de calculadoras de subredes solo escupen números. Quería una en
la que el *razonamiento* estuviera en pantalla — donde arrastrar el
deslizador de prefijo y ver cómo se mueve el límite de color en la
cuadrícula de bits enseñe el concepto más rápido de lo que jamás lo haría
una tabla estática de longitudes de prefijo. El modo práctica existe por la
misma razón: leer la respuesta no es lo mismo que producirla tú mismo.

## Licencia

Haz lo que quieras con ello.

## Créditos

- **Autor original:** [Rahideh](https://github.com/Rahideh), creador de
  [TrustIT // Subnet Master](https://trustit.ir), la herramienta original
  en inglés y persa sobre la que se basa este proyecto. Gracias por
  compartirla con una licencia tan abierta.
- **Traducción al español:** [Librebits](https://librebits.info).
