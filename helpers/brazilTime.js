export function brazilTimeString() {
  return new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}
