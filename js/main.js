/* ============================================
   Agent Imobiliar — main.js
   ============================================ */

// --- Load listings from JSON ---
async function loadListings() {
  const grid = document.getElementById('listings-grid');
  if (!grid) return;

  try {
    const response = await fetch('data/listings.json');
    const data = await response.json();

    data.listings.forEach(listing => {
      const priceFormatted = listing.price.toLocaleString('ro-MD');
      const pricePerM2 = Math.round(listing.price / listing.area);
      const whatsappText = encodeURIComponent('Bună ziua! Mă interesează: ' + listing.title);

      const card = document.createElement('div');
      card.className = 'group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300';

      card.innerHTML = `
        <div class="h-56 bg-slate-100 relative flex items-center justify-center overflow-hidden">
          ${listing.image ? `<img src="${listing.image}" alt="${listing.title}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">` : `<div class="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400"><iconify-icon icon="solar:gallery-wide-linear" width="32"></iconify-icon></div>`}
          <div class="absolute top-4 left-4 flex gap-2">
            <span class="bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-900 uppercase tracking-wide">${listing.district}</span>
            ${listing.type ? `<span class="bg-slate-900/95 backdrop-blur px-2.5 py-1 rounded-md text-[11px] font-semibold text-white uppercase tracking-wide">${listing.type}</span>` : ''}
          </div>
        </div>
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex justify-between items-start mb-3">
            <h3 class="text-xl font-bold tracking-tight text-slate-900">${priceFormatted} &euro;</h3>
            <span class="text-xs font-medium text-slate-500">${pricePerM2} &euro;/m&sup2;</span>
          </div>
          <p class="text-sm font-medium text-slate-700 mb-4 truncate">${listing.title}${listing.street ? ', ' + listing.street : ''}</p>
          <div class="flex items-center justify-between py-4 border-t border-slate-100 mb-4 text-slate-600">
            <div class="flex items-center gap-1.5">
              <iconify-icon icon="solar:bed-linear" class="text-slate-400"></iconify-icon>
              <span class="text-xs font-medium">${listing.rooms} cam</span>
            </div>
            <div class="flex items-center gap-1.5">
              <iconify-icon icon="solar:ruler-linear" class="text-slate-400"></iconify-icon>
              <span class="text-xs font-medium">${listing.area} m&sup2;</span>
            </div>
            <div class="flex items-center gap-1.5">
              <iconify-icon icon="solar:layers-linear" class="text-slate-400"></iconify-icon>
              <span class="text-xs font-medium">Et ${listing.floor}/${listing.totalFloors}</span>
            </div>
          </div>
          <a href="${listing.url || 'https://wa.me/37361000185?text=' + whatsappText}" target="_blank" rel="noopener" class="mt-auto block w-full text-center bg-slate-50 border border-slate-200 text-slate-900 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors group-hover:border-slate-300">${listing.url ? 'Vezi detalii' : 'Contactează'}</a>
        </div>
      `;

      grid.appendChild(card);
    });
  } catch (err) {
    // Silently fail — noscript fallback covers this
  }
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  loadListings();
});
