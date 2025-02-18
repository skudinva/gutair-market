import { StoreSlice } from '../../const';
import { State } from '../../types/state';
import { SortName } from '../../types/types';

export const getSorting = ({
  [StoreSlice.SiteProcess]: SITE_PROCESS,
}: State): SortName => SITE_PROCESS.sorting;
