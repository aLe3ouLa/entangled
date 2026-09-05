import type { RelationshipType } from '../types';

export const RELATIONSHIP_TYPE_COLOR: Record<RelationshipType, string> = {
  family: '#f9a8d4',
  erotic: '#db2777',
  conflict: '#ef4444',
  dependence: '#38bdf8',
  betrayal: '#f97316',
  responsibility: '#eab308',
  loyalty: '#22c55e',
  threat: '#a855f7',
  'hidden-truth': '#6366f1',
};

export const RELATIONSHIP_TYPE_LABEL: Record<RelationshipType, string> = {
  family: 'Family',
  erotic: 'Erotic',
  conflict: 'Conflict',
  dependence: 'Dependence',
  betrayal: 'Betrayal',
  responsibility: 'Responsibility',
  loyalty: 'Loyalty',
  threat: 'Threat',
  'hidden-truth': 'Hidden truth',
};

export const RELATIONSHIP_TYPES = Object.keys(RELATIONSHIP_TYPE_COLOR) as RelationshipType[];
