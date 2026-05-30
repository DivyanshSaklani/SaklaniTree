/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useMemo } from 'react';
import { Contact, Landmark, ArrowUpRight, SearchSlash } from 'lucide-react';
import { Person } from '../types';
import { flattenedPeople, generationLabels, getLineage } from '../data';

interface DirectoryViewProps {
  onSelectPerson: (person: Person) => void;
  selectedPerson: Person | null;
  searchTerm: string;
  lookupMap: Map<string, Person>;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  onSelectPerson,
  selectedPerson,
  searchTerm,
  lookupMap
}) => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Filter and sort people alphabetically
  const directoryData = useMemo(() => {
    let result = [...flattenedPeople];

    // Apply search filter if active
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort alphabetically
    result.sort((a, b) => a.name.localeCompare(b.name));

    // Group by first letter
    const groups: { [key: string]: Person[] } = {};
    result.forEach(person => {
      const firstLetter = person.name.trim().charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(person);
    });

    return groups;
  }, [searchTerm]);

  const alphabet = useMemo(() => {
    const letters = new Set<string>();
    flattenedPeople.forEach(p => {
      letters.add(p.name.trim().charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, []);

  const handleLetterClick = (letter: string) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null); // Toggle off
    } else {
      setSelectedLetter(letter);
    }
  };

  // Filtered letters list based on whether there are current search matches
  const activeLetters = Object.keys(directoryData);

  return (
    <div className="flex-1 space-y-6 max-h-[75vh] overflow-y-auto pr-2" id="directory-explorer">
      {/* Intro descriptive card */}
      <div className="bg-[#fbf7ee] border border-amber-600/10 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="p-3 bg-amber-500/10 rounded-xl text-amber-700">
          <Contact className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-amber-900 leading-tight mb-1">
            Alphabetical Registry Directory
          </h3>
          <p className="text-xs text-amber-800/70 leading-relaxed">
            Quickly lookup any individual in the Saklani registry by name. Use the alphabet filter pad below to narrow down lists instantly.
          </p>
        </div>
      </div>

      {/* Alphabet shortcut bar */}
      <div className="bg-[#ffffff] p-3 rounded-xl border border-amber-500/12 shadow-2xs flex flex-wrap gap-1 items-center justify-center">
        <button
          onClick={() => setSelectedLetter(null)}
          className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${
            selectedLetter === null
              ? 'bg-[#312111] text-white shadow-xs'
              : 'text-amber-800 hover:bg-amber-500/10'
          }`}
        >
          All A-Z
        </button>
        {alphabet.map(letter => {
          const hasMatches = activeLetters.includes(letter);
          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              disabled={!hasMatches && !!searchTerm}
              className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-lg cursor-pointer transition-all ${
                selectedLetter === letter
                  ? 'bg-amber-600 text-white shadow-xs'
                  : hasMatches
                  ? 'text-amber-900 bg-amber-500/5 hover:bg-amber-500/15'
                  : 'text-amber-900/20 cursor-not-allowed'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Groupings rendering */}
      {activeLetters.length === 0 ? (
        <div className="p-12 text-center text-amber-700/55 flex flex-col items-center justify-center gap-2">
          <SearchSlash className="w-10 h-10 stroke-1" />
          <span className="font-serif text-lg font-bold">No Records Found</span>
          <span className="text-xs font-medium">Refining your lookup terms may yield better matches.</span>
        </div>
      ) : (
        <div className="space-y-6">
          {activeLetters.map(letter => {
            if (selectedLetter && selectedLetter !== letter) return null;
            const people = directoryData[letter];

            return (
              <div key={letter} className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-500/10 shadow-3xs">
                {/* Group heading title */}
                <h3 className="font-serif text-lg font-bold text-amber-900 border-b border-amber-500/10 pb-2 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#312111] text-amber-400 font-serif text-sm font-black justify-center flex items-center rounded-lg shadow-2xs">
                    {letter}
                  </span>
                  <span>Section Index</span>
                </h3>

                {/* List of members under this index letter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {people.map(person => {
                    const isSelected = selectedPerson?.id === person.id;
                    const lineage = getLineage(person, lookupMap);
                    const parent = person.parentId ? lookupMap.get(person.parentId) : null;

                    return (
                      <div
                        key={person.id}
                        onClick={() => onSelectPerson(person)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer group active:scale-[0.99] transition-all hover:-translate-x-0.5 ${
                          isSelected
                            ? 'bg-[#312111] text-[#e8b84b] border-[#c8932a] shadow-xs'
                            : 'bg-[#fbf7ee]/20 hover:bg-[#fbf7ee]/45 text-[#312111] border-amber-500/10 hover:border-amber-500/40'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          {/* Name spelling */}
                          <div className={`font-serif text-sm font-bold tracking-tight truncate leading-tight ${
                            isSelected ? 'text-[#e8b84b]' : 'text-amber-950'
                          }`}>
                            {person.name}
                          </div>

                          {/* Level rank and parent info */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            <span className={`text-[9.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              isSelected 
                                ? 'bg-[#fbf7ee]/10 text-amber-400' 
                                : 'bg-amber-500/10 text-amber-800'
                            }`}>
                              Gen {person.generation}
                            </span>
                            
                            {parent && (
                              <span className={`text-[10px] truncate max-w-[120px] ${
                                isSelected ? 'text-amber-200/50' : 'text-[#8e6d4c]/70'
                              }`}>
                                s/o {parent.name}
                              </span>
                            )}
                          </div>

                          {/* Lineage crumb hint */}
                          {lineage.length > 0 && (
                            <div className={`text-[9px] truncate mt-1.5 ${
                              isSelected ? 'text-amber-200/35' : 'text-[#8e6d4c]/50'
                            }`}>
                              Line: {lineage.join(' → ')}
                            </div>
                          )}
                        </div>

                        <div className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                          isSelected ? 'bg-[#fdf5e2]/10 text-amber-400' : 'bg-[#ffffff] text-amber-600'
                        }`}>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
