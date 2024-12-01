async function carregarFilmes() {
    try {
        const response = await fetch("http://localhost:3000/filmes");
        const filmes = await response.json();

        const tabela = document.querySelector(".films-container table tbody");
        tabela.innerHTML = ""; // Limpa a tabela antes de popular

        filmes.forEach((filme) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${filme.id}</td>
                <td>${filme.title}</td>
                <td>${filme.genre}</td>
                <td>${filme.year}</td>
                <td>
                    <button onclick="editarFilme(${filme.id})">Editar</button>
                    <button onclick="deletarFilme(${filme.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar filmes:", error);
    }
}

// Chama a função ao carregar a página
carregarFilmes();

async function editarFilme(id) {
    const novoTitulo = prompt("Digite o novo título:");
    const novoGenero = prompt("Digite o novo gênero:");
    const novoAno = prompt("Digite o novo ano:");

    if (!novoTitulo || !novoGenero || !novoAno) {
        alert("Todos os campos devem ser preenchidos.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/filmes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: novoTitulo,
                genre: novoGenero,
                year: novoAno,
            }),
        });

        if (response.ok) {
            alert("Filme atualizado com sucesso!");
            carregarFilmes();
        } else {
            alert("Erro ao atualizar o filme.");
        }
    } catch (error) {
        console.error("Erro ao atualizar filme:", error);
    }
}

async function deletarFilme(id) {
    if (!confirm("Tem certeza de que deseja excluir este filme?")) return;

    try {
        const response = await fetch(`http://localhost:3000/filmes/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Filme excluído com sucesso!");
            carregarFilmes();
        } else {
            alert("Erro ao excluir o filme.");
        }
    } catch (error) {
        console.error("Erro ao excluir filme:", error);
    }
}
