# Finance Wallet API

## Projeto Back End de uma Carteira Financeira

## Objetivo: O objetivo consiste na criação de uma carteira financeira em que os usuários possam realizar transferência de saldo.

## Tecnologias:

-   NestJs
-   TypeScript
-   TypeOrm
-   PostgreSQL
-   Swagger
-   Docker
-   JWT
-   Bull

## Commands

-   Iniciar aplicação (dev): `npm run dev`
-   Iniciar aplicação (prod): `npm run build` `npm run start:prod`
-   Iniciar aplicação (com docker compose dev): `docker compose up --build`
-   Iniciar aplicação (com docker compose prod): `docker compose -f docker-compose-prod.yml up --build`

## Estrutura da Aplicação

```
src/
│
├── config/                    # Arquivos de configurações do projeto
│   ├── database/              # Configurações de banco de dados
│   ├── exceptions/            # Classes de exceção customizadas
│   └── middlewares/           # Middlewares da aplicação
│
├── modules/                   # Módulos da aplicação
│   ├── users/                 # Módulo exemplo
│   │   ├── application/       # Camada de aplicação
│   │   │   ├── services/      # Arquivos de serviços que utilizam os casos de uso
│   │   │   └── usecases/      # Casos de uso da entidade contendo regras de negócios
│   │   ├── domain/            # Camada de domínio da aplicação
│   │   │   ├── entities/      # Entidade do domínio
│   │   │   └── interfaces/    # Interfaces de repository, service
│   │   ├── infra/             # Camada de infraestrutura da aplicação onde ficará partes técnicas, acesso ao banco, schemas
│   │   │   ├── repositories/  # Onde ficará o acesso ao banco para buscas e inserções
│   │   │   ├── schemas/       # Schemas de tabela do banco de dados
│   │   │   └── validators/    # Funções de validações de requisições
│   │   └── presentation/      # Camada de apresentação onde receberá/devolverá requisições e respostas e conterá dtos
│   │       ├── controllers/   # Onde ficará as configurações das rotas
│   │       └── dtos/          # Contém arquivos de transfrencias de dados
│
└── shared/                    # Arquivos compartilhados
    ├── decorators             # Custom decorators
    ├── enums                  # Enums
    ├── exceptions             # Custom Exceptions, BadRequest, NotFound...
    ├── interfaces             # Interfaces...
    ├── types                  # Types...
    └── utils                  # Funções, Classes de utilidades
```
