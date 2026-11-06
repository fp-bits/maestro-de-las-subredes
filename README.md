# TrustIT // Subnet Master

*[Leer en español](README.es.md)*

An interactive IPv4 subnet calculator and practice tool — built to make
subnetting *visible* instead of memorized. Type an address, drag the prefix
slider, and watch which of the 32 bits belong to the network and which
belong to the host, live.

Part of the [TrustIT.ir](https://trustit.ir) toolset, alongside
Ping — a small anonymous-messaging tool with the same terminal-inspired
visual language.

## What it does

- **Calculator mode** — full subnet breakdown (network, broadcast, subnet
  mask, wildcard mask, usable hosts, host range) plus address classification
  (class A–E, private/public/loopback/link-local/multicast).
- **Practice mode** — randomly generated subnetting questions across three
  difficulty tiers, with live scoring, a streak counter, and a best-streak
  record.
- **Bilingual** — English and Persian, with a single toggle that swaps every
  string *and* flips the whole layout to RTL, including the direction the
  slider fills in.


  - **Live Preview** — [TrustIT Subnet Master](https://trustit.ir/subnetting)

## Stack

Deliberately minimal: **vanilla HTML, CSS, and JavaScript. No framework, no
build step, no dependencies at runtime.** The only external request is for
two Google Fonts.

That wasn't a limitation I was working around — it was the point. The tool
needed to live on shared cPanel hosting with zero backend, deploy to GitHub
Pages with zero configuration, and load instantly on a phone on a mediocre
connection. A framework and a bundler would have bought nothing here.

## Things I'm proud of under the hood

**The bit grid is hand-rolled, not a library.** Every render walks all 32
bits of the address, computes each one from the integer IP with a bit shift,
and decides network-vs-host by comparing its position to the CIDR value.
It's the whole concept of subnetting rendered as 32 divs.

**The subnet math is a small engine, written and verified from scratch** —
IP ↔ 32-bit integer conversion, mask generation from a CIDR prefix using bit
shifting (`0xFFFFFFFF << (32 - cidr)`), and network/broadcast/wildcard
derived from there with plain bitwise AND/OR/NOT. Edge cases like `/0`,
`/31` (point-to-point, 2 usable hosts), and `/32` (host route, 1 address)
are handled explicitly rather than falling out of a generic formula.

**The i18n system is one JS object, not a library.** Every string lives in
an `I18N = { en: {...}, fa: {...} }` dictionary; toggling language swaps a
`lang` variable, re-runs one function that walks every `data-i18n` element,
and flips `dir` on `<html>`. RTL isn't a separate stylesheet — it's a
handful of `html[dir="rtl"]` overrides layered on the same CSS, including
reversing the CIDR slider's fill direction so it visually fills right-to-left
to match the reading direction.

**The quiz engine normalizes answers, not just strings.** It converts
Persian numerals to Latin digits before comparing, strips whitespace, and
regenerates a fresh random IP/CIDR pair (with difficulty-appropriate prefix
ranges) for every question, so it doesn't recycle the same handful of
scenarios.

## Files

```
subnetting-master/
├── index.html   # markup + data-i18n hooks
├── style.css    # design tokens, layout, RTL overrides
├── script.js    # subnet math engine, bit grid, quiz logic, i18n
└── README.md
```

## Why I built it

Most subnet calculators just spit out numbers. I wanted one where the
*reasoning* is on screen — where dragging the prefix slider and watching
the color boundary move across the bit grid teaches the concept faster than
a static chart of prefix lengths ever could. The quiz mode exists for the
same reason: reading the answer is not the same as producing it yourself.

## License

Do whatever you want with it.

## author

[Rahideh](https://github.com/Rahideh)
