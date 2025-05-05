const inicio = new Date('2022-05-07');
const hoje = new Date();

diferenca = hoje - inicio;

const dias = (Math.floor(diferenca / (1000 * 60 * 60 * 24)));
const horas = (dias * 24);
const minutos = (horas * 60);
const segundos = (minutos * 60);

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('dias').textContent = cDias();

  fetch('assets/data/album.json')
    .then(res => res.json())
    .then(album => montarCarrossel(album))
    .catch(err => console.error('Erro ao carregar album.json:', err));
});

function cDias() {
  return "Feliz " + dias + " dias juntos🫀";
}

function montarCarrossel(items) {
  const linha = document.querySelector('.carrossel-linha');
  linha.innerHTML = ''; // limpa o carrossel

  items.forEach(item => {
    // 1. Container da mídia
    const div = document.createElement('div');
    div.className = 'iFoto';

    // 2. Escolhe <video> ou <img> conforme a extensão
    let media;
    if (item.src.toLowerCase().endsWith('.mp4')) {
      media = document.createElement('video');
      media.className = 'foto';          // reutiliza sua classe .foto
      media.src = item.src;
      media.autoplay = true;
      media.loop = true;
      media.muted = true;                // necessário para autoplay sem interação
      media.playsInline = true;          // bom para mobile
      media.setAttribute('controls', ''); // se quiser controles
    } else {
      media = document.createElement('img');
      media.className = 'foto';
      media.src = item.src;
      media.alt = `Foto de ${item.date}`;
    }

    // 3. Legenda com data e coração
    const p = document.createElement('p');
    p.innerHTML = `${item.date} <img src="./assets/img/heart.png" class="heart" alt="">`;

    // 4. Monta o card
    div.appendChild(media);
    div.appendChild(p);
    linha.appendChild(div);
  });
}