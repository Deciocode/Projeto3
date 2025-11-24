🎵 Síncopa | Jazz Explorer

Visão Geral do Projeto

Síncopa é um projeto front-end minimalista e elegante, construído com HTML e CSS puro, dedicado a explorar e catalogar a rica diversidade dos subgêneros do Jazz. O objetivo é fornecer uma interface visualmente agradável (com um tema escuro luxuoso e fontes clássicas) para que entusiastas e novatos possam descobrir a história, os ícones e as características de mais de uma dezena de estilos — do Bebop vibrante ao Smooth Jazz relaxante.

🛠️ Tecnologias Utilizadas

    HTML5: Estrutura semântica do conteúdo.

    CSS3: Estilização, layout responsivo e criação do tema visual (dark mode, cursores personalizados, transições).

    Data URI (SVG): Implementação de cursor personalizado para um toque de elegância.

    Google Fonts: Utilização de fontes como Cinzel Decorative (para títulos) e Montserrat (para corpo do texto) para um visual sofisticado.

    JSON: Estrutura de dados para o catálogo principal de estilos (o arquivo data.json que alimenta as informações do site).

✨ Principais Funcionalidades e Destaques

1. Navegação e UI/UX Personalizada

    Tema Dark Mode: Fundo escuro (--bg-color) com texto primário claro (--text-primary) e detalhes em ouro (--gold-accent), garantindo alta legibilidade e uma estética premium.

    Cursor Customizado: Implementação de um cursor elegante via SVG (Data URI) para reforçar a identidade visual do projeto.

    Design Responsivo: Layout adaptável para garantir a experiência de navegação em telas de diferentes tamanhos (Mobile First).

2. Catálogo de Estilos (Main Page)

A página principal exibe o catálogo de estilos, cada um representado por um "card" interativo que pode conter informações como:

    id, title, year, artists, image, e audio (para futura implementação de streaming).

3. Página de História Detalhada (historia.html)

Criamos uma seção dedicada e aprofundada para educar o usuário sobre as origens e a evolução dos ritmos. Os estilos detalhados incluem:

    Revoluções: Bebop Revolution, Straight Ahead Jazz (Classic Jazz), Jazz Fusion.

    Vibrações Suaves: Cool Jazz (West Coast), Smooth Jazz & Lounge, Jazz Ballads & Mellow.

    Influências Globais: Bossa Nova, Afro-Cuban Jazz (Latin Jazz), African Jazz, Gypsy Jazz (Jazz Manouche).

    Vocal e Sazonal: Vocal Legends (Sinatra Style), Holiday Jazz.

Cada entrada na página de história apresenta uma descrição rica e contextualizada, o período de origem e os principais ícones do gênero, oferecendo um conteúdo de alta qualidade.

🤝 Contribuições Futuras

O projeto está pronto para expansão, incluindo:

    Integração JavaScript: Adicionar lógica para carregar o catálogo de estilos a partir do arquivo data.json.

    Funcionalidade de Áudio: Implementar um player para que os usuários possam ouvir clipes de áudio (audio path no JSON) de cada estilo.

    Filtragem e Busca: Adicionar filtros baseados em década, instrumentação ou artistas.

Como Rodar o Projeto

    Clone o repositório: git clone [URL_DO_SEU_REPOSITORIO]

    Navegue até o diretório: cd Sincope-Jazz-Explorer

    Abra o arquivo index.html no seu navegador.