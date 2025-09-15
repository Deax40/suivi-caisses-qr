'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export type Tool = {
  hash: string;
  name: string;
  location: string;
  status: string;
  updatedAt: string;
  notes: string;
};

type ToolContextValue = {
  tools: Tool[];
  updateTool: (hash: string, data: Partial<Tool>) => void;
  addTool: (tool: Tool) => void;
};

const ToolContext = createContext<ToolContextValue | undefined>(undefined);

const initialTools: Tool[] = [
  {
    hash: '123abc',
    name: 'Perceuse',
    location: 'Gleizé',
    status: 'OK',
    updatedAt: new Date().toISOString(),
    notes: ''
  }
];

export function ToolProvider({ children }: { children: ReactNode }) {
  const [tools, setTools] = useState<Tool[]>(initialTools);

  const updateTool = (hash: string, data: Partial<Tool>) => {
    setTools(prev =>
      prev.map(t =>
        t.hash === hash ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const addTool = (tool: Tool) => {
    setTools(prev => [
      ...prev,
      { ...tool, updatedAt: new Date().toISOString() }
    ]);
  };

  return (
    <ToolContext.Provider value={{ tools, updateTool, addTool }}>
      {children}
    </ToolContext.Provider>
  );
}

export function useTools() {
  const ctx = useContext(ToolContext);
  if (!ctx) throw new Error('useTools must be used within ToolProvider');
  return ctx;
}
