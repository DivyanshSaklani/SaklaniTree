/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Users, Landmark, Trees, ShieldAlert } from 'lucide-react';
import { Person } from '../types';

interface StatsBannerProps {
  totalMembers: number;
  totalGenerations: number;
  branchesCount: number;
  onBrowseBranch: (branchId: string) => void;
  rootChildren: Person[];
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  totalMembers,
  totalGenerations,
  branchesCount,
  onBrowseBranch,
  rootChildren
}) => {
  return (
    <div className="bg-gradient-to-r from-[#1b1006] to-[#3a2817] text-white p-5 md:p-6 rounded-2xl border border-amber-500/20 shadow-xl mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Stat card 1 */}
        <div className="bg-[#1b1006]/35 p-3 md:p-4 rounded-xl border border-amber-500/10 flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-lg bg-amber-500/10 text-amber-400">
            <Users className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <div className="font-serif text-xl md:text-2xl font-bold text-amber-300 leading-tight">
              {totalMembers}
            </div>
            <div className="text-[10px] md:text-xs text-amber-200/50 tracking-wider uppercase font-medium">
              Members Spanned
            </div>
          </div>
        </div>

        {/* Stat card 2 */}
        <div className="bg-[#1b1006]/35 p-3 md:p-4 rounded-xl border border-amber-500/10 flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-lg bg-amber-500/10 text-amber-400">
            <Landmark className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <div className="font-serif text-xl md:text-2xl font-bold text-amber-300 leading-tight">
              {totalGenerations}
            </div>
            <div className="text-[10px] md:text-xs text-amber-200/50 tracking-wider uppercase font-medium">
              Generations
            </div>
          </div>
        </div>

        {/* Stat card 3 */}
        <div className="bg-[#1b1006]/35 p-3 md:p-4 rounded-xl border border-amber-500/10 flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-lg bg-amber-500/10 text-amber-400">
            <Trees className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <div className="font-serif text-xl md:text-2xl font-bold text-amber-300 leading-tight">
              {branchesCount}
            </div>
            <div className="text-[10px] md:text-xs text-amber-200/50 tracking-wider uppercase font-medium">
              Main Branches
            </div>
          </div>
        </div>

        {/* Stat card 4 */}
        <div className="bg-[#1b1006]/35 p-3 md:p-4 rounded-xl border border-amber-500/10 flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-lg bg-amber-500/10 text-amber-400">
            <ShieldAlert className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <div className="font-serif text-xl md:text-2xl font-bold text-amber-300 leading-tight">
              1
            </div>
            <div className="text-[10px] md:text-xs text-amber-200/50 tracking-wider uppercase font-medium">
              Common Ancestor
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-amber-500/10 pt-4 flex flex-col md:flex-row items-start md:items-center justify-start gap-4 text-xs">
        <span className="text-amber-200/50 font-sans font-semibold uppercase tracking-wider text-[10px]">
          Focus Main Branches:
        </span>
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {rootChildren.map(branch => (
            <button
              key={branch.id}
              onClick={() => onBrowseBranch(branch.id)}
              className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-amber-500/10 text-amber-300 hover:bg-amber-400 hover:text-black border border-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              {branch.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
