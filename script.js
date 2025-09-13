 const accessKey = "NeoZ8tet_OpdrDReBhBM0uW4sQXZNutJZI_jmPh-X0U";
        let pagingAtual = 1;
        let termoAtual = "";

        async function buscarImagens(novaBusca) {
            const termo = document.getElementById("searchInput").value.trim();
            const galeria = document.getElementById("galeria");
            const botaoMais = document.getElementById("carregarMais");

            if (novaBusca) {
                pagingAtual = 1;
                termoAtual = termo;
                galeria.innerHTML = "<p>Carregando imagens...</p>";
            } else {
                pagingAtual++;
            }

            try {
                const resposta = await fetch(
                    `https://api.unsplash.com/search/photos?query=${termoAtual}&page=${pagingAtual}&per_page=9&client_id=${accessKey}`
                );

                const dados = await resposta.json();

                if (novaBusca) galeria.innerHTML = "";

                if (dados.results.length === 0 && pagingAtual === 1) {
                    galeria.innerHTML = "<p>Nenhuma imagem encontrada.</p>";
                    botaoMais.style.display = "none";
                    return;
                }

                dados.results.forEach((foto) => {
                    const card = document.createElement("div");
                    card.className = "card";

                    const img = document.createElement("img");
                    img.src = foto.urls.regular;
                    img.alt = foto.alt_description || "Imagem do Unsplash";

                    const descricao = document.createElement("div");
                    descricao.className = "descricao";
                    descricao.textContent = foto.alt_description || "Sem descrição disponível";

                    const imagemWrapper = document.createElement("div");
                    imagemWrapper.className = "imagem-wrapper";

                    imagemWrapper.appendChild(img);
                    card.appendChild(imagemWrapper);
                    card.appendChild(descricao);
                    galeria.appendChild(card);
                });

                // Mostrar/ocultar botão "Carregar Mais"
                botaoMais.style.display = dados.results.length > 0 ? "block" : "none";

            } catch (erro) {
                galeria.innerHTML = "<p>Erro ao carregar imagens...</p>";
                console.error("Erro na API:", erro);
                botaoMais.style.display = "none";
            }
        }