import type { Series } from '../../types';
import { got } from './got';
import { apothecaryDiaries } from './apothecaryDiaries';

export const SERIES: Series[] = [got, apothecaryDiaries];
