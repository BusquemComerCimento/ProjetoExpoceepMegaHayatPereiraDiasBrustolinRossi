# Etapa 2 - Persistência de dados e CRUD

**Projeto:** KitGift - kits para presente. **Turma:** 3M.
**Equipe:** Gabriel Brustolin, Debora Dias e Hayat Rossi Azam.
**Repositório:** https://github.com/BusquemComerCimento/ProjetoExpoceepMegaHayatPereiraDiasBrustolinRossi

## Objetivo e implementação

O CRUD foi implementado para produtos. `backend/database.py` abre conexões SQLite com `sqlite3.Row`, ativa chaves estrangeiras e cria o banco vazio a partir de `bd/script.sql`. Cada rota fecha sua conexão. Inserções, alterações e exclusões usam transações e parâmetros `?`; erros provocam rollback.

## Testar manualmente

Inicie `python backend/app.py` com as dependências instaladas. No Thunder Client ou Postman, use `http://127.0.0.1:5000`. Nos POST/PUT, selecione Body JSON e envie `Content-Type: application/json`.

1. **POST /categorias** com `{"nome":"Presentes","descricao":"Kits para presentear"}`. Retorna 201 e `id_categoria`. Se o nome já existir, retorna 409; consulte GET /categorias e aproveite seu ID.
2. **POST /produtos**, usando o ID real da categoria:

```json
{
  "nome": "Kit carinho",
  "id_categoria": 1,
  "preco": 5990,
  "estoque": 5,
  "descricao": "Caneca e chocolates"
}
```

Retorna **201** e `id_produto`. O ID 1 acima é apenas exemplo; use o ID retornado no primeiro passo.

3. **GET /produtos** retorna **200** com uma lista JSON. **GET /produtos/ID** consulta um registro.
4. **PUT /produtos/ID**, enviando o mesmo objeto completo, mas com nome `Kit carinho premium`, preço `7990` e estoque `3`. Retorna **200**. Consulte novamente para verificar a gravação.
5. **DELETE /produtos/ID** retorna **200**. Repita e obtenha **404**, comprovando que o registro foi removido.

No PUT, nome, id_categoria, preco e estoque são obrigatórios. Os campos opcionais omitidos são substituídos pelos padrões: descricao/imagem null e ativo 1. Valores monetários são inteiros em centavos. IDs, preços e quantidades não aceitam booleanos, frações ou números fora do intervalo documentado nos erros. Produtos associados a pedidos ou carrinhos retornam **409** ao tentar excluir; isso preserva o histórico.

## Coleção e evidências

A coleção `KitGift-Etapa2.postman_collection.json` usa o formato Postman 2.1. Importe no Postman, mantenha `base_url` como `http://127.0.0.1:5000` e execute de 00 a 09. Os scripts de teste guardam os IDs reais, validam status e conferem valores gravados. Cada execução cria uma categoria com nome único e remove apenas o produto de teste criado naquela execução.

Capture quatro imagens mostrando método, URL, corpo enviado quando aplicável, resposta JSON e status HTTP: POST 201, GET 200, PUT 200 e DELETE 200. Essas capturas precisam ser reais, feitas no cliente utilizado. `evidencias-http.json` registra a execução por Python urllib; não é uma captura do Thunder Client/Postman.

## Dificuldades e soluções técnicas

- Caminhos relativos poderiam abrir outro banco ao iniciar por uma pasta diferente. A solução usa `Path(__file__)` para localizar o banco sempre em `bd`.
- Dados inválidos poderiam gerar erro 500. A API valida corpo JSON, campos e tipos antes do SQL e retorna 400 ou 415. Conflitos de integridade retornam 409.
- Uma conexão aberta pode manter o banco bloqueado no Windows. `contextlib.closing` fecha as conexões mesmo quando ocorre erro.

## Próximos passos

Integrar o front-end com fetch na Etapa 3. Antes de disponibilizar a API fora do laboratório, implementar autenticação e autorização das operações administrativas. As rotas de usuários, pedidos, carrinho e pagamentos ainda não fazem parte desta entrega.
