/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

export interface Person {
  id: string;
  name: string;
  generation: number;
  parentId?: string;
  children?: Person[];
}

export type ViewMode = 'tree' | 'timeline' | 'list';

export interface SearchMatch {
  person: Person;
  lineage: string[];
}
