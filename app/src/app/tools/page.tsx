'use client';
import { useState } from 'react';
import { useTools, Tool } from '@/context/ToolContext';

export default function ToolsPage() {
  const { tools, updateTool } = useTools();
  const [query, setQuery] = useState('');
  const filtered = tools.filter(
    t =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.hash.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Outils</h1>
      <input
        placeholder="Rechercher..."
        className="border p-2 mb-4 w-full max-w-sm"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {filtered.length === 0 && <p>Aucun outil trouvé.</p>}
      <ul className="space-y-4">
        {filtered.map(tool => (
          <ToolItem key={tool.hash} tool={tool} onSave={updateTool} />
        ))}
      </ul>
    </div>
  );
}

function ToolItem({
  tool,
  onSave
}: {
  tool: Tool;
  onSave: (hash: string, data: Partial<Tool>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(tool);

  const save = () => {
    onSave(tool.hash, form);
    setEditing(false);
  };

  return (
    <li className="border p-4">
      {editing ? (
        <div className="space-y-2">
          <input
            className="w-full border p-1"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Nom"
          />
          <input
            className="w-full border p-1"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            placeholder="Localisation"
          />
          <input
            className="w-full border p-1"
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            placeholder="État"
          />
          <textarea
            className="w-full border p-1"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            placeholder="Notes"
          />
          <button
            onClick={save}
            className="bg-green-600 text-white px-2 py-1"
          >
            Enregistrer
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>{tool.name}</strong> ({tool.hash})
          </p>
          <p>Localisation: {tool.location}</p>
          <p>État: {tool.status}</p>
          {tool.notes && <p>Notes: {tool.notes}</p>}
          <p className="text-xs text-gray-500">
            Dernière mise à jour: {new Date(tool.updatedAt).toLocaleString()}
          </p>
          <button
            onClick={() => {
              setEditing(true);
              setForm(tool);
            }}
            className="mt-2 bg-blue-600 text-white px-2 py-1"
          >
            Modifier
          </button>
        </div>
      )}
    </li>
  );
}
