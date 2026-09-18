# Remedia Já — App Mobile

App do cuidador (cadastra remédios) e do idoso (recebe e confirma o alarme).
Expo + React Native + TypeScript, seguindo `software-house-standards`.

## Como rodar localmente

1. `cp .env.example .env` e ajuste `API_URL` para o backend local
   (`remedia-ja-backend` rodando em `http://localhost:3001`).
2. `npm install`
3. `npx expo start` — abra no Expo Go ou num emulador Android/iOS.

## Decisões importantes

- **Alarme local + servidor**: o alarme é agendado localmente
  (`expo-notifications`) para disparar mesmo sem rede no horário exato;
  o backend reforça via push e é quem decide o escalonamento para o
  cuidador. Ver `ARCHITECTURE.md` do `remedia-ja-backend`.
- **Acessibilidade primeiro**: fontes grandes (`src/theme/tokens.ts`),
  alto contraste, um botão só na tela de alarme — antes de qualquer
  clichê visual de "app moderno". `ui-designer` deve tratar isso como
  restrição, não como sugestão.
- Login social (Google/Apple) ainda não está implementado nas telas —
  o backend também está com esse endpoint como `TODO`.

## Status deste scaffold

Telas e navegação básicas funcionando, lógica de agendamento/confirmação de
alarme implementada. Ainda faltam: `ui-designer` (revisão de identidade
visual completa), `qa-e2e-tester`, testes unitários das telas, e o fluxo
de login social.
