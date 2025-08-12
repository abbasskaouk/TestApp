import {TOrderStatus} from '@/common/common.types';

export type TOrderCard = {
  id: string;
  itemsCount: number;
  clientName: string;
  locationEn: string;
  locationAr: string;
  status: TOrderStatus;
  notes?: string | null;
  recipientName: string;
  onPress?: () => void;
};
