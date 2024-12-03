document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/filmes');
        if (response.ok) {
            const filmes = await response.json();
            console.log('Resposta da API:', filmes); // Log para ver a estrutura exata da resposta

            const filmesContainer = document.querySelector('.films-table tbody'); // Container correto

            filmes.forEach(filme => {
                console.log(filme);  // Log de cada filme antes de adicionar na tabela

                const filmeRow = document.createElement('tr');
                filmeRow.innerHTML = `
                    <td>${filme.Título}</td>  <!-- Nome correto do campo -->
                    <td>${filme.Gênero}</td>  <!-- Nome correto do campo -->
                    <td>${filme['Ano de Lançamento']}</td> <!-- Nome correto do campo -->
                    <td>${filme.Avaliação} estrelas</td> <!-- Nome correto do campo -->
                    <td>
                        <button onclick="mostrarFormularioEdicao({ Título: '${filme.Título}', Gênero: '${filme.Gênero}', ['Ano de Lançamento']: ${filme['Ano de Lançamento']}, Avaliação: ${filme.Avaliação}, idf: ${filme.idf} })">Editar</button>
                        <button onclick="deletarFilme(${filme.idf})">Excluir</button>
                    </td>
                `;
                filmesContainer.appendChild(filmeRow);
            });
        } else {
            console.error('Erro ao recuperar os filmes');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});


// Função para criar o pop-up de edição
function mostrarFormularioEdicao(filme) {
    console.log('Abrindo formulário de edição para:', filme);
    const formHTML = `
        <div id="popup-edicao" class="popup">
            <form id="form-edicao">
                <h2>Editar Filme</h2>
                <label for="titulo">Título:</label>
                <input type="text" id="titulo" name="titulo" value="${filme.Título}">
                <label for="genero">Gênero:</label>
                <select id="genero" name="genero">
                    <option value="1" ${filme.Gênero == 1 ? "selected" : ""}>Ação</option>
                    <option value="2" ${filme.Gênero == 2 ? "selected" : ""}>Comédia</option>
                    <option value="3" ${filme.Gênero == 3 ? "selected" : ""}>Drama</option>
                    <option value="4" ${filme.Gênero == 4 ? "selected" : ""}>Ficção Científica</option>
                    <option value="5" ${filme.Gênero == 5 ? "selected" : ""}>Terror</option>
                    <option value="6" ${filme.Gênero == 6 ? "selected" : ""}>Animação</option>
                    <option value="7" ${filme.Gênero == 7 ? "selected" : ""}>Romance</option>
                    <option value="8" ${filme.Gênero == 8 ? "selected" : ""}>Aventura</option>
                </select>
                <label for="ano">Ano de Lançamento:</label>
                <input type="number" id="ano" name="ano" value="${filme['Ano de Lançamento']}"> 
                <label for="avaliacao">Avaliação:</label>
                <input type="number" id="avaliacao" name="avaliacao" min="0" max="10" value="${filme.Avaliação}">
                <button type="submit">Salvar</button>
                <button type="button" id="cancelar">Cancelar</button>
            </form>
        </div>
    `;

    // Adiciona o formulário ao body
    document.body.insertAdjacentHTML("beforeend", formHTML);

    // Configura eventos do formulário
    const form = document.getElementById("form-edicao");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await editarFilme(filme.idf);
        fecharPopup();
    });

    document.getElementById("cancelar").addEventListener("click", fecharPopup);
}

// Função para fechar o pop-up
function fecharPopup() {
    const popup = document.getElementById("popup-edicao");
    if (popup) {
        popup.remove();
    }
}

// Função para editar filme
async function editarFilme(id) {
    const titulo = document.getElementById("titulo").value;
    const genero = document.getElementById("genero").value;
    const ano = document.getElementById("ano").value;
    const avaliacao = document.getElementById("avaliacao").value;

    try {
        const response = await fetch(`http://localhost:3000/filmes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tit: titulo,
                gen: genero,
                ano_lanc: ano,
                aval: avaliacao,
            }),
        });

        if (response.ok) {
            alert("Filme atualizado com sucesso!");
            location.reload();
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
            location.reload(); // Atualiza a página para refletir as mudanças
        } else {
            const errorMsg = await response.text();
            alert(`Erro ao excluir o filme: ${errorMsg}`);
        }
    } catch (error) {
        console.error("Erro ao excluir filme:", error);
    }
}