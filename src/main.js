import { initPriorityFeed } from './components/PriorityFeed.js';
import { initAnalysisPanel } from './components/AnalysisPanel.js';
import { initSettingsModal } from './components/SettingsModal.js';

document.addEventListener('DOMContentLoaded', () => {
  initPriorityFeed();
  initAnalysisPanel();
  initSettingsModal({
    modal: document.getElementById('modal-container'),
    settingsButton: document.getElementById('settings-btn'),
    autoRefreshInput: document.getElementById('auto-refresh'),
    dataSourceSelect: document.getElementById('data-source'),
    analysisRulesTextarea: document.getElementById('analysis-rules'),
    saveButton: document.getElementById('save-settings')
  });
});
