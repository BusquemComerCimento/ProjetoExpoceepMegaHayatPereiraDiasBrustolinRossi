# KitGift

Projeto de e-commerce de kits para presente - EXPOCEEP, Etapa 3: integração front-end e back-end, turma 3M.

## Interface da Etapa 3

Inicie o servidor pelos comandos abaixo e abra http://127.0.0.1:5000/ no navegador.
A página contém cadastro de categorias, formulário de kits e listagem dinâmica via fetch.
Os arquivos visuais ficam em `frontend/index.html`, `frontend/style.css` e `frontend/main.js`.
A rota de diagnóstico JSON foi movida de `/` para `/api/status`.
Não abra o HTML com duplo clique: a interface deve ser servida pelo Flask.
Veja [o registro da Etapa 3](docs/etapa3-progresso.md), [o relatório em PDF](docs/Relatorio-Etapa3-KitGift.pdf) e [as capturas de funcionamento](docs/etapa3-evidencias/).

## Equipe

- Gabriel Brustolin - nº 10
- Débora Dias - nº 5
- Hayat Rossi Azam - nº 13

## Entrega atual

API Python/Flask conectada ao SQLite, com CRUD completo de produtos e cadastro/listagem de categorias. A interface da Etapa 3 foi validada no navegador: cadastro via fetch, listagem dinâmica, mensagens de erro e persistência após reiniciar o servidor. O relatório e as quatro capturas estão em docs/. O banco mantém as nove tabelas da Etapa 1. Login, checkout e pagamento real não fazem parte desta entrega. Esta API de laboratório, sem autenticação, deve ser executada apenas localmente.

## Estrutura

```text
KitGift/
├── .gitignore
├── README.md
├── bd/
│   ├── script.sql
│   └── init_db.py
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── test_api.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── main.js
└── docs/
    ├── Relatorio-Etapa3-KitGift.pdf
    ├── etapa3-evidencias/
    ├── etapa3-progresso.md
    ├── modelagem.md
    ├── etapa2.md
    ├── KitGift-Etapa2.postman_collection.json
    └── evidencias-http.json
```

## Executar no Windows

Requer Python 3.10 ou superior e SQLite 3.31 ou superior. Abra a pasta raiz no VS Code. No terminal:

```powershell
python -m venv backend/venv
.\backend\venv\Scripts\python.exe -m pip install -r backend/requirements.txt
.\backend\venv\Scripts\python.exe backend/app.py
```

Acesse http://localhost:5000/api/status para receber:

```json
{"status":"sucesso","mensagem":"API do KitGift - Etapa 3: interface e SQLite."}
```

A API cria `bd/banco.db` automaticamente quando o banco está vazio. Ao reiniciar, os registros são preservados. Bancos da Etapa 1 com o esquema completo são reutilizados. Um banco antigo com apenas usuários será recusado: preserve uma cópia e utilize um arquivo novo, pois não há migração automática. `bd/init_db.py` continua disponível para inicialização manual de bancos novos. O caminho é calculado a partir do arquivo Python, independente da pasta do terminal.

## Rotas e testes da Etapa 2

| Método | Rota | Resultado |
|---|---|---|
| POST | `/categorias` | Cria categoria, 201 |
| GET | `/categorias` | Lista categorias, 200 |
| POST | `/produtos` | Cria produto, 201 |
| GET | `/produtos` | Lista produtos, 200 |
| GET | `/produtos/<id>` | Consulta produto, 200 ou 404 |
| PUT | `/produtos/<id>` | Atualiza produto, 200 ou 404 |
| DELETE | `/produtos/<id>` | Exclui produto, 200 ou 404; 409 se vinculado |

Consulte [payloads, validações e roteiro de evidências](docs/etapa2.md). Importe [a coleção Postman](docs/KitGift-Etapa2.postman_collection.json) e execute na ordem. Ela armazena os IDs retornados e confere os status HTTP. Todos os dados de demonstração são fictícios.

Para executar os sete testes de integração com um banco temporário:

```powershell
.\backend\venv\Scripts\python.exe -m unittest discover -s backend -p test_api.py -v
```

Os testes cobrem CRUD, persistência após recriar a aplicação, isolamento de registros, JSON inválido, tipos e valores inválidos, categoria inexistente, SQL parametrizado e bloqueio de exclusão de produtos relacionados. `docs/evidencias-http.json` contém respostas de 12 requisições HTTP reais executadas com Python; esse registro não substitui os prints no Thunder Client/Postman exigidos pelo relatório.

## Banco de dados

Veja [modelagem e relacionamentos](docs/modelagem.md). Preços e totais são inteiros em centavos: R$ 25,90 = 2590. Subtotais são calculados pelo SQLite. Os totais de carrinhos e pedidos deverão ser atualizados pela futura lógica de compra, na mesma transação dos itens. Nenhum pagamento real é processado e nenhum dado de cartão deve ser armazenado.

Foi preservada a chave `usuarios.id` do código original. Os endereços ficam em tabela própria para evitar duplicidade no cadastro. Cada pedido guarda uma cópia textual do endereço de entrega. A coluna `senha` deverá receber apenas hashes quando o cadastro for implementado. Cada conexão futura deve executar `PRAGMA foreign_keys = ON`.

## Evidências para o relatório

O relatório da Etapa 2 deve incluir integrantes, turma, link público e quatro capturas do Thunder Client/Postman: POST com 201, GET com 200, PUT com 200 e DELETE com 200. Veja o roteiro em `docs/etapa2.md`. Não reutilize os prints da Etapa 1 como comprovação do CRUD.

O `.gitignore` exclui ambientes virtuais, bancos locais, caches, configurações locais e `.env`. Somente código e documentação devem ser versionados.
