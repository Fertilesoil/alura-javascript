const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBtn = document.querySelector("#start-pause span");
const imagemBtn = document.querySelector(".app__card-primary-button img");
const tempoNaTela = document.querySelector("#timer");

const musica = new Audio("/sons/luna-rise-part-one.mp3");
const iniciar = new Audio("/sons/play.wav");
const pausar = new Audio("/sons/pause.mp3");
const finalizado = new Audio("/sons/beep.mp3");
const startPauseBtn = document.querySelector("#start-pause");
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.onchange = () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
}

focoBtn.onclick = () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBtn.classList.toggle("active");
}

curtoBtn.onclick = () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBtn.classList.toggle("active");
}

longoBtn.onclick = () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBtn.classList.toggle("active");
}

const alterarContexto = (contexto) => {
  mostrarTempo();
  botoes.forEach(contexto => {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = ` 
      Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
      Que tal dar uma respirada? <br>
      <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
      Hora de voltar à superfície. <br>
      <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    finalizado.play();
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
}

startPauseBtn.onclick = () => iniciarOuPausar()

function iniciarOuPausar() {
  if (intervaloId) {
    pausar.play();
    zerar();
    return;
  }
  iniciar.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBtn.textContent = `Pausar`;
  imagemBtn.setAttribute("src", "imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBtn.textContent = `Começar`;
  imagemBtn.setAttribute("src", "imagens/play_arrow.png");
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();