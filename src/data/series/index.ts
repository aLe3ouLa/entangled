import type { Series } from '../../types';
import { got } from './got';
import { apothecaryDiaries } from './apothecaryDiaries';
import { charmed } from './charmed';
import { friends } from './friends';

export const SERIES: Series[] = [got, apothecaryDiaries, charmed, friends];
