const dataNascimento = document.querySelector("#dataNascimento");

dataNascimento.addEventListener('blur', (evento) => {
    validaDataNascimento(evento.target)
});

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem)
};

function maiorQue18(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
};



window.onload = function () {
    validarCPF();
    validarSenha();
};

function validarSenha() {
    const senha = document.querySelector('input[name=senha]');
    const confirmaSenha = document.querySelector('input[name=confirmaSenha]');

    confirmaSenha.addEventListener("blur", function (e) {

        if (confirmaSenha.value === senha.value) {
            confirmaSenha.setCustomValidity('');

        } else {
            confirmaSenha.setCustomValidity('as senhas não conferem');
        }
    });
};

function validarCPF() {

    let cpf = document.querySelector('input[name=cpf]');

    cpf.addEventListener("keydown", function (e) {
        if (e.key > "a" && e.key < "z") {
            e.preventDefault();
        }
    });

    cpf.addEventListener("blur", function (e) {
        let cpf = this.value.replace(/\D/g, "");
        if (cpf.length == 11) {

            var Soma;
            var Resto;

            Soma = 0;
            for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto == 10) || (Resto == 11)) Resto = 0;
            if (Resto != parseInt(cpf.substring(9, 10))) {
                document.getElementById('cpf').setCustomValidity("CPF Inválido!");
                return;
            }

            Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto == 10) || (Resto == 11)) Resto = 0;
            if (Resto != parseInt(cpf.substring(10, 11))) {
                document.getElementById('cpf').setCustomValidity("CPF Inválido!");
                return
            }

            let cpf_final = cpf.replace(/(\d{3})(\d)/, "$1.$2");
            cpf_final = cpf_final.replace(/(\d{3})(\d)/, "$1.$2");
            cpf_final = cpf_final.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            document.getElementById('cpf').value = cpf_final;

            document.getElementById('cpf').setCustomValidity("");


        } else {
            document.getElementById('cpf').setCustomValidity("CPF Inválido! É esperado 11 dígitos numéricos.");
        }
    });
};



