// Seleciona o botão de interruptor e o campo de entrada
const toggleButton = document.getElementById('toggleLabel');
const myInput2 = document.getElementById('myInput2');

document.getElementById('toggle').addEventListener('change', function () {
    if (this.checked) {
        // Alterna para RA
        toggleButton.textContent = 'RA';
        myInput2.placeholder = 'RA';
        myInput2.value = ''; // Limpa o valor do campo de entrada
    } else {
        // Alterna para CPF
        toggleButton.textContent = 'CPF';
        toggleButton.style.backgroundColor = ""; // Limpa a cor de fundo
        myInput2.placeholder = 'CPF';
        myInput2.value = ''; // Limpa o valor do campo de entrada
    }
});

// Adiciona evento de validação ao campo de entrada
myInput2.addEventListener('blur', function () {
    validarForm();
});

// Adiciona evento de keyup para impor limite de 7 dígitos para RA
myInput2.addEventListener('keyup', function () {
    const valorToggle = document.getElementById('toggle').checked;
    if (valorToggle) {
     
        if (!(/^\d+$/.test(this.value))) {
            this.setCustomValidity("RA inválido!");
            this.reportValidity();
        } else {
            this.value = this.value.slice(0, 7);
        }
    }
});

function toggleInputs(inputToHideId, inputToShowId) {
    var inputToHide = document.getElementById(inputToHideId);
    var inputToShow = document.getElementById(inputToShowId);

    if (!inputToHide.classList.contains("hidden")) {
        inputToHide.classList.add("hidden");
        inputToShow.classList.remove("hidden");
    } else {
        inputToHide.classList.remove("hidden");
        inputToShow.classList.add("hidden");
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
}

function validarForm() {
    const inputToggle = document.getElementById('toggle');
    const cpfInput = document.getElementById('myInput2');
    const valorToggle = inputToggle.checked;

    // Verifica se o campo está configurado como "RA"
    if (!valorToggle) {
        // Realiza a validação apenas se não estiver configurado como "RA"
        const cpf = cpfInput.value;
        const cpfValido = validarCPF(cpf);
        if (cpfValido) {
            window.location.href = "/pag/recuperacaoSenha.html";
        } else {
            cpfInput.setCustomValidity("CPF inválido!");
            cpfInput.reportValidity();
        }
    } else {
        // Limpa a validação personalizada se o campo estiver configurado como "RA"
        cpfInput.setCustomValidity("");
    }
}