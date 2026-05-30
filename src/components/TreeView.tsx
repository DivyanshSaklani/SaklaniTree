/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, ChevronDown, Award, Search, Minimize2, Maximize2 } from 'lucide-react';
import { Person } from '../types';

interface TreeViewProps {
  rootPerson: Person;
  onSelectPerson: (person: Person) => void;
  selectedPerson: Person | null;
  searchTerm: string;
  collapsedNodes: Set<string>;
  onToggleCollapse: (nodeId: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export const TreeView: React.FC<TreeViewProps> = ({
  rootPerson,
  onSelectPerson,
  selectedPerson,
  searchTerm,
  collapsedNodes,
  onToggleCollapse,
  onExpandAll,
  onCollapseAll
}) => {
  const [scale, setScale] = useState<number>(0.75);
  const [offsetX, setOffsetX] = useState<number>(100);
  const [offsetY, setOffsetY] = useState<number>(40);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  // Focus effect: If a new person is selected from search or side-profile, center on them!
  useEffect(() => {
    if (selectedPerson) {
      // Look up selected element inside DOM and pan/center it smoothly
      const element = document.getElementById(`node-card-${selectedPerson.id}`);
      if (element && canvasRef.current) {
        const panToSelected = () => {
          const canvasBounds = canvasRef.current!.getBoundingClientRect();
          const elemBounds = element.getBoundingClientRect();

          // Calculate center offsets
          const currentPosX = elemBounds.left + elemBounds.width / 2;
          const currentPosY = elemBounds.top + elemBounds.height / 2;
          const targetPosX = canvasBounds.left + canvasBounds.width / 2;
          const targetPosY = canvasBounds.top + canvasBounds.height / 2;

          setOffsetX(prev => prev + (targetPosX - currentPosX));
          setOffsetY(prev => prev + (targetPosY - currentPosY));
        };
        
        // Trigger with slight delay so any expanded families finish rendering layout
        const timer = setTimeout(panToSelected, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedPerson]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Avoid dragging when clicking active cards or knobs
    if ((e.target as HTMLElement).closest('.clickable-node-target')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.clickable-node-target')) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - offsetX, y: e.touches[0].clientY - offsetY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length === 1) {
      setOffsetX(e.touches[0].clientX - dragStart.x);
      setOffsetY(e.touches[0].clientY - dragStart.y);
    }
  };

  const handleReset = () => {
    setScale(0.75);
    setOffsetX(100);
    setOffsetY(40);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.05;
    if (e.deltaY < 0) {
      setScale(prev => Math.min(prev + zoomFactor, 1.8));
    } else {
      setScale(prev => Math.max(prev - zoomFactor, 0.35));
    }
  };

  // Helper to verify if node matches the current search query
  const matchesSearch = (name: string): boolean => {
    if (!searchTerm) return false;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Reusable recursive sub-tree renderer
  const renderSubtree = (person: Person): React.ReactNode => {
    const isCollapsed = collapsedNodes.has(person.id);
    const hasChildren = person.children && person.children.length > 0;
    const isRoot = person.generation === 0;
    const matched = matchesSearch(person.name);
    const isSelected = selectedPerson?.id === person.id;

    return (
      <li key={person.id} className="relative z-10 transition-all font-sans">
        {/* The Family Node Card itself */}
        <div id={`node-card-${person.id}`} className="inline-block relative">
          <div
            onClick={() => onSelectPerson(person)}
            className={`clickable-node-target inline-flex flex-col items-center justify-center p-3 sm:px-4 sm:py-2.5 rounded-xl border-1.5 cursor-pointer max-w-[150px] transition-all duration-300 hover:-translate-y-1 ${
              isRoot
                ? 'bg-gradient-to-br from-[#1b1006] to-[#3a2817] text-[#e8b84b] border-[#c8932a] font-serif shadow-xl outline-offset-2 ring-2 ring-amber-500/20'
                : isSelected
                ? 'bg-amber-600 text-white border-amber-500 shadow-md ring-2 ring-amber-500/35 scale-102 font-medium'
                : matched
                ? 'bg-[#fdf5e2] text-amber-950 border-amber-500 shadow-lg ring-3 ring-amber-500/30 scale-103 font-bold animate-[pulse_1.5s_infinite_ease-in-out]'
                : person.generation <= 2
                ? 'bg-[#f8f1e0] text-[#312111] border-[#c8932a]/30 hover:border-[#c8932a]/70 shadow-sm'
                : 'bg-[#ffffff] text-[#312111] border-[#312111]/10 hover:border-[#312111]/30 shadow-2xs'
            }`}
          >
            {isRoot && (
              <div className="flex items-center gap-1.5 mb-1 bg-amber-500/10 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-extrabold text-amber-400">
                <Award className="w-3 h-3 text-amber-400" /> Origins
              </div>
            )}

            <span className={`text-center leading-[1.3] text-xs sm:text-xs truncate ${isRoot ? 'font-serif text-sm font-bold tracking-wide' : 'font-semibold'}`}>
              {person.name}
            </span>

            {/* Depth label indicator on hover / micro detail */}
            <span className={`text-[8.5px] tracking-wide mt-0.5 opacity-60 font-medium ${isRoot ? 'text-amber-100/50' : 'text-[#8e6d4c]'}`}>
              Gen {person.generation}
            </span>
          </div>

          {/* Toggle collapsible children button widget */}
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCollapse(person.id);
              }}
              className={`clickable-node-target absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-7 h-7 bg-white hover:bg-amber-50 text-amber-900 border border-amber-500/25 hover:border-amber-500 rounded-full flex items-center justify-center p-0 cursor-pointer shadow-2xs transition-transform z-20 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
              title={isCollapsed ? "Expand Branch" : "Collapse Branch"}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Recursive rendering of children blocks */}
        {hasChildren && !isCollapsed && (
          <ul className="transition-all duration-300">
            {person.children!.map(child => renderSubtree(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div 
      className="relative flex-1 bg-[#fbf7ee] rounded-2xl border border-[#d1b884]/20 shadow-inner overflow-hidden min-h-[500px] h-[65vh] select-none"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Background Decal Pattern Grid */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#8e6d4c_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      {/* Control Overlays */}
      <div className="absolute top-4 left-4 z-20 flex flex-col sm:flex-row gap-2">
        <div className="flex bg-[#ffffff] border border-amber-500/18 p-1 rounded-xl shadow-md">
          <button
            onClick={() => setScale(prev => Math.min(prev + 0.1, 1.8))}
            className="p-2 hover:bg-amber-50 text-amber-900 rounded-lg cursor-pointer transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(prev => Math.max(prev - 0.1, 0.35))}
            className="p-2 hover:bg-amber-50 text-amber-900 rounded-lg cursor-pointer transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-[1px] bg-amber-500/10 mx-1 self-stretch" />
          <button
            onClick={handleReset}
            className="p-2 hover:bg-amber-50 text-amber-900 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Reset Pan & Zoom"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Recenter</span>
          </button>
        </div>

        <div className="flex bg-[#ffffff] border border-amber-500/18 p-1 rounded-xl shadow-md">
          <button
            onClick={onExpandAll}
            className="px-3 py-2 hover:bg-amber-50 text-amber-900 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Expand Entire Tree"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand All</span>
          </button>
          <button
            onClick={onCollapseAll}
            className="px-3 py-2 hover:bg-amber-50 text-amber-900 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Collapse to Gen 1"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Collapse All</span>
          </button>
        </div>
      </div>

      {/* Floating hints */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#8e6d4c]/50 flex items-center gap-1.5">
          👉 Click + Drag to pan • Scroll to Zoom • Click member to inspect
        </span>
      </div>

      {/* The Zoomable & Drag-Pannable Outer Matrix wrapper */}
      <div
        className="absolute transition-transform duration-200 ease-out origin-top-left"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
        }}
      >
        <div className="tree-container p-6">
          <ul>{renderSubtree(rootPerson)}</ul>
        </div>
      </div>
    </div>
  );
};
