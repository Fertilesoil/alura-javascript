const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");

focoBtn.onclick = () => {
  alterarContexto("foco");
}

curtoBtn.onclick = () => {
  alterarContexto("descanso-curto");
}

longoBtn.onclick = () => {
  alterarContexto("descanso-longo");
}

const alterarContexto = (contexto) => {
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
}