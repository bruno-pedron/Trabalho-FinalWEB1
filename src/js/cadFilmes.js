function mostrarAlerta(tipo, titulo, mensagem) {
    const overlay = document.createElement("div");
    overlay.className = "alert-overlay";

    const alertBox = `
        <div class="alert-box ${tipo}">
            <div class="alert-title">${titulo}</div>
            <div class="alert-message">${mensagem}</div>
            <button class="alert-close" onclick="fecharAlerta()">Fechar</button>
        </div>
    `;

    overlay.innerHTML = alertBox;
    document.body.appendChild(overlay);
}

function fecharAlerta() {
    const overlay = document.querySelector(".alert-overlay");
    if (overlay) {
        overlay.remove();
    }
}

//-----------------------POST---------------------------------

document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const tit = document.getElementById("titulo").value;
    const gen = document.getElementById("genero").value;
    const ano_lanc = document.getElementById("ano").value;

    if (ano_lanc <= 1888 || ano_lanc > 2024) {
        mostrarAlerta("error", "Erro", "O ano de lançamento deve ser válido.");
        return;
    }

    let aval;
    const ratingElements = document.getElementsByName("star");
    for (let i = 0; i < ratingElements.length; i++) {
        if (ratingElements[i].checked) {
            aval = ratingElements[i].value;
            break;
        }
    }

    try {
        const response = await fetch("http://localhost:3000/filmes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tit,
                gen,
                ano_lanc,
                aval,
            }),
        });

        if (response.ok) {
            mostrarAlerta("success", "Sucesso", "Filme cadastrado com sucesso!");
            document.getElementById("cadastroForm").reset();
        } else {
            mostrarAlerta("error", "Erro", "Erro ao cadastrar filme. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        mostrarAlerta("error", "Erro", "Erro ao conectar ao servidor.");
    }
});