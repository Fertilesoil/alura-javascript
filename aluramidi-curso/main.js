const botoes = document.querySelectorAll(".tecla");

const tocarInstrumento = (instrumento) => {
  return document.querySelector(`#som_tecla_${instrumento}`).play();
}

botoes.forEach((botao) => {
  const instrumento = botao.classList[1].split("_")[1];
  botao.onclick = () => tocarInstrumento(instrumento);
  
  botao.onkeydown = (e) => {
    if (e.code === "Enter" || e.code === "Space") {
    botao.classList.toggle("ativa");
    }
  }

  botao.onkeyup = (e) => {
    if (e.code === "Enter" || e.code === "Space") {
    botao.classList.toggle("ativa");
    }
  }
});