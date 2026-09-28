# Etapa 3 - integração KitGift

A interface permite cadastrar categorias e kits e consultar os produtos por fetch. Flask valida o JSON e persiste os dados no SQLite. O preço em reais é convertido em centavos.

## Validação

Sete testes de integração passaram em 28/09/2026. A sintaxe JavaScript foi validada. Testes pela interface comprovaram cadastro, listagem, persistência, validação de preço, conflito de categoria e tratamento de servidor indisponível.

## Código publicado

[Commit da integração](https://github.com/BusquemComerCimento/ProjetoExpoceepMegaHayatPereiraDiasBrustolinRossi/commit/cdb721df2124c30033696e9606c1d5bbfd3c5929).

Os sete arquivos enviados foram comparados com os arquivos locais e são idênticos. A documentação e capturas das etapas anteriores foram preservadas.

## Evidências e relatório

- [Relatório em PDF](Relatorio-Etapa3-KitGift.pdf).
- [Capturas antes/depois, listagem e SQLite](etapa3-evidencias/).

As capturas usam a aplicação na porta 5001 com banco isolado de demonstração. A execução padrão usa a porta 5000 e bd/banco.db, criado automaticamente e ignorado pelo Git. Nenhum banco, ambiente virtual ou cache deve ser enviado.

Antes de entregar, o grupo deve revisar a autoavaliação e assinar o relatório. O envio à professora é realizado pelos integrantes.
