const inicio = new Date('2022-05-07');
const hoje = new Date();

diferenca = hoje - inicio;

const dias = (Math.floor(diferenca / (1000 * 60 * 60 * 24))); 
const horas = (dias * 24);
const minutos = (horas * 60);
const segundos = (minutos * 60);

function cDias(){

    return "Feliz "+ dias +" dias juntos🫀";     
}

function equivale(){
    return "Isso equivale a "+ horas +" horas, "+ minutos +" minutos ou "+ segundos +" segundos";
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('dias').textContent = cDias();
  document.getElementById('equivale').textContent = equivale();  
});