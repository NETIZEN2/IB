export function renderPriorityFeed() {
  return `
    <div class="mb-4 flex items-center justify-between flex-shrink-0">
      <div id="filter-controls" class="flex items-center gap-2">
        <span class="text-sm font-semibold mono-font mr-2">SORT BY:</span>
        <button class="control-btn active font-semibold py-1 px-3" data-sort="relevance">Most Relevant</button>
        <button class="control-btn font-semibold py-1 px-3" data-sort="time">Latest</button>
      </div>
      <button id="export-btn" class="control-btn font-semibold py-1 px-3 text-sm flex items-center gap-1"><i class="ph ph-download-simple"></i> Export SITREP</button>
    </div>
    <main id="priority-feed" class="flex-grow space-y-4 overflow-y-auto pr-2"></main>
  `;
}
