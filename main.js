const form = document.getElementById("formulario");
const arrayDeDados = JSON.parse(localStorage.getItem("dados")) || []

function atualizarCartao(campoValor) {
    let numeroCartao = document.getElementById("numero__cartao");
    let nomeCartao = document.getElementById("nome__cartao");
    let dataCartao = document.getElementById("data__cartao");
    
    nomeCartao.textContent = campoValor.nome
    numeroCartao.textContent = campoValor.numero
    dataCartao.textContent = campoValor.data
}


form.addEventListener("submit", evento => {
    evento.preventDefault()

    const campoInput = {
        "nome": evento.target.elements["name"].value,
        "numero": evento.target.elements["numero"].value,
        "data": evento.target.elements["data"].value
    }

    arrayDeDados.push(campoInput)

    localStorage.setItem("dados", JSON.stringify(arrayDeDados))

    arrayDeDados.forEach(campoValor => {
        atualizarCartao(campoValor)
    })
})



const inputs = document.querySelectorAll("[required]");
inputs.forEach(campo => {
    campo.addEventListener("blur", () => validaCampo(campo))
    campo.addEventListener("invalid", evento => evento.preventDefault())
})


const errosDoCampo = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagemErro = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    numero:  {
        valueMissing: "O campo não pode estar vazio.",
        patternMismatch: "Por favor, preencha um número válido."
    },
    data: {
        valueMissing: "O campo de nome não pode estar vazio."
    }
}

function validaCampo(campo) {
    let mensagem = ""
    errosDoCampo.forEach(erro => {
        if(campo.validity[erro]) {
            mensagem = mensagemErro[campo.name][erro]
        }
    })

    const mensagensErro = campo.parentNode.querySelector(".mensagem__erro");
    const checarInput = campo.checkValidity();

    if(!checarInput) {
        mensagensErro.textContent = mensagem
    } else {
        mensagensErro.textContent = ""
    }
}