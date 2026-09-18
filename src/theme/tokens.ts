// Identidade visual do Remedia Já — 1 cor de marca + neutros calibrados,
// tipografia com escala grande por padrão (público idoso). Nunca usar
// valores fora desta escala direto num componente (ver ui-designer).
export const colors = {
  brand: '#0F6E5C', // verde-petróleo — transmite calma e saúde, não é o violeta padrão de template
  brandDark: '#0A4E41',
  background: '#FFFFFF',
  surface: '#F4F7F6',
  textPrimary: '#12241F',
  textSecondary: '#4B5D59',
  danger: '#B3261E',
  success: '#1E7B45',
  border: '#D9E2E0',
};

// Escala de fonte deliberadamente maior que o padrão de mercado — baixa
// visão é comum no público-alvo. O ui-designer deve tratar isto como piso,
// não teto.
export const fontSizes = {
  body: 20,
  label: 18,
  title: 28,
  alarmTitle: 40,
};

export const spacing = (multiplier: number) => multiplier * 8;
