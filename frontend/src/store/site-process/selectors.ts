import { StoreSlice } from '../../const';
import { State } from '../../types/state';
import { SortByType } from '../../types/types';

export const getSorting = ({
  [StoreSlice.SiteProcess]: SITE_PROCESS,
}: State): SortByType => SITE_PROCESS.sorting;
