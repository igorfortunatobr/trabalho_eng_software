/**
 * Função para baixar um arquivo a partir de um Blob ou dados binários.
 *
 * @param pdfInBase64 - conteúdo do pdf em string base64
 */
export const downloadPdf = (
  pdfInBase64: string,
  fileName: string = '',
): void => {
  const byteCharacters = atob(pdfInBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  window.open(url, '_blank');

  if (fileName) {
    // * Cria um elemento de link
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // * Define o nome do arquivo
    link.style.display = 'none'; // * Esconde o link

    // * Adiciona o link ao DOM
    document.body.appendChild(link);

    // * Dispara um evento de clique no link
    link.click();

    // * Remove o link do DOM
    document.body.removeChild(link);
  }
};
