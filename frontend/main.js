'use strict';
const el = id => document.getElementById(id);
const currency = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});
let categories = [];
let products = [];
let savingProduct = false;
function message(id, text, error = false) {
  el(id).textContent = text;
  el(id).className = error ? 'error' : 'success';
}
async function api(path, data) {
  let response;
  try {
    response = await fetch(path, {signal: AbortSignal.timeout(12000), ...(data ? {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
    } : {})});
  } catch {
    throw new Error(data ? 'Não foi possível confirmar o envio. Verifique a conexão e atualize a lista antes de tentar novamente.' : 'Não foi possível acessar o servidor. Verifique se ele está ligado e tente atualizar novamente.');
  }
  let result;
  try { result = await response.json(); }
  catch { throw new Error('O servidor retornou uma resposta inesperada. Atualize a lista antes de tentar novamente.'); }
  if (!response.ok) throw new Error(result.erro || 'Não foi possível concluir a operação.');
  return result;
}
function node(tag, text, className) {
  const result = document.createElement(tag);
  result.textContent = text;
  if (className) result.className = className;
  return result;
}
function renderProducts() {
  el('products').replaceChildren();
  for (const p of products) {
    const card = node('article', '', 'card');
    card.append(node('span', categories.find(c => c.id_categoria === p.id_categoria)?.nome || 'Categoria #' + p.id_categoria, 'tag'));
    card.append(node('h3', p.nome), node('p', p.descricao || 'Um presente esperando a sua ocasião.'));
    const bottom = node('div', '', 'card-bottom');
    bottom.append(node('span', currency.format(p.preco / 100), 'price'), node('span', p.estoque + ' em estoque', 'stock'));
    card.append(bottom);
    if (!p.ativo) card.append(node('p', 'Kit inativo'));
    el('products').append(card);
  }
  el('count').textContent = products.length;
}
async function carregarCategorias(selected) {
  categories = await api('/categorias');
  const previousSelection = selected || el('categoria').value;
  if (el('category-message').classList.contains('error')) message('category-message', '');
  el('categoria').replaceChildren(new Option('Selecione uma categoria', ''));
  categories.filter(c => c.ativo).forEach(c => el('categoria').add(new Option(c.nome, c.id_categoria)));
  const available = categories.some(c => c.ativo);
  el('categoria').disabled = !available;
  el('save-product').disabled = savingProduct || !available;
  if (previousSelection) el('categoria').value = previousSelection;
  if (!available) {
    document.querySelector('details').open = true;
    message('category-message', 'Adicione sua primeira categoria para cadastrar um kit.');
  }
  renderProducts();
}
async function carregarProdutos() {
  el('refresh').disabled = true;
  try {
    products = await api('/produtos');
    renderProducts();
    message('list-message', products.length ? '' : 'Sua coleção começa aqui. Cadastre o primeiro kit no formulário acima.');
    return true;
  } catch (error) {
    message('list-message', error.message + (products.length ? ' A lista exibida pode estar desatualizada.' : ''), true);
    return false;
  } finally { el('refresh').disabled = false; }
}
async function cadastrarProduto(event) {
  event.preventDefault();
  if (savingProduct) return;
  const price = el('preco').value.trim().replace(',', '.');
  const [whole, fraction = ''] = price.split('.');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  if (!/^\d+(\.\d{1,2})?$/.test(price) || cents > 2147483647 || !el('nome').value.trim()) {
    message('product-message', 'Confira o nome e o preço. Use até duas casas decimais e no máximo R$ 21.474.836,47.', true); return;
  }
  savingProduct = true;
  message('product-message', '');
  el('save-product').disabled = true;
  el('save-product').textContent = 'Salvando…';
  try {
    await api('/produtos', {nome: el('nome').value.trim(), id_categoria: Number(el('categoria').value), preco: cents, estoque: Number(el('estoque').value), descricao: el('descricao').value.trim() || null});
    el('product-form').reset();
    message('product-message', 'Kit cadastrado com sucesso!');
    await carregarProdutos();
  } catch (error) { message('product-message', error.message, true); }
  finally { savingProduct = false; el('save-product').disabled = !categories.some(c => c.ativo); el('save-product').textContent = 'Cadastrar kit ↗'; }
}
async function cadastrarCategoria(event) {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.disabled = true;
  try {
    const result = await api('/categorias', {nome: el('new-category').value.trim()});
    el('category-form').reset();
    message('category-message', 'Categoria cadastrada com sucesso!');
    try { await carregarCategorias(result.id_categoria); }
    catch { message('category-message', 'Categoria salva. Clique em Atualizar lista para recarregar as opções.', true); }
  } catch (error) { message('category-message', error.message, true); }
  finally { button.disabled = false; }
}
async function iniciar() {
  await Promise.all([carregarCategorias().catch(error => {
    document.querySelector('details').open = true;
    message('category-message', error.message, true);
  }), carregarProdutos()]);
}
el('product-form').addEventListener('submit', cadastrarProduto);
el('category-form').addEventListener('submit', cadastrarCategoria);
el('refresh').addEventListener('click', iniciar);
iniciar();
