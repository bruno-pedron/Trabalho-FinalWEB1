document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/filmes');
        if (response.ok) {
            const filmes = await response.json();

            const filmesContainer = document.querySelector('.films-table tbody'); // Container correto

            filmes.forEach(filme => {
                const estrelas = '★'.repeat(filme.Avaliação);
                const filmeRow = document.createElement('tr');
                filmeRow.innerHTML = `
                    <td>${filme.Título}</td>  <!-- Nome correto do campo -->
                    <td>${filme.Gênero}</td>  <!-- Nome correto do campo -->
                    <td class="ano">${filme['Ano de Lançamento']}</td> <!-- Nome correto do campo -->
                    <td>${estrelas}</td> <!-- Nome correto do campo -->
                    <td>
                        <button class="editar" onclick="mostrarFormularioEdicao({ Título: '${filme.Título}', Gênero: '${filme.Gênero}', ['Ano de Lançamento']: ${filme['Ano de Lançamento']}, Avaliação: ${filme.Avaliação}, idf: ${filme.idf} })">Editar</button>
                        <button class="excluir" onclick="deletarFilme(${filme.idf})">Excluir</button>
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

function mostrarPopupConfirmacao(mensagem, callback) {
    // Cria a sobreposição e o pop-up
    const overlayHTML = `<div id="popup-overlay" class="popup-overlay"></div>`;
    const popupHTML = `
    <div id="popup-confirmacao" class="popup">
        <p>${mensagem}</p>
        <button id="confirmar" class="btn-enviar">Sim</button>
        <button id="cancelar" class="btn-limpar">Não</button>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", overlayHTML + popupHTML);

    // Adiciona eventos aos botões
    document.getElementById("confirmar").addEventListener("click", () => {
        callback(true);
        fecharPopup();
    });

    document.getElementById("cancelar").addEventListener("click", () => {
        callback(false);
        fecharPopup();
    });

    // Função para fechar o pop-up e remover a sobreposição
    function fecharPopup() {
        const overlay = document.getElementById("popup-overlay");
        const popup = document.getElementById("popup-confirmacao");
        if (overlay) overlay.remove();
        if (popup) popup.remove();
    }
}

function mostrarPopupAlerta(mensagem) {
    const overlayHTML = `<div id="popup-overlay" class="popup-overlay"></div>`;
    const popupHTML = `
    <div id="popup-alerta" class="popup">
        <p>${mensagem}</p>
        <button id="fechar" class="btn-enviar">OK</button>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", overlayHTML + popupHTML);

    document.getElementById("fechar").addEventListener("click", () => {
        document.getElementById("popup-overlay").remove();
        document.getElementById("popup-alerta").remove();

        // Garante o reload após a remoção dos elementos
        setTimeout(() => {
            location.reload();
        }, 50);
    });
}

function mostrarPopupAlertaNoReload(mensagem) {
    const overlayHTML = `<div id="popup-overlay" class="popup-overlay"></div>`;
    const popupHTML = `
    <div id="popup-alerta" class="popup">
        <p>${mensagem}</p>
        <button id="fechar" class="btn-enviar">OK</button>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", overlayHTML + popupHTML);

    document.getElementById("fechar").addEventListener("click", () => {
        document.getElementById("popup-overlay").remove();
        document.getElementById("popup-alerta").remove();
    });
}


// Função para criar o pop-up de edição
function mostrarFormularioEdicao(filme) {
    // Adiciona o fundo desfocado (overlay)
    const overlayHTML = `<div id="popup-overlay" class="popup-overlay"></div>`;
    document.body.insertAdjacentHTML("beforeend", overlayHTML);

    // Array de gêneros para gerar as opções dinamicamente
    const generos = [
        { id: 1, nome: "Ação" },
        { id: 2, nome: "Comédia" },
        { id: 3, nome: "Drama" },
        { id: 4, nome: "Ficção Científica" },
        { id: 5, nome: "Terror" },
        { id: 6, nome: "Animação" },
        { id: 7, nome: "Romance" },
        { id: 8, nome: "Aventura" },
    ];

    // Debug: Verificar valor do gênero atual
    console.log("Gênero atual:", filme.Gênero);

    // Gera as opções do select com o gênero atual como o primeiro
    const generoOptions = generos
        .map((genero) => {
            const isSelected = String(filme.Gênero).trim() === String(genero.nome).trim();
            return `<option value="${genero.id}" ${isSelected ? "selected" : ""}>${genero.nome}</option>`;
        })
        .join("");

    // Gera os inputs de avaliação com a avaliação atual pré-marcada
    const avaliacaoInputs = Array.from({ length: 5 }, (_, i) => {
        const value = 5 - i; // Cria as estrelas de 5 a 1
        return `
            <input type="radio" name="star" id="star${value}" value="${value}" ${
            filme.Avaliação == value ? "checked" : ""
        }>
            <label for="star${value}"></label>
        `;
    }).join("");

    const formHTML = `
    <div id="popup-edicao" class="popup">
      <div class="form-container">
        <img src="../Img/film.png" class="logo">
        <h1>Editar Filme</h1>
        <form id="form-edicao">
          <label for="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" class="input-titulo" value="${filme.Título}" required>
          
          <label for="ano">Ano de Lançamento:</label>
          <input type="number" id="ano" name="ano" class="input-ano" value="${filme['Ano de Lançamento']}" required>
          
          <label for="genero">Gênero:</label>
          <select id="genero" name="genero" class="select-genero" required>
            ${generoOptions}
          </select>
          
          <label for="avaliacao">Avaliação:</label>
          <div id="avaliacao">
            ${avaliacaoInputs}
          </div>
          
          <button type="submit" class="btn-enviar">Salvar</button>
          <button type="button" id="cancelar" class="btn-limpar">Cancelar</button>
        </form>
      </div>
    </div>`;

    // Adiciona o formulário ao body
    document.body.insertAdjacentHTML("beforeend", formHTML);

    // Configura eventos do formulário
    const form = document.getElementById("form-edicao");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const ano = parseInt(document.getElementById("ano").value, 10);
    
        // Validação do ano de lançamento
        if (ano <= 1888 || ano >= 2024) {
            mostrarPopupAlertaNoReload("O ano de lançamento deve ser válido.");
            return;
        }   

        await editarFilme(filme.idf);
        fecharPopup();
    });

    document.getElementById("cancelar").addEventListener("click", fecharPopup);
}

// Função para fechar o pop-up
function fecharPopup() {
    const popup = document.getElementById("popup-edicao");
    const overlay = document.getElementById("popup-overlay");
    if (popup) {
        popup.remove();
    }
    if (overlay) {
        overlay.remove();
    }
}

// Função para editar filme
async function editarFilme(id) {
    const titulo = document.getElementById("titulo").value;
    const genero = document.getElementById("genero").value;
    const ano = document.getElementById("ano").value;
    const avaliacao = document.querySelector("#avaliacao input[type='radio']:checked")?.value || null;

    const dados = {
        tit: titulo,
        gen: genero,
        ano_lanc: ano,
        aval: avaliacao,
    };

    
    try {
        const response = await fetch(`http://localhost:3000/filmes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        });

        if (response.ok) {
            mostrarPopupAlerta("Filme editado com sucesso!");
        } else {
            alert("Erro ao atualizar o filme.");
        }
    } catch (error) {
        console.error("Erro ao atualizar filme:", error);
    }
}


async function deletarFilme(id) {
    mostrarPopupConfirmacao("Tem certeza de que deseja excluir este filme?", async (confirmado) => {
        if (!confirmado) return;

        try {
            const response = await fetch(`http://localhost:3000/filmes/${id}`, { method: "DELETE" });
            if (response.ok) {
                mostrarPopupAlerta("Filme excluído com sucesso!");
            } else {
                const errorMsg = await response.text();
                mostrarPopupAlerta(`Erro ao excluir o filme: ${errorMsg}`);
            }
        } catch (error) {
            console.error("Erro ao excluir filme:", error);
        }
    });
}