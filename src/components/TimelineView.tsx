/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Landmark, ArrowRight, UserCheck, Users, HelpCircle } from 'lucide-react';
import { Person } from '../types';
import { generationLabels, flattenedPeople } from '../data';

interface TimelineViewProps {
  onSelectPerson: (person: Person) => void;
  selectedPerson: Person | null;
  searchTerm: string;
  lookupMap: Map<string, Person>;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  onSelectPerson,
  selectedPerson,
  searchTerm,
  lookupMap
}) => {
  // Group people by generation
  const groupedByGen: { [key: number]: Person[] } = {};
  
  // Initialize groupings
  Object.keys(generationLabels).forEach(g => {
    groupedByGen[parseInt(g)] = [];
  });

  // Populate groupings
  flattenedPeople.forEach(person => {
    if (groupedByGen[person.generation] !== undefined) {
      groupedByGen[person.generation].push(person);
    } else {
      groupedByGen[person.generation] = [person];
    }
  });

  const matchesSearch = (name: string): boolean => {
    if (!searchTerm) return true;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className="flex-1 space-y-8 max-h-[75vh] overflow-y-auto pr-2" id="timeline-explorer">
      <div className="bg-[#fbf7ee] border border-amber-600/10 p-5 rounded-2xl">
        <h3 className="font-serif text-lg font-bold text-amber-900 flex items-center gap-2 mb-2">
          <Landmark className="w-5 h-5 text-amber-600" />
          Generation Timeline Cohorts
        </h3>
        <p className="text-xs text-amber-800/70 leading-relaxed">
          Browse the generations of the Saklani family sorted chronologically. Each tier represents a generation cohort. See immediate relationships and ancestors instantly by clicking any cards.
        </p>
      </div>

      <div className="relative border-l border-amber-600/20 pl-6 sm:pl-8 ml-3 space-y-12">
        {Object.keys(groupedByGen).map(genString => {
          const gen = parseInt(genString);
          const rawPeople = groupedByGen[gen];
          const people = rawPeople.filter(p => matchesSearch(p.name));
          
          if (rawPeople.length === 0 || (searchTerm && people.length === 0)) {
            return null;
          }

          return (
            <div key={gen} className="relative group transition-all">
              {/* Timeline marker crown */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-6 h-6 rounded-full bg-amber-50 border-2 border-amber-600/60 group-hover:bg-[#312111] group-hover:border-[#312111] flex items-center justify-center transition-all">
                <span className="text-[10px] sm:text-xs font-bold text-amber-800 font-serif group-hover:text-amber-400">
                  {gen}
                </span>
              </div>

              {/* Generation Title banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/10 pb-2 mb-4 gap-1">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#312111] tracking-tight">
                    {generationLabels[gen]}
                  </h4>
                  <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                    Generation Rank: {gen === 0 ? 'Primary Source' : `Tier ${gen}`}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full self-start sm:self-auto uppercase tracking-wider">
                  {people.length} {people.length === 1 ? 'member' : 'members'} shown
                </span>
              </div>

              {/* Grid of cohort cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {people.map(person => {
                  const parentNode = person.parentId ? lookupMap.get(person.parentId) : null;
                  const isSelected = selectedPerson?.id === person.id;
                  const hasChildren = person.children && person.children.length > 0;

                  return (
                    <div
                      key={person.id}
                      onClick={() => onSelectPerson(person)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xs group-card text-left flex flex-col justify-between h-24 ${
                        isSelected
                          ? 'bg-[#312111] text-[#e8b84b] border-[#c8932a] shadow-md ring-2 ring-amber-500/20'
                          : 'bg-[#ffffff] text-[#312111] border-amber-500/12 hover:border-amber-500/40'
                      }`}
                    >
                      <div>
                        {/* Member name */}
                        <div className={`font-serif text-[13px] sm:text-sm font-bold tracking-tight truncate leading-tight ${
                          isSelected ? 'text-[#e8b84b]' : 'text-amber-950'
                        }`}>
                          {person.name}
                        </div>
                        
                        {/* Parent connection details */}
                        {parentNode && (
                          <div className={`text-[10.5px] mt-1 flex items-center gap-0.5 ${
                            isSelected ? 'text-amber-200/50' : 'text-[#8e6d4c]/70'
                          }`}>
                            <span className="font-medium">Child of:</span> 
                            <strong className="font-semibold">{parentNode.name}</strong>
                          </div>
                        )}
                      </div>

                      {/* Card meta tags */}
                      <div className="flex items-center justify-between border-t border-amber-500/5 pt-1.5 mt-2">
                        <span className={`text-[9.5px] uppercase font-bold tracking-widest ${
                          isSelected ? 'text-amber-300/40' : 'text-amber-700/50'
                        }`}>
                          {hasChildren ? `${person.children!.length} descendants` : 'youngest line'}
                        </span>
                        <ArrowRight className={`w-3 h-3 group-hover:translate-x-0.5 transition-transform ${
                          isSelected ? 'text-[#e8b84b]' : 'text-amber-500'
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
