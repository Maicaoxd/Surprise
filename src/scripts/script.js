// 1. SPOTIFY IFRAME API --------------------------------------
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  IFrameAPI.createController(
    document.getElementById('spotify-player'),
    {
      uri: 'spotify:playlist:1tXnKgVzgTfkyAronlr2AL',
      width: '80%',
      height: '100'
    },
    (controller) => {
      // aguarda o player ficar pronto
      controller.addListener('ready', () => {
        try {
          controller.play();  // pode falhar se autoplay bloqueado
        } catch (err) {
          console.warn('Não foi possível autoplay:', err);
        }
      });
    }
  );
};

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

// 3. INICIALIZAÇÃO QUANDO DOM PRONTO -------------------------
document.addEventListener('DOMContentLoaded', () => {
  fetch('./src/assets/data/album.json')
    .then(res => res.json())
    .then(album => montarCarrossel(album))
    .catch(err => console.error('Erro ao carregar album.json:', err));
});