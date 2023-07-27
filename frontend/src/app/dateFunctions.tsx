export const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export function getToday() {
  return "2020-10-01";
}

export function formataMes(isoMes: string) {
  const [ano, mes] = isoMes.split("-");

  return `${MESES[parseInt(mes) - 1]} de ${ano}`;
}