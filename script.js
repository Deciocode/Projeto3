// script.js | Versão Profissional com Gerenciamento de Estado

document.addEventListener('DOMContentLoaded', () => {
    // --- Referências do DOM ---
    const jazzGrid = document.getElementById('jazz-grid');
    const audioPlayer = document.getElementById('global-audio-player');
    const heroButton = document.getElementById('play-jazz-button'); // Botão adicionado no HTML
    
    // --- Gerenciamento de Estado (State Management) ---
    const state = {
        currentStyleId: null,
        isPlaying: false,
        stylesData: [], // Armazena os dados carregados
    };

    // --- 1. Carregamento de Dados ---
    
    /**
     * Carrega os estilos de jazz do arquivo data.json.
     * @returns {Promise<Array>} Retorna a lista de estilos.
     */
    async function fetchStyles() {
        try {
            // Nota: O caminho '/data.json' é assumido para um servidor de desenvolvimento.
            const response = await fetch('./data.json'); 
            if (!response.ok) {
                throw new Error(`Erro de HTTP: ${response.status}`);
            }
            const styles = await response.json();
            state.stylesData = styles; // Armazena os dados no estado
            return styles;
        } catch (error) {
            console.error('❌ Erro fatal ao carregar estilos de jazz:', error);
            jazzGrid.innerHTML = '<p class="error-message">Não foi possível carregar os estilos de jazz. Verifique o arquivo `data.json` e a conexão do servidor.</p>';
            return []; // Retorna array vazio para evitar falhas no render
        }
    }

    // --- 2. Renderização do DOM ---

    /**
     * Cria e renderiza os cards de estilo no grid.
     * @param {Array} styles - Lista de objetos de estilo.
     */
    function renderCards(styles) {
        styles.forEach(style => {
            const card = document.createElement('div');
            card.classList.add('jazz-card');
            card.dataset.audioUrl = style.audio;
            card.dataset.id = style.id;
            
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${style.image}" alt="${style.title}" loading="lazy">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${style.title}</h3>
                    <p class="card-description">${style.description || 'Um subgênero essencial do Jazz.'}</p>
                    <p class="card-artists">Artistas Chave: ${style.artists}</p>
                </div>
            `;

            card.addEventListener('click', () => handlePlayback(style.id, card));
            jazzGrid.appendChild(card);
        });
    }

    // --- 3. Lógica de Playback Centralizada ---

    /**
     * Gerencia a lógica de play/pause quando um card é clicado.
     * @param {string} styleId - ID do estilo clicado.
     * @param {HTMLElement} clickedCard - O elemento card que foi clicado.
     */
    function handlePlayback(styleId, clickedCard) {
        const audioUrl = clickedCard.dataset.audioUrl;
        const isSameTrack = styleId === state.currentStyleId;
        
        // 1. Cenário: Pausar (Está tocando o mesmo card)
        if (isSameTrack && state.isPlaying) {
            audioPlayer.pause();
        } 
        // 2. Cenário: Tocar (Novo card ou mesmo card pausado)
        else {
            // Limpa o estado visual do card anterior
            if (state.currentStyleId) {
                const prevCard = document.querySelector(`.jazz-card[data-id="${state.currentStyleId}"]`);
                prevCard?.classList.remove('is-playing');
            }

            // Atualiza o src apenas se for um novo áudio
            if (!isSameTrack || audioPlayer.paused) {
                 audioPlayer.src = audioUrl;
            }

            // Toca o áudio e trata o erro de política de autoplay
            audioPlayer.play().then(() => {
                // Atualiza o estado
                state.currentStyleId = styleId;
                state.isPlaying = true;
                
                // Atualiza o visual
                clickedCard.classList.add('is-playing');
                updateHeroButtonState();

            }).catch(error => {
                console.warn('⚠️ A reprodução automática foi bloqueada. Ação do usuário é necessária.', error);
                // Feedback para o usuário: Manter o card sem 'is-playing' se não tocou
                state.isPlaying = false;
                alert('O navegador bloqueou a reprodução automática. Por favor, clique novamente.');
            });
        }
    }

    /**
     * Função para atualizar o texto do botão do Hero dependendo do estado.
     */
    function updateHeroButtonState() {
        if (!heroButton) return;
        
        if (state.isPlaying) {
            heroButton.textContent = '⏸️ Pausar Jazz';
        } else {
            heroButton.textContent = '▶️ Ouvir a Essência do Jazz';
        }
    }

    // --- 4. Inicialização e Event Listeners Globais ---

    // A. Lógica para o botão do Hero (Toca o primeiro item da lista)
    if (heroButton) {
        heroButton.addEventListener('click', () => {
            const firstCard = jazzGrid.querySelector('.jazz-card');
            if (firstCard) {
                 // Se nada estiver tocando, toca o primeiro item
                if (!state.isPlaying) {
                    handlePlayback(firstCard.dataset.id, firstCard);
                } else {
                    // Se estiver tocando, pausa o item atual
                    audioPlayer.pause();
                }
            }
        });
    }

    // B. Eventos do Player Global
    
    // Música pausada (por usuário ou por código)
    audioPlayer.addEventListener('pause', () => {
        state.isPlaying = false;
        const currentCard = document.querySelector(`.jazz-card[data-id="${state.currentStyleId}"]`);
        currentCard?.classList.remove('is-playing');
        updateHeroButtonState();
    });

    // Música terminou
    audioPlayer.addEventListener('ended', () => {
        state.isPlaying = false;
        const currentCard = document.querySelector(`.jazz-card[data-id="${state.currentStyleId}"]`);
        currentCard?.classList.remove('is-playing');
        state.currentStyleId = null; // Limpa o ID
        updateHeroButtonState();
    });

    // C. Iniciar a aplicação
    async function init() {
        const styles = await fetchStyles();
        if (styles.length > 0) {
            renderCards(styles);
            updateHeroButtonState(); // Inicializa o estado do botão
        }
    }

    init();
});