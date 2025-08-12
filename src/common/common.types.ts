export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TOrderStatus =
  | 'Cancelled'
  | 'Fulfilled'
  | 'In Progress'
  | 'Ready for Fulfillment';

export type TOrderItems = {
  id: string;
  name: string;
  color: string;
  fulfilled: boolean;
  size: string | null;
  expectedSerial: string;
};

export type TOrder = {
  id: string;
  clientName: string;
  locationEn: string;
  locationAr: string;
  itemsCount: number;
  status: TOrderStatus;
  items: TOrderItems[];
  recipientName: string;
  notes?: string | null;
  assignedToUserId: string;
};
