/* Raw Material Management front-end demonstration (Member B).
   sessionStorage is not authentication or a database; it keeps temporary edits for this browser tab only. */
(() => {
  'use strict';
  const KEY = 'kf-materials-v1';
  const ADJ_KEY = 'kf-material-adjustments-v1';
  const COUNTER_KEY = 'kf-material-counter';
  const ADJ_COUNTER_KEY = 'kf-adjustment-counter';
  const EMPLOYEES = {E01: 'Alex Morgan', E02: 'Sam Rivera'};
  const UNITS = ['sq m', 'm', 'kg', 'L', 'each'];
  const ADJUSTMENT_TYPES = {
    'delivery': {reason: 'Delivery', sign: 1, label: 'Delivery received'},
    'production': {reason: 'Production use', sign: -1, label: 'Used in production'},
    'correction-add': {reason: 'Correction', sign: 1, label: 'Count correction (add)'},
    'correction-subtract': {reason: 'Correction', sign: -1, label: 'Count correction (subtract)'}
  };
  const detailFields = ['name', 'description', 'unit', 'unitCost', 'reorderLevel', 'status'];
  const createFields = ['name', 'description', 'unit', 'unitCost', 'quantity', 'reorderLevel', 'lastPurchase', 'employee', 'status'];

  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = n => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(n);
  const qty = n => new Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(n);
  const amountPattern = /^\d+(\.\d{1,2})?$/;
  // Use the browser's local date and time, not UTC, so evening entries are not dated tomorrow.
  const pad = n => String(n).padStart(2, '0');
  const localNow = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const today = () => localNow().slice(0, 10);
  const stamp = iso => new Date(iso).toLocaleString('en-US', {month:'short', day:'numeric', year:'numeric', hour:'numeric', minute:'2-digit'});
  const params = new URLSearchParams(location.search);

  let materials, adjustments;
  let storageAvailable = true;
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    const savedAdj = JSON.parse(sessionStorage.getItem(ADJ_KEY) || 'null');
    materials = Array.isArray(saved) ? saved : structuredClone(window.KF_MATERIAL_FIXTURES.materials);
    adjustments = Array.isArray(savedAdj) ? savedAdj : structuredClone(window.KF_MATERIAL_FIXTURES.adjustments);
  } catch (_) {
    materials = structuredClone(window.KF_MATERIAL_FIXTURES.materials);
    adjustments = structuredClone(window.KF_MATERIAL_FIXTURES.adjustments);
    storageAvailable = false;
  }

  function store(list, adjList = adjustments) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(list));
      sessionStorage.setItem(ADJ_KEY, JSON.stringify(adjList));
      materials = list; adjustments = adjList;
      return true;
    } catch (_) { return false; }
  }
  function nextId(counterKey, prefix, minimum, existing) {
    // A separate counter prevents reusing an ID after a new record is deleted.
    const highest = Math.max(minimum, ...existing.map(id => Number(id.slice(1))));
    const n = Math.max(highest, Number(sessionStorage.getItem(counterKey) || minimum)) + 1;
    sessionStorage.setItem(counterKey, String(n));
    return `${prefix}${n}`;
  }
  function message(text, isError = false) {
    let el = $('feedback') || $('form-errors') || $('page-error');
    if (!el) { el = document.createElement('p'); $('main').prepend(el); }
    el.className = `notice ${isError ? 'error' : 'success'}`;
    el.setAttribute('role', isError ? 'alert' : 'status');
    el.hidden = false;
    el.textContent = text;
  }
  if (!storageAvailable) message('Temporary storage is unavailable. Viewing is available, but changes cannot be saved.', true);

  // Product names come from the teammate's product sample data, including this tab's edits.
  function productName(id) {
    let list = window.KF_FIXTURES || [];
    try { const saved = JSON.parse(sessionStorage.getItem('kf-products-v1') || 'null'); if (Array.isArray(saved)) list = saved; } catch (_) {}
    const p = list.find(x => x.id === id);
    return p ? p.name : 'Product no longer in sample data';
  }
  const isLow = m => m.status === 'Active' && m.quantity <= m.reorderLevel;
  // Any logged stock change (initial count, delivery, production use, or correction) is inventory history.
  const historyFor = m => adjustments.filter(a => a.material === m.id);
  // The unit is locked once earlier records depend on it, because changing it would relabel them without converting.
  const unitLocked = m => m.quantity > 0 || historyFor(m).length > 0 || m.products.length > 0;
  const rowLink = (m, page, label) => `<a href="${page}.php?id=${encodeURIComponent(m.id)}">${label}<span class="visually-hidden"> ${esc(m.name)}</span></a>`;
  const statusBadge = m => `<span class="badge ${m.status === 'Inactive' ? 'inactive' : ''}">${esc(m.status)}</span>`;
  const lowBadge = m => isLow(m) ? ' <span class="badge warn">Low stock</span>' : '';

  /* ---------- UC-M02 Read: list, search and filters ---------- */
  function renderList() {
    if (!$('material-rows')) return;
    const query = $('search').value.trim().toLowerCase();
    const stock = $('stock').value;
    const status = $('status').value;
    const rows = materials.filter(m =>
      (!query || `${m.name} ${m.id}`.toLowerCase().includes(query)) &&
      (!stock || (stock === 'low' ? isLow(m) : !isLow(m))) &&
      (!status || m.status === status));
    $('total').textContent = materials.length;
    $('low-count').textContent = materials.filter(isLow).length;
    $('value').textContent = money(materials.filter(m => m.status === 'Active').reduce((sum, m) => sum + m.quantity * m.unitCost, 0));
    $('result-count').textContent = `${rows.length} of ${materials.length} material records`;
    $('empty').hidden = rows.length > 0;
    $('material-rows').innerHTML = rows.map(m => `<tr><td><strong>${esc(m.name)}</strong><small>${esc(m.id)}</small></td><td>${esc(m.unit)}</td><td>${money(m.unitCost)}</td><td>${qty(m.quantity)} ${esc(m.unit)}${lowBadge(m)}</td><td>${qty(m.reorderLevel)} ${esc(m.unit)}</td><td>${statusBadge(m)}</td><td><div class="row-actions">${rowLink(m,'view','View')}${rowLink(m,'edit','Edit')}${rowLink(m,'delete','Remove')}</div></td></tr>`).join('');
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
      if (store(structuredClone(window.KF_MATERIAL_FIXTURES.materials), structuredClone(window.KF_MATERIAL_FIXTURES.adjustments))) {
        message('Sample data reset. Temporary changes have been removed.');
        $('filters').reset(); renderList(); $('reset-dialog').close();
      } else { $('reset-dialog').close(); message('Sample data could not be reset because temporary storage is unavailable.', true); }
    });
    if (params.get('filter') === 'low') $('stock').value = 'low';
    const notes = {deleted: 'Material removed from this tab’s sample data.', inactive: 'Material marked inactive. Its history and product links have been preserved.'};
    if (notes[params.get('notice')]) message(notes[params.get('notice')]);
    renderList();
  }

  /* ---------- Load the requested record for view, edit and delete ---------- */
  const needsRecord = $('detail-content') || $('remove-content') || ($('material-form') && $('material-form').dataset.mode === 'edit');
  const current = needsRecord ? materials.find(m => m.id === params.get('id')) : null;
  if (needsRecord && !current) {
    $('page-error').hidden = false;
    $('page-error').textContent = 'Material not found. It may have been removed or reset. Return to Raw materials and choose an existing record.';
    if ($('editor-layout')) $('editor-layout').hidden = true;
    return;
  }

  /* ---------- UC-M04 rules: delete only unused records with zero stock ---------- */
  function removal(m) {
    const reasons = [];
    if (m.products.length) reasons.push(`it is used in ${m.products.length} product${m.products.length > 1 ? 's' : ''}`);
    if (historyFor(m).length) reasons.push('it has stock history');
    if (reasons.length) return {kind: 'inactive', title: 'Preserve this material’s history', text: `Permanent deletion is unavailable because ${reasons.join(' and ')}. Mark it inactive to retire it while keeping usage and cost history for reporting.`};
    if (m.quantity > 0) return {kind: 'stock', title: 'Stock on hand blocks deletion', text: `This material still has ${qty(m.quantity)} ${m.unit} on hand. Only materials with zero stock and no history can be deleted. Mark it inactive to retire it.`};
    return {kind: 'delete', title: 'Confirm permanent removal', text: 'This fictional record has zero stock, no product links, and no stock history. Removing it affects only this tab’s sample data.'};
  }

  /* ---------- UC-M02 Read: details page ---------- */
  if ($('detail-content') && current) {
    const m = current, policy = removal(m);
    const log = adjustments.filter(a => a.material === m.id).sort((a, b) => b.at.localeCompare(a.at));
    const productList = m.products.length
      ? `<ul class="plain-list">${m.products.map(id => `<li>${esc(productName(id))} <span class="muted">/ ${esc(id)}</span></li>`).join('')}</ul>`
      : '<p class="muted">Not linked to any product.</p>';
    const logRows = log.length
      ? log.map(a => `<tr><td>${esc(stamp(a.at))}</td><td>${esc(a.reason)}</td><td class="${a.change < 0 ? 'neg' : 'pos'}">${a.change > 0 ? '+' : '−'}${qty(Math.abs(a.change))} ${esc(m.unit)}</td><td>${esc(a.employee)} · ${esc(EMPLOYEES[a.employee] || 'Unknown')}</td></tr>`).join('')
      : `<tr><td colspan="4" class="muted">No stock changes recorded yet.</td></tr>`;
    $('detail-content').hidden = false;
    $('detail-content').innerHTML = `<div class="page-heading"><div><span class="eyebrow">${esc(m.id)} / MATERIAL DETAILS</span><h1>${esc(m.name)}</h1><p>${money(m.unitCost)} per ${m.unit === 'each' ? 'piece' : esc(m.unit)} &nbsp; ${statusBadge(m)}${lowBadge(m)}</p></div><div class="actions">${rowLink(m,'edit','Edit or adjust stock')}</div></div>
      ${isLow(m) ? `<div class="notice warn" role="status"><strong>Low stock.</strong> ${qty(m.quantity)} ${esc(m.unit)} on hand is at or below the reorder level of ${qty(m.reorderLevel)} ${esc(m.unit)}. Consider reordering before production is delayed.</div>` : ''}
      <div class="details"><section class="panel"><h2 class="section-title">Material information</h2><dl><div><dt>Material ID</dt><dd>${esc(m.id)}</dd></div><div><dt>Status</dt><dd>${esc(m.status)}</dd></div><div><dt>Unit of measure</dt><dd>${esc(m.unit)}</dd></div><div><dt>Unit cost · internal</dt><dd>${money(m.unitCost)}</dd></div><div><dt>Reorder level</dt><dd>${qty(m.reorderLevel)} ${esc(m.unit)}</dd></div><div><dt>Most recent purchase</dt><dd>${m.lastPurchase ? esc(m.lastPurchase) : 'None recorded'}</dd></div><div class="full"><dt>Description</dt><dd>${m.description ? esc(m.description) : '—'}</dd></div></dl></section>
      <aside class="panel"><span class="eyebrow">QUANTITY ON HAND</span><h2>${qty(m.quantity)} ${esc(m.unit)}</h2><p>Stock value: ${money(m.quantity * m.unitCost)}</p><p class="notice">Stock changes only through a recorded adjustment with a reason and an employee.</p><h3>Used in products</h3>${productList}</aside></div>
      <section class="panel" style="margin-top:24px"><h2 class="section-title">Stock change history</h2><div class="table-wrap"><table><caption class="visually-hidden">Stock adjustments for ${esc(m.name)}, newest first</caption><thead><tr><th scope="col">Date</th><th scope="col">Reason</th><th scope="col">Change</th><th scope="col">Recorded by</th></tr></thead><tbody>${logRows}</tbody></table></div></section>
      <section class="panel danger-zone"><h2 class="section-title">Remove or retire</h2><p>${esc(policy.text)}</p><div class="actions"><a class="btn ${policy.kind === 'delete' ? 'danger' : ''}" href="delete.php?id=${encodeURIComponent(m.id)}">${policy.kind === 'delete' ? 'Delete material' : 'Review removal options'}</a><a class="btn" href="index.php">Back to raw materials</a></div></section>`;
    const notes = {created: 'Material added to this tab’s sample data.', updated: 'Material details saved to this tab’s sample data.', adjusted: 'Stock adjustment recorded in this tab’s sample data.'};
    if (notes[params.get('notice')]) message(notes[params.get('notice')]);
  }

  /* ---------- UC-M04 Delete or inactivate ---------- */
  if ($('remove-content') && current) {
    const m = current, policy = removal(m), inactive = m.status === 'Inactive';
    $('remove-content').hidden = false;
    $('remove-content').innerHTML = `<h2>${esc(m.name)} <span class="muted">/ ${esc(m.id)}</span></h2><p>${qty(m.quantity)} ${esc(m.unit)} on hand · ${esc(m.status)}</p><div class="notice ${policy.kind === 'delete' ? 'error' : ''}"><strong>${esc(policy.title)}</strong><p>${esc(policy.text)}</p></div><p>Product links: ${m.products.length}. Stock history records: ${historyFor(m).length}.</p>${policy.kind !== 'delete' && inactive ? '<p>This material is already inactive. No change is needed.</p>' : ''}<div class="actions">${policy.kind === 'delete' ? '<button id="confirm-remove" class="danger">Confirm delete</button>' : '<button disabled>Delete unavailable</button>' + (!inactive ? '<button id="confirm-inactive" class="primary">Confirm mark inactive</button>' : '')}<a class="btn" href="view.php?id=${encodeURIComponent(m.id)}">Cancel and keep material</a></div><p><small>No change happens until you confirm. All changes are temporary demo changes.</small></p>`;
    if ($('confirm-remove')) $('confirm-remove').addEventListener('click', () => {
      // Recheck the rules immediately before changing the temporary records.
      if (removal(m).kind !== 'delete') return;
      if (store(materials.filter(x => x.id !== m.id))) location.href = 'index.php?notice=deleted';
      else message('Material could not be removed because temporary storage is unavailable.', true);
    });
    if ($('confirm-inactive')) $('confirm-inactive').addEventListener('click', () => {
      if (store(materials.map(x => x.id === m.id ? {...x, status: 'Inactive'} : x))) location.href = 'index.php?notice=inactive';
      else message('Status could not be changed because temporary storage is unavailable.', true);
    });
  }

  /* ---------- Shared form helpers ---------- */
  function showErrors(form, keys, errors, summaryId) {
    keys.forEach(key => {
      const input = form.elements.namedItem(key);
      if (input) input.setAttribute('aria-invalid', errors[key] ? 'true' : 'false');
      if ($(key + '-error')) $(key + '-error').textContent = errors[key] || '';
    });
    if (Object.keys(errors).length) {
      $(summaryId).hidden = false;
      $(summaryId).textContent = 'Please correct the highlighted fields. ' + Object.values(errors).join(' ');
      $(summaryId).focus();
      return true;
    }
    $(summaryId).hidden = true;
    return false;
  }
  function detailErrors(data, selfId) {
    const errors = {};
    const name = data.name.trim();
    if (!name) errors.name = 'Enter a material name.';
    else if (name.length > 80) errors.name = 'Use 80 characters or fewer.';
    else {
      const dup = materials.find(m => m.id !== selfId && m.name.trim().toLowerCase() === name.toLowerCase());
      if (dup) errors.name = `A material with this name already exists (${dup.id}).`;
    }
    if (data.description.length > 255) errors.description = 'Use 255 characters or fewer.';
    if (!UNITS.includes(data.unit)) errors.unit = 'Select a unit of measure.';
    if (!amountPattern.test(data.unitCost)) errors.unitCost = 'Enter a nonnegative USD amount with up to two decimal places.';
    if (!amountPattern.test(data.reorderLevel)) errors.reorderLevel = 'Enter a reorder level of zero or more, up to two decimal places.';
    if (!['Active', 'Inactive'].includes(data.status)) errors.status = 'Select Active or Inactive.';
    return errors;
  }

  /* ---------- UC-M01 Create and UC-M03 Update details ---------- */
  const form = $('material-form');
  if (form) {
    const editing = form.dataset.mode === 'edit';
    const input = key => form.elements.namedItem(key);
    if (editing) {
      detailFields.forEach(key => input(key).value = current[key]);
      $('cancel-form').href = `view.php?id=${encodeURIComponent(current.id)}`;
      $('current-stock').textContent = `${qty(current.quantity)} ${current.unit}`;
      if (unitLocked(current)) {
        input('unit').disabled = true;
        $('unit-help').textContent = 'Locked because this material has stock, stock history, or product links. Changing it would relabel earlier records without converting them.';
      }
    } else if (input('lastPurchase')) {
      input('lastPurchase').max = today();
    }
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      // A disabled field is not submitted, so a locked unit keeps the stored value.
      if (editing && unitLocked(current)) data.unit = current.unit;
      const errors = detailErrors(data, editing ? current.id : null);
      if (!editing) {
        if (!amountPattern.test(data.quantity)) errors.quantity = 'Enter a starting quantity of zero or more, up to two decimal places.';
        if (data.lastPurchase && data.lastPurchase > today()) errors.lastPurchase = 'The purchase date cannot be in the future.';
        if (!(data.employee in EMPLOYEES)) errors.employee = 'Select the employee recording this material.';
      }
      if (showErrors(form, editing ? detailFields : createFields, errors, 'form-errors')) return;

      let record, adjList = adjustments;
      if (editing) {
        record = {...current, name: data.name.trim(), description: data.description.trim(), unit: data.unit,
          unitCost: Number(data.unitCost), reorderLevel: Number(data.reorderLevel), status: data.status};
      } else {
        let id;
        try { id = nextId(COUNTER_KEY, 'M', 2006, materials.map(m => m.id)); }
        catch (_) { message('Material could not be added because temporary storage is unavailable.', true); return; }
        record = {id, name: data.name.trim(), description: data.description.trim(), unit: data.unit, unitCost: Number(data.unitCost),
          quantity: Number(data.quantity), reorderLevel: Number(data.reorderLevel), lastPurchase: data.lastPurchase, status: data.status, products: []};
        if (record.quantity > 0) {
          // The starting count is logged so the stock history explains where the first quantity came from.
          const adjId = nextId(ADJ_COUNTER_KEY, 'A', 3005, adjustments.map(a => a.id));
          adjList = [{id: adjId, material: id, employee: data.employee, change: record.quantity, reason: 'Initial count', at: localNow()}, ...adjustments];
        }
      }
      const list = editing ? materials.map(m => m.id === current.id ? record : m) : [...materials, record];
      if (store(list, adjList)) location.href = `view.php?id=${encodeURIComponent(record.id)}&notice=${editing ? 'updated' : 'created'}`;
      else message('Changes could not be saved because temporary storage is unavailable. Your entries remain in the form.', true);
    });
  }

  /* ---------- UC-M03 Update: record a stock adjustment ---------- */
  const adjForm = $('adjust-form');
  if (adjForm && current) {
    const preview = () => {
      const type = ADJUSTMENT_TYPES[adjForm.elements.namedItem('type').value];
      const amount = adjForm.elements.namedItem('amount').value;
      $('adjust-preview').textContent = type && amountPattern.test(amount) && Number(amount) > 0
        ? `New quantity on hand: ${qty(current.quantity + type.sign * Number(amount))} ${current.unit}`
        : `Current quantity on hand: ${qty(current.quantity)} ${current.unit}`;
    };
    adjForm.addEventListener('input', () => {
      // Clear earlier errors as soon as the employee changes the entry.
      $('adjust-errors').hidden = true;
      ['type', 'amount', 'adjEmployee'].forEach(k => { $(k + '-error').textContent = ''; adjForm.elements.namedItem(k).setAttribute('aria-invalid', 'false'); });
      preview();
    });
    preview();
    adjForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(adjForm));
      const type = ADJUSTMENT_TYPES[data.type];
      const errors = {};
      if (!type) errors.type = 'Select the reason for this stock change.';
      if (!amountPattern.test(data.amount) || Number(data.amount) <= 0) errors.amount = 'Enter an amount greater than zero, up to two decimal places.';
      if (!(data.adjEmployee in EMPLOYEES)) errors.adjEmployee = 'Select the employee making this change.';
      if (type && !errors.amount && current.quantity + type.sign * Number(data.amount) < 0) {
        errors.amount = `This would reduce inventory below zero. Only ${qty(current.quantity)} ${current.unit} is on hand.`;
      }
      if (showErrors(adjForm, ['type', 'amount', 'adjEmployee'], errors, 'adjust-errors')) return;
      let adjId;
      try { adjId = nextId(ADJ_COUNTER_KEY, 'A', 3005, adjustments.map(a => a.id)); }
      catch (_) { message('The adjustment could not be saved because temporary storage is unavailable.', true); return; }
      const change = type.sign * Number(data.amount);
      const updated = {...current, quantity: Math.round((current.quantity + change) * 100) / 100,
        lastPurchase: type.reason === 'Delivery' ? today() : current.lastPurchase};
      const entry = {id: adjId, material: current.id, employee: data.adjEmployee, change, reason: type.reason, at: localNow()};
      if (store(materials.map(m => m.id === current.id ? updated : m), [entry, ...adjustments])) location.href = `view.php?id=${encodeURIComponent(current.id)}&notice=adjusted`;
      else message('The adjustment could not be saved because temporary storage is unavailable.', true);
    });
  }
})();
