# Stock Analysis Project

Este projeto é uma aplicação de análise de estoque com um backend em Node.js/Express e um frontend em React/Vite. O backend utiliza Supabase como banco de dados e inclui autenticação JWT. O frontend oferece uma interface para gerenciar produtos, estoques, movimentos de estoque e visualizações em gráficos.

## Funcionalidades

- **Backend (API REST)**:
  - Gerenciamento de usuários (autenticação JWT)
  - CRUD de produtos
  - Controle de saldos de estoque
  - Registro de movimentos de estoque
  - Integração com Supabase

- **Frontend (React)**:
  - Dashboard com gráficos (área, pizza, evolução de estoque)
  - Formulários para criar, editar e deletar produtos
  - Entrada de produtos
  - Interface responsiva com Tailwind CSS e Radix UI

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm
- Conta no Supabase (para banco de dados)
- ngrok (para túnel do webhook)

## Instalação

1. Clone o repositório ou baixe os arquivos.

2. Instale as dependências do backend:
   ```
   cd src/backend/src
   npm install
   ```

3. Instale as dependências do frontend:
   ```
   cd src/frontEnd
   npm install
   ```

## Configuração

1. Crie um projeto no Supabase e obtenha as credenciais:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

2. No diretório `src/backend/src`, crie um arquivo `.env` com as seguintes variáveis:
   ```
   PORT=3000
   AVALIABLE_URL=http://localhost:5173
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret
   ```

   Substitua pelos valores reais do seu projeto Supabase.

## Executando o Projeto

1. Inicie o backend:
   ```
   cd src/backend/src
   npm start
   ```
   O servidor estará rodando em `http://localhost:3000`.

2. Inicie o frontend:
   ```
   cd src/frontEnd
   npm run dev
   ```
   O frontend estará disponível em `http://localhost:5173`.

## Configuração do Webhook com ngrok

Para que o Supabase possa enviar webhooks para o seu servidor local (por exemplo, para notificações de mudanças no banco de dados), você precisa criar um túnel com ngrok.

1. Instale o ngrok se ainda não tiver: [ngrok.com](https://ngrok.com).

2. Com o backend rodando na porta 3000, execute:
   ```
   ngrok http 3000
   ```

3. Copie a URL gerada pelo ngrok (algo como `https://abc123.ngrok.io`).

4. No painel do Supabase, vá para Database > Webhooks e configure um webhook apontando para `https://abc123.ngrok.io/api/webhook` (ou o endpoint específico que você implementar para webhooks).

   **Nota**: Certifique-se de que o backend tenha um endpoint para receber webhooks, por exemplo, em `server.js` ou em uma rota dedicada.

## Estrutura do Projeto

```
src/
├── backend/
│   └── src/
│       ├── controllers/     # Controladores da API
│       ├── middleware/      # Middleware (ex: autenticação)
│       ├── models/          # Modelos de dados
│       ├── routes/          # Rotas da API
│       ├── package.json
│       ├── server.js        # Servidor Express
│       └── supabase.js      # Cliente Supabase
└── frontEnd/
    └── src/
        ├── api/             # Chamadas para a API
        ├── components/      # Componentes React
        ├── contexts/        # Contextos (ex: Auth)
        ├── lib/             # Utilitários
        ├── pages/           # Páginas da aplicação
        ├── App.tsx
        ├── main.tsx
        └── index.css
```

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, Supabase, JWT, bcrypt
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Radix UI, Recharts
- **Outros**: ngrok para túneis

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções.

## Licença

Este projeto é de código aberto. Consulte a licença para mais detalhes.