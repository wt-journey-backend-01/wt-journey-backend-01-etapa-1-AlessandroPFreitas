const express = require("express");
const fs = require("fs");
const path = require("path");
const { send } = require("process");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "views", "index.html");
  res.status(200).type("html").sendFile(filePath);
});

app.get("/api/lanches", (req, res) => {
  const filePath = path.join(__dirname, "public", "data", "lanches.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Não foi possível ler o arquivo de lanches." });
    }
    const lanches = JSON.parse(data);
    res.json(lanches);
  });
});

app.get("/sugestao", (req, res) => {
  const nome = req.query.nome;
  const ingredientes = req.query.ingredientes;
  const html = `
  <html>
    <head>
      <title>Agradecimento</title>
      <style>
        /* Aqui você pode colocar estilos para o modal */
      </style>
    </head>
    <body>
      <div id="modal" style="display:block;">
        <h1>Obrigado pela sugestão, ${nome}!</h1>
        <p>Seu lanche: ${ingredientes}</p>
        <a href='/'>Voltar ao início</a>
      </div>
      <script>
        // Aqui você pode colocar o JavaScript do modal se quiser
      </script>
    </body>
  </html>
`;

  res.send(html);
});

app.get("/contato", (req, res) => {
  const filePath = path.join(__dirname, "views", "contato.html");
  res.status(200).type("html").sendFile(filePath);
});

app.post("/contato", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const assunto = req.body.assunto;
  const mensagem = req.body.mensagem;

  res.redirect(
    `/contato-recebido?nome=${nome}&email=${email}&assunto=${assunto}&mensagem=${mensagem}`
  );
});

app.get("/contato-recebido", (req, res) => {
  const nome = req.query.nome;
  const email = req.query.email;
  const assunto = req.query.assunto;
  const mensagem = req.query.mensagem;

  const html = `
  <html>
    <head>
      <title>Contato</title>
      <style>
        /* Aqui você pode colocar estilos para o modal */
      </style>
    </head>
    <body>
<h1>  ${nome}</h1>
<h1>  ${email}</h1>
<h1>  ${assunto}</h1>
<h1>  ${mensagem}</h1>
  <a href='/'>Voltar ao início!</a>
      <script>
        // Aqui você pode colocar o JavaScript do modal se quiser
      </script>
    </body>
  </html>
`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
