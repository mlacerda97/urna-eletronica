

//SELECIONAR PARA CONTROLAR CADA ITEM DA URNA

let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

//VARIAVES DE CONTROLE DO AMBIENTE

let etapaAtual = 0; 
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
        numeroHtml += '<div class="numero"></div>';
    }};

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml
}

function atualizaInterface() { //ACHAR CANDIDATO
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

// MOSTRAR INFORMAÇÕES DO CANDIDATO

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} </br>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            } else {
            fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
        }};

        lateral.innerHTML = fotosHtml;
        
    } else { // VOTO NULO
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--medio">NUMERO ERRADO</div><div class="aviso--grande pisca">VOTO NULO</div>';

    }

}

// FUNÇÕES DOS BOTÕES

function clicou (n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
        elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco () {
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } 
}

function corrige (n) {
    comecarEtapa(); //ZERAR
}

function confirma (n) {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({ //PARA VOTOS SEREM COLOCADOS DENTRO DE UM ARRAY
            etapa:etapas[etapaAtual].titulo,
            voto: 'Branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({ //PARA VOTOS SEREM COLOCADOS DENTRO DE UM ARRAY
            etapa:etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos) // PARA VOTOS SEREM MOSTRADOS NO ARRAY DEPOIS DO FIM
        }
    }
}

document.body.addEventListener('keyup', (event) => { //PARA DIGITAR COM O TECLADO TAMBEM
    let numeral = event.key

    let int = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (int.indexOf(numeral) != -1) {
        clicou(numeral)
    } else {
        alert('Digite Somente Numeros')
    }
});

comecarEtapa();