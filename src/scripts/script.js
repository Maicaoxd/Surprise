// 1. SPOTIFY IFRAME API --------------------------------------
let spotifyController = null;

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  IFrameAPI.createController(
    document.getElementById('spotify-player'),
    {
      uri: 'spotify:playlist:1tXnKgVzgTfkyAronlr2AL',
      width: '80%',
      height: '100'
    },
    (controller) => {
      spotifyController = controller;

      // 1) tenta tocar assim que o player estiver pronto
      controller.addListener('ready', () => {
        try {
          controller.play();
        } catch (err) {
          console.warn('Autoplay bloqueado no ready():', err);
        }
      });
    }
  );
};

// Função que tenta tocar novamente após interação
function tentarPlay() {
  if (!spotifyController) return;

  try {
    spotifyController.play();
    // Remover ambos os listeners após sucesso
    document.removeEventListener('click', tentarPlay);
    document.removeEventListener('scroll', tentarPlay);
  } catch (err) {
    console.warn('Ainda não foi possível tocar:', err);
  }
}

// 2. MONTAR CARROSSEL INFINITO -------------------------------
function montarCarrossel(items) {
  const linha = document.querySelector('.carrossel-linha');
  linha.innerHTML = '';

  // cria um slide (foto ou vídeo)
  const criaSlide = (item) => {
    const div = document.createElement('div');
    div.className = 'iFoto';

    let media = document.createElement('img');
    media.src = item.src;
    media.alt = `Foto de ${item.date}`;

    media.classList.add('foto');

    // legenda data + coração
    const p = document.createElement('p');
    p.innerHTML = `${item.date} <img src="./src/assets/img/heart.png" class="heart" alt="❤️">`;

    div.append(media, p);
    return div;
  };

  // popula 2x para efeito seamless
  items.forEach(i => linha.appendChild(criaSlide(i)));
  items.forEach(i => linha.appendChild(criaSlide(i)));
}

document.addEventListener('click', tentarPlay, { once: true });
document.addEventListener('scroll', tentarPlay, { once: true });

// 3. INICIALIZAÇÃO QUANDO DOM PRONTO -------------------------
document.addEventListener('DOMContentLoaded', () => {
  fetch('./src/assets/data/album.json')
    .then(res => res.json())
    .then(album => montarCarrossel(album))
    .catch(err => console.error('Erro ao carregar album.json:', err));
});