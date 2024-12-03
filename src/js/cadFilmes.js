document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const tit = document.getElementById("titulo").value; // ID corrigido
    const gen = document.getElementById("genero").value; // ID correto
    const ano_lanc = document.getElementById("ano").value; // ID corrigido

    let aval;
    const ratingElements = document.getElementsByName("star");
    for (let i = 0; i < ratingElements.length; i++) {
        if (ratingElements[i].checked) {
            aval = ratingElements[i].value;  // Captura o valor da estrela selecionada
            break;
        }
    }

    console.log("Enviando dados:", {tit,gen,ano_lanc,aval}); 

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