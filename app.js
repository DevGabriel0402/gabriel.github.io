// Função para enviar os dados do formulário para o Google Sheets
function enviarDadosParaGoogleSheets() {
  // Capturar os dados do formulário
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let mensagem = document.getElementById("areaTexto").value;

  // Autenticação e configuração da API do Google Sheets
  gapi.client
    .init({
      apiKey: "AIzaSyCVHuC9hDmlev9g5JcHYCpcNcSDOjOm0No",
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
      ],
    })
    .then(
      function () {
        // Loop para criar uma nova linha na planilha
        for (var i = 0; i < 1; i++) {
          // Defina o número de linhas a serem adicionadas (1 neste exemplo)
          // Chamar a API do Google Sheets para inserir uma nova linha
          gapi.client.sheets.spreadsheets.values
            .append({
              spreadsheetId: "1pmWU-o7xVsWPSPxc66_Pdq-nu8L4M09mjPJNGZQi6c0",
              range: "dados!A1:C1", // Intervalo para adicionar os dados (ajuste conforme necessário)
              valueInputOption: "USER_ENTERED",
              resource: {
                values: [[nome, email, mensagem]],
              },
            })
            .then(
              function (response) {
                console.log("Nova linha adicionada no Google Sheets!");
              },
              function (error) {
                console.error(
                  "Erro ao adicionar nova linha no Google Sheets:",
                  error.result.error.message
                );
              }
            );
        }
      },
      function (error) {
        console.error("Erro ao inicializar a API do Google Sheets:", error);
      }
    );
}
