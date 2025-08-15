const SETTINGS_KEY = 'settings';

const defaultSettings = {
  autoRefreshInterval: 30,
  dataSource: 'default',
  analysisRules: ''
};

export function loadSettings() {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : { ...defaultSettings };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function initSettingsModal({
  modal,
  settingsButton,
  autoRefreshInput,
  dataSourceSelect,
  analysisRulesTextarea,
  saveButton
}) {
  const apply = () => {
    const settings = loadSettings();
    if (autoRefreshInput) {
      autoRefreshInput.value = settings.autoRefreshInterval;
    }
    if (dataSourceSelect) {
      dataSourceSelect.value = settings.dataSource;
    }
    if (analysisRulesTextarea) {
      analysisRulesTextarea.value = settings.analysisRules;
    }
  };

  if (settingsButton && modal) {
    settingsButton.addEventListener('click', () => {
      apply();
      modal.classList.remove('hidden');
    });
  }

  if (saveButton && modal) {
    saveButton.addEventListener('click', () => {
      const updated = {
        autoRefreshInterval: parseInt(autoRefreshInput.value, 10),
        dataSource: dataSourceSelect.value,
        analysisRules: analysisRulesTextarea.value
      };
      saveSettings(updated);
      modal.classList.add('hidden');
    });
  }

  // apply settings to inputs on load
  apply();
}
