/* Customer interface preview. This is display separation, not authorization. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let rows = window.KF_PUBLIC_FIXTURES;
  try { const saved=JSON.parse(sessionStorage.getItem('kf-public-products-v1') || 'null'); if(Array.isArray(saved)) rows=saved; } catch (_) { /* Read-only public fixtures remain available. */ }
  function render() {
    const q=$('catalog-search').value.toLowerCase().trim(), type=$('catalog-type').value;
    const visible=rows.filter(p=>p.status==='Active' && (!q || `${p.name} ${p.size}`.toLowerCase().includes(q)) && (!type || p.skiType===type));
    $('catalog-count').textContent=`${visible.length} active product${visible.length===1?'':'s'}`;
    $('catalog-empty').hidden=visible.length>0;
    $('catalog-grid').innerHTML=visible.map(p=>`<article class="catalog-card"><div class="ski-thumb" aria-hidden="true"></div><section><span class="eyebrow">${esc(p.skiType)} / ${p.size} CM</span><h2>${esc(p.name)}</h2><p>${esc(p.makeup)} construction</p><div class="split-line"><span class="price">${new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(p.price)}</span><span class="badge ${p.availability==='Out of stock'?'warn':''}">${esc(p.availability)}</span></div><p>Price per pair · USD</p></section></article>`).join('');
  }
  $('catalog-filters').addEventListener('submit',e=>e.preventDefault());
  $('catalog-filters').addEventListener('input',render);
  $('catalog-filters').addEventListener('change',render);
  $('catalog-filters').addEventListener('reset',()=>setTimeout(render,0));
  render();
})();
