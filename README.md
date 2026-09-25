# KitGift

Projeto de e-commerce de kits para presente - EXPOCEEP, Etapa 1, turma 3M.

## Equipe

- Gabriel Brustolin
- Debora Dias
- Hayat Rossi Azam

## Entrega atual

API mínima em Python/Flask com `GET /`, banco SQLite com nove tabelas e documentação de execução. A base original possuía somente usuários; as demais tabelas foram acrescentadas a partir do DER fornecido. Catálogo, login, checkout e processamento de pagamentos ainda não possuem rotas nesta etapa.

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
│   └── requirements.txt
└── docs/
    └── modelagem.md
```

## Executar no Windows

Requer Python 3.10 ou superior e SQLite 3.31 ou superior. Abra a pasta raiz no VS Code. No terminal:

```powershell
python -m venv backend/venv
.\backend\venv\Scripts\python.exe -m pip install -r backend/requirements.txt
.\backend\venv\Scripts\python.exe bd/init_db.py
.\backend\venv\Scripts\python.exe backend/app.py
```

Acesse http://localhost:5000/ para receber:

```json
{"status":"sucesso","mensagem":"API do KitGift rodando com sucesso na Etapa 1!"}
```

O inicializador cria `bd/banco.db`. Ele recusa bancos com tabelas existentes, preservando seus dados. Para atualizar um banco antigo, guarde uma cópia e utilize um arquivo novo; não há migração automática. A rota principal é independente do banco nesta etapa. O servidor de desenvolvimento deve ser usado somente localmente.

## Banco de dados

Veja [modelagem e relacionamentos](docs/modelagem.md). Preços e totais são inteiros em centavos: R$ 25,90 = 2590. Subtotais são calculados pelo SQLite. Os totais de carrinhos e pedidos deverão ser atualizados pela futura lógica de compra, na mesma transação dos itens. Nenhum pagamento real é processado e nenhum dado de cartão deve ser armazenado.

Foi preservada a chave `usuarios.id` do código original. Os endereços ficam em tabela própria para evitar duplicidade no cadastro. Cada pedido guarda uma cópia textual do endereço de entrega. A coluna `senha` deverá receber apenas hashes quando o cadastro for implementado. Cada conexão futura deve executar `PRAGMA foreign_keys = ON`.

## Evidências para o relatório

Inclua o DER, os integrantes e a turma, o link público deste repositório, o terminal após a criação do banco, o VS Code com Flask em execução e o navegador mostrando a URL e o JSON. As capturas originais representam a versão anterior; capture novamente após executar esta versão.

O `.gitignore` exclui ambientes virtuais, bancos locais, caches, configurações locais e `.env`. Somente código e documentação devem ser versionados.
