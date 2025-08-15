export function ingestDocuments(files = []) {
  return files.map(file => ({
    title: file.name || 'Document',
    content: file.text || '',
    source: 'upload',
    timestamp: Date.now()
  }));
}
