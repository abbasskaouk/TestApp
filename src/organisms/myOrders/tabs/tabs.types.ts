import {TOrderStatus} from '@/common/common.types';

export type TabsProps = {
  tabs: TOrderStatus[];
  selectedTab: TOrderStatus;
  setSelectedTab: React.Dispatch<React.SetStateAction<TOrderStatus>>;
};
