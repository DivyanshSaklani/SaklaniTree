/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Shield, Sparkles, Sliders, Layers, Users, BookOpen } from 'lucide-react';
import { Person, ViewMode } from './types';
import { rawFamilyTree, flattenedPeople, generationLabels } from './data';

// Components
import { StatsBanner } from './components/StatsBanner';
import { SearchControl } from './components/SearchControl';
import { TreeView } from './components/TreeView';
import { TimelineView } from './components/TimelineView';
import { DirectoryView } from './components/DirectoryView';
import { ProfileInspector } from './components/ProfileInspector';

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(rawFamilyTree);
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set<string>());

  // Build the fast O(1) parent mapping lookup
  const lookupMap = useMemo(() => {
    const map = new Map<string, Person>();
    flattenedPeople.forEach(p => map.set(p.id, p));
    return map;
  }, []);

  // Root's first level children for quick lineage buttons
  const rootChildren = useMemo(() => {
    return rawFamilyTree.children || [];
  }, []);

  // Filter matched people count
  const matchingPeople = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return flattenedPeople.filter(p => p.name.toLowerCase().includes(term));
  }, [searchTerm]);

  // Handler to toggle collapse on dynamic branches
  const handleToggleCollapse = useCallback((nodeId: string) => {
    setCollapsedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  // Expand all collapsible branches completely
  const handleExpandAll = useCallback(() => {
    setCollapsedNodes(new Set<string>());
  }, []);

  // Collapse all except immediate 1st level branches
  const handleCollapseAll = useCallback(() => {
    const collapsed = new Set<string>();
    flattenedPeople.forEach(person => {
      if (person.children && person.children.length > 0 && person.generation >= 1) {
        collapsed.add(person.id);
      }
    });
    setCollapsedNodes(collapsed);
  }, []);

  // Setup auto-expansion trigger for matched search results
  useEffect(() => {
    if (searchTerm && matchingPeople.length > 0) {
      setCollapsedNodes(prev => {
        const next = new Set(prev);
        matchingPeople.forEach(match => {
          let current = match;
          while (current.parentId) {
            const parent = lookupMap.get(current.parentId);
            if (parent) {
              next.delete(parent.id); // Parent should be expanded
              current = parent;
            } else {
              break;
            }
          }
        });
        return next;
      });
    }
  }, [searchTerm, matchingPeople, lookupMap]);

  // Fast shortcut to focal-jump and inspect a child patriarch branch
  const handleBrowseBranch = (branchId: string) => {
    const target = lookupMap.get(branchId);
    if (target) {
      setSelectedPerson(target);
      // Ensure branch parent (Root) is expanded
      setCollapsedNodes(prev => {
        const next = new Set(prev);
        next.delete('dharamdatt');
        return next;
      });
    }
  };

  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleCloseInspector = () => {
    setSelectedPerson(null);
  };

  // Calculate unique stats counts
  const totalMembers = flattenedPeople.length;
  const maxGeneration = useMemo(() => {
    return Math.max(...flattenedPeople.map(p => p.generation));
  }, []);

  return (
    <div className="min-h-screen bg-[#fbf7ee] text-[#312111] flex flex-col font-sans transition-colors selection:bg-amber-100 selection:text-amber-900" id="family-tree-app">
      {/* Decorative top header aesthetic banner */}
      <header className="bg-gradient-to-b from-[#1b1006] to-[#2a1a0c] text-white py-6 px-4 md:px-8 border-b-2 border-amber-500/80 shadow-lg text-center relative overflow-hidden">
        {/* Fine gold lines backgrounds */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <h1 className="font-serif text-3xl md:text-5xl font-black text-[#e8b84b] tracking-wider uppercase mb-2 select-none filter drop-shadow-md">
            Saklani Family Tree
          </h1>
          <div className="h-[1.5px] w-24 bg-gradient-to-r from-transparent via-[#c8932a] to-transparent mb-1" />
        </div>
      </header>

      {/* Main app content layout deck */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 flex flex-col gap-6" id="app-workspace">
        {/* Quick summary stats banner */}
        <StatsBanner
          totalMembers={totalMembers}
          totalGenerations={maxGeneration + 1}
          branchesCount={rootChildren.length}
          onBrowseBranch={handleBrowseBranch}
          rootChildren={rootChildren}
        />

        {/* Unified Search & Mode switcher controls */}
        <SearchControl
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={handleClearSearch}
          matchesCount={matchingPeople.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Dual pane layout workspace container */}
        <div className="flex flex-col lg:flex-row gap-6 relative items-stretch">
          {/* Main Work area according to current view mode */}
          <div className="flex-1 min-w-0 flex flex-col">
            {viewMode === 'tree' && (
              <TreeView
                rootPerson={rawFamilyTree}
                onSelectPerson={handleSelectPerson}
                selectedPerson={selectedPerson}
                searchTerm={searchTerm}
                collapsedNodes={collapsedNodes}
                onToggleCollapse={handleToggleCollapse}
                onExpandAll={handleExpandAll}
                onCollapseAll={handleCollapseAll}
              />
            )}

            {viewMode === 'timeline' && (
              <TimelineView
                onSelectPerson={handleSelectPerson}
                selectedPerson={selectedPerson}
                searchTerm={searchTerm}
                lookupMap={lookupMap}
              />
            )}

            {viewMode === 'list' && (
              <DirectoryView
                onSelectPerson={handleSelectPerson}
                selectedPerson={selectedPerson}
                searchTerm={searchTerm}
                lookupMap={lookupMap}
              />
            )}
          </div>

          {/* Right sidebar profile inspect details */}
          <ProfileInspector
            selectedPerson={selectedPerson}
            onClose={handleCloseInspector}
            onSelectPerson={handleSelectPerson}
            lookupMap={lookupMap}
          />
        </div>
      </main>

      {/* Application Footer detail */}
      <footer className="bg-gradient-to-t from-[#1b1006] to-[#251608] text-amber-200/40 p-6 text-center border-t border-amber-600/15 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-sans font-medium">
          <div className="flex items-center gap-1.5 justify-center">
            <Shield className="w-4 h-4 text-amber-500/40" />
            <span>Saklani Heritage Vault • Fully Optimized React Build</span>
          </div>
          <p className="text-[11px]">
            Created for export and upload to Netlify • Standard Client Static SPA
          </p>
        </div>
      </footer>
    </div>
  );
}
