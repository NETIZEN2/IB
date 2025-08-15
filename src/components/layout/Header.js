export function renderHeader() {
  return `
    <header class="mb-4 border-b-2 border-black pb-4 flex-shrink-0">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-black">Intelligence Briefing</h1>
          <p class="text-gray-600 mono-font text-sm">Curated analysis of global events.</p>
        </div>
        <button id="settings-btn" class="control-btn font-semibold p-2"><i class="ph ph-gear text-xl"></i></button>
      </div>
      <div class="mt-4 flex gap-2">
        <input id="rfi-search-input" type="text" placeholder="Request for Information (e.g., 'AUKUS pillar 2 status')" class="brutalist-pane w-full p-2 mono-font text-sm focus:outline-none focus:border-black">
        <button id="rfi-search-btn" class="control-btn font-semibold py-1 px-3"><i class="ph ph-magnifying-glass"></i></button>
      </div>
    </header>
  `;
}
