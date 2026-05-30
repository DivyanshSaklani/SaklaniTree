/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { X, CornerDownRight, Landmark, Users, ArrowUpRight, Award, Footprints } from 'lucide-react';
import { Person } from '../types';
import { generationLabels, flattenedPeople } from '../data';

interface ProfileInspectorProps {
  selectedPerson: Person | null;
  onClose: () => void;
  onSelectPerson: (person: Person) => void;
  lookupMap: Map<string, Person>;
}

// Recursive helper to count total direct descendants
function getDescendantsCount(person: Person): number {
  if (!person.children || person.children.length === 0) return 0;
  let count = person.children.length;
  person.children.forEach(child => {
    count += getDescendantsCount(child);
  });
  return count;
}

export const ProfileInspector: React.FC<ProfileInspectorProps> = ({
  selectedPerson,
  onClose,
  onSelectPerson,
  lookupMap
}) => {
  if (!selectedPerson) return null;

  // Build the lineage array of Person objects
  const lineageArray: Person[] = [];
  let current: Person | undefined = selectedPerson;
  while (current) {
    lineageArray.unshift(current);
    current = current.parentId ? lookupMap.get(current.parentId) : undefined;
  }

  // Find parent
  const parent = selectedPerson.parentId ? lookupMap.get(selectedPerson.parentId) : null;

  // Find siblings
  const siblings = parent 
    ? (parent.children || []).filter(c => c.id !== selectedPerson.id)
    : [];

  // Count total descendants
  const directDescendants = getDescendantsCount(selectedPerson);

  // List of children
  const children = selectedPerson.children || [];

  return (
    <>
      {/* Mobile background overlay */}
      <div 
        className="fixed inset-0 bg-[#312111]/30 backdrop-blur-xs z-40 lg:hidden"
        onClick={onClose}
      />

      <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] lg:max-h-none overflow-y-auto lg:static lg:w-[400px] bg-[#ffffff] border-t-2 lg:border-t-0 lg:border-l border-[#d1b884]/35 p-6 shadow-2xl lg:shadow-none z-50 rounded-t-3xl lg:rounded-none flex flex-col justify-between" id="profile-inspector">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-500/10 pb-4 mb-5">
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-amber-600 uppercase">
              <CornerDownRight className="w-3.5 h-3.5 text-amber-500" />
              Member Profile
            </span>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-amber-50 text-amber-700/60 hover:text-amber-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Identity */}
          <div className="relative mb-6 text-center lg:text-left bg-gradient-to-br from-[#fbf7ee] to-[#fbf7ee]/40 rounded-2xl p-5 border border-amber-500/10 shadow-xs">
            <div className="absolute right-4 top-4 opacity-5 pointer-events-none">
              <Award className="w-16 h-16 text-[#312111]" />
            </div>

            <div className="font-serif text-3xl font-bold text-[#312111] tracking-tight mb-1 break-words leading-tight">
              {selectedPerson.name}
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full">
              <Landmark className="w-3 h-3" />
              {generationLabels[selectedPerson.generation] || `Generation ${selectedPerson.generation + 1}`}
            </span>

            {/* Quick stats specific to this person */}
            <div className="grid grid-cols-2 gap-3 mt-4 border-t border-amber-500/10 pt-4">
              <div className="text-center bg-[#ffffff] p-2.5 rounded-xl border border-amber-500/10 shadow-2xs">
                <div className="text-amber-700 font-serif text-lg font-bold">{children.length}</div>
                <div className="text-[10px] text-amber-600/60 uppercase tracking-wider font-semibold">Immediate Heirs</div>
              </div>
              <div className="text-center bg-[#ffffff] p-2.5 rounded-xl border border-amber-500/10 shadow-2xs">
                <div className="text-amber-700 font-serif text-lg font-bold">{directDescendants}</div>
                <div className="text-[10px] text-amber-600/60 uppercase tracking-wider font-semibold">Descendants</div>
              </div>
            </div>
          </div>

          {/* Pedigree Lineage Path */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-3 flex items-center gap-1">
              <Footprints className="w-3.5 h-3.5 text-amber-600" /> Lineage Tracker
            </h4>
            <div className="bg-[#fbf7ee]/45 p-4 rounded-xl border border-amber-500/8">
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
                {lineageArray.map((node, index) => (
                  <React.Fragment key={node.id}>
                    {index > 0 && <span className="text-amber-400 font-sans">→</span>}
                    <button
                      onClick={() => onSelectPerson(node)}
                      className={`px-2 py-0.5 rounded font-medium transition-all ${
                        node.id === selectedPerson.id
                          ? 'bg-amber-600 text-white font-semibold shadow-xs'
                          : 'bg-white text-amber-800 border border-amber-500/10 hover:border-amber-500/40 hover:bg-amber-50/50'
                      }`}
                    >
                      {node.name}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Parents & Siblings Section */}
          <div className="space-y-4 mb-6">
            {parent && (
              <div>
                <h4 className="text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-1.5">Sire / Predecessor</h4>
                <button
                  onClick={() => onSelectPerson(parent)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-amber-500/12 hover:border-amber-500/40 text-amber-900 group transition-all text-left"
                >
                  <span className="font-serif font-semibold text-sm">{parent.name}</span>
                  <div className="flex items-center gap-1 text-[11px] text-amber-600 bg-amber-500/5 px-2 py-0.5 rounded-md group-hover:bg-amber-500/20 group-hover:text-amber-800 transition-all font-semibold">
                    Inspect Ancestor
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </button>
              </div>
            )}

            {siblings.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-1.5">
                  Siblings & Co-Heirs ({siblings.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {siblings.map(sib => (
                    <button
                      key={sib.id}
                      onClick={() => onSelectPerson(sib)}
                      className="px-2.5 py-1 text-xs font-serif bg-white text-[#312111]/80 hover:text-[#312111] font-semibold rounded-lg border border-amber-500/10 hover:border-amber-500/35 hover:bg-amber-50/50 hover:shadow-2xs transition-all"
                    >
                      {sib.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {children.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-1.5">
                  Children / Succesors ({children.length})
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => onSelectPerson(child)}
                      className="flex items-center justify-between p-2 rounded-xl bg-[#fbf7ee]/25 border border-amber-500/8 hover:border-amber-500/35 hover:bg-white text-left group transition-all"
                    >
                      <span className="font-serif font-semibold text-xs leading-none text-amber-950 truncate max-w-[85px]">{child.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-500/60 group-hover:text-amber-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-amber-500/10 text-[10px] text-amber-600/40 text-center uppercase tracking-widest font-semibold flex items-center justify-center gap-1 font-mono">
          <Users className="w-3 h-3 text-amber-500/30" /> Saklani Heritage Registry
        </div>
      </div>
    </>
  );
};
