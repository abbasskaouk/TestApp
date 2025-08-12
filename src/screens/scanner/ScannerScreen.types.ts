export type Item = {
  id: string;
  name: string;
  size?: string;
  color: string;
  expectedSerial: string;
};

export type Order = {
  items: Item[];
  title?: string;
  id: string | number;
};

export type FulfillmentState = {
  isRetrying: boolean;
  showScanResult: boolean;
  currentItemIndex: number;
  scannedItems: Set<string>;
  scanResult: ScanResult | null;
  scanErrors: Map<string, number>;
};

export type ScanResult = {
  message: string;
  success: boolean;
  scannedSerial?: string;
  expectedSerial?: string;
  errorType?:
    | 'wrong_item'
    | 'already_scanned'
    | 'invalid_scan'
    | 'network_error'
    | 'camera_error';
  retryCount?: number;
};

export type CameraKitEvent = {
  data?: string;
  code?: string;
  codeStringValue?: string;
  nativeEvent?: {
    codeStringValue?: string;
  };
};

export type CameraProps = {
  style?: object;
  showFrame?: boolean;
  laserColor?: string;
  frameColor?: string;
  scanBarcode?: boolean;
  hideControls?: boolean;
  onCameraError?: (error: unknown) => void;
  onReadCode?: (event: {nativeEvent: {codeStringValue: string}}) => void;
};

export type BarcodeScanEvent =
  | {nativeEvent: {codeStringValue: string}}
  | {data: string};
