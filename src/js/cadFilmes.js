document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const title = document.getElementById("nome").value;
    const genre = document.getElementById("produto").value;
    const year = document.getElementById("email").value;

    let rating;
    const ratingElements = document.getElementsByName("star");
    for (let i = 0; i < ratingElements.length; i++) {
    if (ratingElements[i].checked) {
        rating = ratingElements[i].value;  // Captura o valor da estrela selecionada
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
                title,
                genre,
                year,
                rating,
            }),
        });

        if (response.ok) {
            alert("Filme cadastrado com sucesso!");
            document.getElementById("cadastroForm").reset();
        } else {
            alert("Erro ao cadastrar filme. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar ao servidor.");
    }
});