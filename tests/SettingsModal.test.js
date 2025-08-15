import test from 'node:test';
import assert from 'node:assert';
import { initSettingsModal } from '../src/components/SettingsModal.js';

test('applies stored settings and persists changes', () => {
  const storage = {};
  global.localStorage = {
    getItem: (key) => storage[key] || null,
    setItem: (key, value) => { storage[key] = value; },
    removeItem: (key) => { delete storage[key]; }
  };

  let saveHandler;
  const elements = {
    modal: { classList: { add: () => {}, remove: () => {} } },
    settingsButton: { addEventListener: () => {} },
    autoRefreshInput: { value: '', addEventListener: () => {} },
    dataSourceSelect: { value: '', addEventListener: () => {} },
    analysisRulesTextarea: { value: '', addEventListener: () => {} },
    saveButton: { addEventListener: (event, cb) => { if (event === 'click') saveHandler = cb; } }
  };

  storage['settings'] = JSON.stringify({ autoRefreshInterval: 60, dataSource: 'alt', analysisRules: 'rule1' });

  initSettingsModal(elements);

  assert.equal(elements.autoRefreshInput.value, 60);
  assert.equal(elements.dataSourceSelect.value, 'alt');
  assert.equal(elements.analysisRulesTextarea.value, 'rule1');

  elements.autoRefreshInput.value = 30;
  elements.dataSourceSelect.value = 'default';
  elements.analysisRulesTextarea.value = 'rule2';

  saveHandler();

  assert.deepStrictEqual(JSON.parse(storage['settings']), {
    autoRefreshInterval: 30,
    dataSource: 'default',
    analysisRules: 'rule2'
  });
});
