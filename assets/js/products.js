/* Front-end demonstration only. sessionStorage is not authentication or a database. */
(() => {
  'use strict';
  const KEY = 'kf-products-v1';
  const PUBLIC_KEY = 'kf-public-products-v1';
  const EMPLOYEES = {E01: 'Alex Morgan', E02: 'Sam Rivera'};
  const fields = ['name', 'skiType', 'size', 'makeup', 'price', 'cost', 'quantity', 'employee', 'status'];
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = n => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(n);
  const params = new URLSearchParams(location.search);
  let products;
  let storageAvailable = true;
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    products = Array.isArray(saved) ? saved : structuredClone(window.KF_FIXTURES);
  } catch (_) {
    products = structuredClone(window.KF_FIXTURES);
    storageAvailable = false;
  }
  function store(list) {
    const publicProducts = list.filter(p => p.status === 'Active').map(p => ({
      id:p.id, name:p.name, skiType:p.skiType, size:p.size, makeup:p.makeup,
      price:p.price, status:p.status, availability:p.quantity > 0 ? 'In stock' : 'Out of stock'
    }));
    try {
      sessionStorage.setItem(PUBLIC_KEY, JSON.stringify(publicProducts));
      sessionStorage.setItem(KEY, JSON.stringify(list));
      products = list;
      return true;
    } catch (_) { return false; }
  }
  function message(text, isError=false) {
    let el = $('feedback') || $('form-errors') || $('page-error');
    if (!el) { el = document.createElement('p'); $('main').prepend(el); }
    el.className = `notice ${isError ? 'error' : 'success'}`;
    el.setAttribute('role', isError ? 'alert' : 'status');
    el.hidden = false;
    el.textContent = text;
  }
  if (!storageAvailable) message('Temporary storage is unavailable. Viewing is available, but changes cannot be saved.', true);
  const rowLink = (p, page, label) => `<a href="${page}.php?id=${encodeURIComponent(p.id)}">${label}<span class="visually-hidden"> ${esc(p.name)}</span></a>`;
  const badge = p => `<span class="badge ${p.status === 'Inactive' ? 'inactive' : ''}">${esc(p.status)}</span>`;
  function renderList() {
    if (!$('product-rows')) return;
    const query = $('search').value.trim().toLowerCase();
    const type = $('type').value;
    const status = $('status').value;
    const rows = products.filter(p => (!query || `${p.name} ${p.id}`.toLowerCase().includes(query)) && (!type || p.skiType === type) && (!status || p.status === status));
    $('total').textContent = products.length;
    $('active-count').textContent = products.filter(p => p.status === 'Active').length;
    $('pairs').textContent = products.reduce((sum,p) => sum + p.quantity, 0);
    $('result-count').textContent = `${rows.length} of ${products.length} product records`;
    $('empty').hidden = rows.length > 0;
    $('product-rows').innerHTML = rows.map(p => `<tr><td><strong>${esc(p.name)}</strong><small>${esc(p.id)}</small></td><td>${esc(p.skiType)} · ${p.size} cm<small>${esc(p.makeup)}</small></td><td>${money(p.price)}</td><td>${money(p.cost)}</td><td>${p.quantity} pairs${p.quantity === 0 ? '<small>Out of stock</small>' : ''}</td><td>${badge(p)}</td><td><div class="row-actions">${rowLink(p,'view','View')}${rowLink(p,'edit','Edit')}${rowLink(p,'delete','Remove')}</div></td></tr>`).join('');
  }
  if ($('filters')) {
    $('filters').addEventListener('submit', e => e.preventDefault());
    $('filters').addEventListener('input', renderList);
    $('filters').addEventListener('change', renderList);
    $('filters').addEventListener('reset', () => setTimeout(renderList, 0));
    $('clear-empty').addEventListener('click', () => $('filters').reset());
    $('reset-demo').addEventListener('click', () => $('reset-dialog').showModal());
    $('cancel-reset').addEventListener('click', () => $('reset-dialog').close());
    $('confirm-reset').addEventListener('click', () => {
      if (store(structuredClone(window.KF_FIXTURES))) {
        message('Sample data reset. Temporary changes have been removed.');
        $('filters').reset(); renderList(); $('reset-dialog').close();
      } else { $('reset-dialog').close(); message('Sample data could not be reset because temporary storage is unavailable.', true); }
    });
    const notes = {deleted:'Product removed from this tab’s sample data.', inactive:'Product marked inactive. Historical links have been preserved in the demonstration.'};
    if (notes[params.get('notice')]) message(notes[params.get('notice')]);
    renderList();
  }
  const needsRecord = $('detail-content') || $('remove-content') || ($('product-form') && $('product-form').dataset.mode === 'edit');
  const current = needsRecord ? products.find(p => p.id === params.get('id')) : null;
  if (needsRecord && !current) {
    $('page-error').hidden = false;
    $('page-error').textContent = 'Product not found. It may have been removed or reset. Return to Products and choose an existing record.';
    if ($('editor-layout')) $('editor-layout').hidden = true;
    return;
  }
  function removal(p) {
    if (p.history) return {kind:'inactive', title:'Preserve this product’s history', text:'This product has historical transactions. Permanent deletion is unavailable. Mark it inactive to remove it from the customer catalog while retaining history.'};
    if (p.materialLinks > 0) return {kind:'blocked', title:'Material requirements prevent deletion', text:`This product has ${p.materialLinks} material requirements. Review and remove those links in the future material-requirements workflow before deleting. You can mark the product inactive now.`};
    return {kind:'delete', title:'Confirm permanent removal', text:'This fictional record has no material requirements or historical transactions. Removing it affects only this tab’s sample data.'};
  }
  if ($('detail-content') && current) {
    const p = current;
    const policy = removal(p);
    $('detail-content').hidden = false;
    $('detail-content').innerHTML = `<div class="page-heading"><div><span class="eyebrow">${esc(p.id)} / PRODUCT DETAILS</span><h1>${esc(p.name)}</h1><p>${esc(p.skiType)} · ${p.size} cm · ${esc(p.makeup)} &nbsp; ${badge(p)}</p></div><div class="actions">${rowLink(p,'edit','Edit product')}</div></div><div class="details"><section class="panel"><h2 class="section-title">Specifications and pricing</h2><dl><div><dt>Product ID</dt><dd>${esc(p.id)}</dd></div><div><dt>Responsible employee</dt><dd>${esc(p.employee)} · ${esc(EMPLOYEES[p.employee])}</dd></div><div><dt>Ski type</dt><dd>${esc(p.skiType)}</dd></div><div><dt>Size</dt><dd>${p.size} cm</dd></div><div><dt>Construction</dt><dd>${esc(p.makeup)}</dd></div><div><dt>Status</dt><dd>${esc(p.status)}</dd></div><div><dt>Selling price</dt><dd>${money(p.price)}</dd></div><div><dt>Manufacturing cost · internal</dt><dd>${money(p.cost)}</dd></div></dl></section><aside class="panel"><span class="eyebrow">FINISHED INVENTORY</span><h2>${p.quantity} pairs</h2><p>${p.quantity === 0 ? 'Out of stock. No finished pairs currently available.' : 'Finished stock available in the workshop.'}</p><p class="notice">Finished pairs are tracked separately from raw material quantities.</p></aside></div><section class="panel danger-zone"><h2 class="section-title">Remove or discontinue</h2><p>${esc(policy.text)}</p><p><small>Sample dependencies: ${p.materialLinks} material requirements · ${p.history ? 'historical transactions present' : 'no historical transactions'}.</small></p><div class="actions"><a class="btn ${policy.kind === 'delete' ? 'danger' : ''}" href="delete.php?id=${encodeURIComponent(p.id)}">${policy.kind === 'delete' ? 'Delete product' : 'Review removal options'}</a><a class="btn" href="index.php">Back to products</a></div></section>`;
    if (params.get('notice') === 'created') message('Product added to this tab’s sample data.');
    if (params.get('notice') === 'updated') message('Product changes saved to this tab’s sample data.');
  }
  if ($('remove-content') && current) {
    const p = current, policy = removal(p), inactive = p.status === 'Inactive';
    $('remove-content').hidden = false;
    $('remove-content').innerHTML = `<h2>${esc(p.name)} <span class="muted">/ ${esc(p.id)}</span></h2><p>${esc(p.skiType)} · ${p.size} cm · ${p.quantity} pairs · ${esc(p.status)}</p><div class="notice ${policy.kind === 'delete' ? 'error' : ''}"><strong>${esc(policy.title)}</strong><p>${esc(policy.text)}</p></div><p>Material requirements: ${p.materialLinks}. Historical transactions: ${p.history ? 'present' : 'none'}.</p>${policy.kind === 'blocked' ? '<p>Permanent deletion is blocked. The material-requirements editor belongs to a later integration.</p>' : ''}${policy.kind !== 'delete' && inactive ? '<p>This product is already inactive. No change is needed.</p>' : ''}<div class="actions">${policy.kind === 'delete' ? '<button id="confirm-remove" class="danger">Confirm delete</button>' : '<button disabled>Delete unavailable</button>' + (!inactive ? '<button id="confirm-inactive" class="primary">Confirm mark inactive</button>' : '')}<a class="btn" href="view.php?id=${encodeURIComponent(p.id)}">Cancel and keep product</a></div><p><small>No change happens until you confirm. All changes are temporary demo changes.</small></p>`;
    if ($('confirm-remove')) $('confirm-remove').addEventListener('click', () => {
      // Recheck dependencies immediately before modifying the temporary records.
      if (removal(p).kind !== 'delete') return;
      if (store(products.filter(x => x.id !== p.id))) location.href = 'index.php?notice=deleted';
      else message('Product could not be removed because temporary storage is unavailable.', true);
    });
    if ($('confirm-inactive')) $('confirm-inactive').addEventListener('click', () => {
      if (store(products.map(x => x.id === p.id ? {...x,status:'Inactive'} : x))) location.href = 'index.php?notice=inactive';
      else message('Status could not be changed because temporary storage is unavailable.', true);
    });
  }
  const form = $('product-form');
  if (form) {
    const editing = form.dataset.mode === 'edit';
    const input = key => form.elements.namedItem(key);
    if (editing) {
      fields.forEach(key => input(key).value = current[key]);
      $('cancel-form').href = `view.php?id=${encodeURIComponent(current.id)}`;
    }
    function errorsFor(data) {
      const errors = {};
      if (!data.name.trim()) errors.name = 'Enter a product name.';
      else if (data.name.trim().length > 80) errors.name = 'Use 80 characters or fewer.';
      if (!['Park','Powder','Touring'].includes(data.skiType)) errors.skiType = 'Select Park, Powder, or Touring.';
      if (!['Full carbon','Hybrid'].includes(data.makeup)) errors.makeup = 'Select Full carbon or Hybrid.';
      ['size','quantity'].forEach(k => {
        const n = Number(data[k]);
        if (!data[k].trim() || !Number.isSafeInteger(n) || n < (k === 'size' ? 1 : 0)) errors[k] = k === 'size' ? 'Enter a positive whole number of centimeters.' : 'Enter a nonnegative whole number of pairs.';
      });
      ['price','cost'].forEach(k => {
        if (!/^\d+(\.\d{1,2})?$/.test(data[k]) || !Number.isFinite(Number(data[k])) || Number(data[k]) > Number.MAX_SAFE_INTEGER / 100) errors[k] = 'Enter a nonnegative USD amount with up to two decimal places.';
      });
      if (!(data.employee in EMPLOYEES)) errors.employee = 'Select a responsible employee.';
      if (!['Active','Inactive'].includes(data.status)) errors.status = 'Select Active or Inactive.';
      return errors;
    }
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const errors = errorsFor(data);
      fields.forEach(key => {
        input(key).setAttribute('aria-invalid', errors[key] ? 'true' : 'false');
        $(key+'-error').textContent = errors[key] || '';
      });
      if (Object.keys(errors).length) {
        $('form-errors').hidden = false;
        $('form-errors').textContent = 'Please correct the highlighted fields. ' + Object.values(errors).join(' ');
        $('form-errors').focus();
        return;
      }
      let nextId = '';
      if (!editing) {
        try {
          // Separate counter prevents reusing an ID after deleting a newly added record.
          const minimum = Math.max(1004, ...products.map(p => Number(p.id.slice(1))));
          const n = Math.max(minimum, Number(sessionStorage.getItem('kf-product-counter') || 1004)) + 1;
          sessionStorage.setItem('kf-product-counter', String(n)); nextId = `P${n}`;
        } catch (_) { message('Product could not be added because temporary storage is unavailable.', true); return; }
      }
      const record = {...(editing ? current : {id:nextId,materialLinks:0,history:false}), ...data,
        name:data.name.trim(), size:Number(data.size), quantity:Number(data.quantity), price:Number(data.price), cost:Number(data.cost)};
      const list = editing ? products.map(p => p.id === current.id ? record : p) : [...products,record];
      if (store(list)) location.href = `view.php?id=${encodeURIComponent(record.id)}&notice=${editing ? 'updated' : 'created'}`;
      else message('Changes could not be saved because temporary storage is unavailable. Your entries remain in the form.', true);
    });
  }
})();
