/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { ChangeEvent, KeyboardEvent } from 'react';
import { Search, X, GitFork, CalendarRange, FolderGit } from 'lucide-react';
import { ViewMode } from '../types';

interface SearchControlProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  matchesCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const SearchControl: React.FC<SearchControlProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  matchesCount,
  viewMode,
  onViewModeChange
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClearSearch();
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-[#fbf7ee]/95 backdrop-blur-md border-b border-[#d1b884]/30 py-3 px-4 md:px-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Search Bar pill */}
      <div className="relative flex-1 max-w-md w-full">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#8e6d4c]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search any family member (e.g. Divyansh, Amit)..."
          className="w-full pl-10 pr-10 py-2 md:py-2.5 rounded-full border border-amber-500/22 bg-[#ffffff] text-xs md:text-sm text-[#312111] placeholder-[#8e6d4c]/50 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/10 shadow-inner transition-all font-sans"
        />
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-amber-500/10 hover:bg-amber-500/20 text-[#312111] rounded-full p-1 transition-all hover:scale-105"
            title="Clear Search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Action and view controls */}
      <div className="flex items-center gap-2 md:gap-3 justify-between md:justify-end">
        {searchTerm && (
          <span className={`text-[11px] font-bold tracking-wider uppercase font-mono px-2.5 py-1.5 rounded-lg border leading-none ${
            matchesCount > 0 
              ? 'bg-[#1e3f14]/10 text-[#1e3f14] border-[#1e3f14]/15' 
              : 'bg-red-500/10 text-red-700 border-red-500/15'
          }`}>
            {matchesCount > 0 ? `✓ Found ${matchesCount}` : '✗ No Match'}
          </span>
        )}

        {/* View mode switcher */}
        <div className="flex items-center bg-[#fbf7ee] border border-amber-500/18 p-1 rounded-xl shadow-xs self-stretch shrink-0">
          <button
            onClick={() => onViewModeChange('tree')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-medium cursor-pointer transition-all ${
              viewMode === 'tree'
                ? 'bg-[#312111] text-white shadow-sm'
                : 'text-[#5c4228] hover:bg-amber-500/10 hover:text-[#312111]'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Interactive Chart</span>
          </button>

          <button
            onClick={() => onViewModeChange('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-medium cursor-pointer transition-all ${
              viewMode === 'timeline'
                ? 'bg-[#312111] text-white shadow-sm'
                : 'text-[#5c4228] hover:bg-amber-500/10 hover:text-[#312111]'
            }`}
          >
            <CalendarRange className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Generations</span>
          </button>

          <button
            onClick={() => onViewModeChange('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-medium cursor-pointer transition-all ${
              viewMode === 'list'
                ? 'bg-[#312111] text-white shadow-sm'
                : 'text-[#5c4228] hover:bg-amber-500/10 hover:text-[#312111]'
            }`}
          >
            <FolderGit className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Directory</span>
          </button>
        </div>
      </div>
    </div>
  );
};
