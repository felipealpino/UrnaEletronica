// CRIANDO VARIAVEIS DE CONTROLE DE INTERFACE 
let seuVotoPara = document.querySelector('.d-1-1 span');  //<span> SEU VOTO PARA </span>
let cargo = document.querySelector('.d-1-2 span'); // <span> VEREADOR </span>
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2'); // parte de baixo 
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');


//CRIANDO VARIAVEIS DE CONTROLE DE AMBIENTE
let etapaAtual = 0;
let numero = ''; //numero que está preenchido na tela 
let votobranco = false;
let votos = [];


function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';  
    votobranco = false ;

    for (let i=0 ; i<etapa.numeros-1; i++){
        if(i===0){
            numeroHtml += '<div class="numero pisca"></div>';
        }
        numeroHtml += '<div class="numero"></div>';
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    //será executada sempre que fizer uma ação
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true
        } else {
            return false;
        }
    });

    if (candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br>Partido: ${candidato.partido}`;
        let fotosHtml = '';

        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml +=  `<div class="d-1-image small"><img src="imagens/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml +=  `<div class="d-1-image small"><img src="imagens/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    } else { 
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}


function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
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

function branco(){
    //só pode votar em branco se nao tiver nada digitado
    //
    if(numero===''){
        votobranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert("Para votar em BRANCO, não pode ter digitado nenhum número. Clique em CORRIGE");
    }
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    //funciona se voto branco = true
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votobranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined ){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            console.log(votos);
        }
    }

}

comecarEtapa();