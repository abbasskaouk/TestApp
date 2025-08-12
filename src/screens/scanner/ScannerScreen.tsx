import {
  View,
  Text,
  Alert,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {
  ComponentType,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';

import {
  Order,
  ScanResult,
  CameraProps,
  CameraKitEvent,
  FulfillmentState,
  BarcodeScanEvent,
} from './ScannerScreen.types';
import {Skeleton} from '@/components';
import {colors} from '@/assets/themes/colors';
import {EmptyState, ScannerHeader} from '@/organisms';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/store/navigator/mainNavigator.types';

const {width, height} = Dimensions.get('window');

const CORNER = 36;
const CORNER_W = 8;
const FRAME_SIZE = Math.min(width * 0.84, height * 0.48);

let CameraImplementation: ComponentType<CameraProps> | null = null;
try {
  const cameraModule = require('react-native-camera-kit');
  CameraImplementation =
    cameraModule?.CameraScreen ||
    cameraModule?.CameraKitCameraScreen ||
    cameraModule?.Camera ||
    null;
} catch (e) {
  console.warn(e);
}

type ScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'ProductScanner'>;
};

const ProductScanner = ({route, navigation}: ScreenProps) => {
  const {order}: {order: Order} = route.params || {};

  const [state, setState] = useState<FulfillmentState>({
    scanResult: null,
    isRetrying: false,
    currentItemIndex: 0,
    scanErrors: new Map(),
    showScanResult: false,
    scannedItems: new Set(),
  });

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingScanRef = useRef(false);

  const total = order?.items?.length || 0;
  const fulfilled = state.scannedItems.size;
  const isComplete = fulfilled === total;
  const currentItem = useMemo(
    () => order?.items?.[state.currentItemIndex],
    [order?.items, state.currentItemIndex],
  );

  const showToast = (scanResult: ScanResult, duration: number = 3000) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setState(prev => ({
      ...prev,
      scanResult,
      showScanResult: true,
    }));

    toastTimeoutRef.current = setTimeout(() => {
      setState(prev => ({
        ...prev,
        showScanResult: false,
        scanResult: null,
      }));
      toastTimeoutRef.current = null;
    }, duration);
  };

  const moveToNextItem = () => {
    setState(prev => {
      const nextIndex = Math.min(
        prev.currentItemIndex + 1,
        order.items.length - 1,
      );
      return {
        ...prev,
        currentItemIndex: nextIndex,
        showScanResult: false,
        scanResult: null,
      };
    });
  };

  const qrCodeBarcodeValue = (evt: CameraKitEvent): string =>
    evt?.nativeEvent?.codeStringValue ||
    evt?.codeStringValue ||
    evt?.data ||
    evt?.code ||
    '';

  const onCameraError = () => {
    const scanResult: ScanResult = {
      success: false,
      message:
        'Camera error detected. Please restart the app or check camera permissions.',
      errorType: 'camera_error',
      scannedSerial: '',
      expectedSerial: currentItem?.expectedSerial || '',
    };

    showToast(scanResult, 4000);
  };

  const handleBarcodeScan = (evt: BarcodeScanEvent) => {
    if (isProcessingScanRef.current) return;
    isProcessingScanRef.current = true;

    const scannedSerial = String(qrCodeBarcodeValue(evt) || '');
    const expectedSerial = currentItem?.expectedSerial || '';

    let scanResult: ScanResult;

    if (!currentItem) {
      isProcessingScanRef.current = false;
      return;
    }

    if (!scannedSerial || scannedSerial.trim().length === 0) {
      scanResult = {
        success: false,
        message: 'Invalid scan detected. Please try again.',
        errorType: 'invalid_scan',
        scannedSerial: '',
        expectedSerial,
      };

      showToast(scanResult, 3000);
      isProcessingScanRef.current = false;
      return;
    }

    if (state.scannedItems.has(currentItem.id)) {
      scanResult = {
        success: false,
        message: 'Item already scanned',
        errorType: 'already_scanned',
        scannedSerial,
        expectedSerial,
      };

      showToast(scanResult, 3000);

      // Move to next item after toast duration
      setTimeout(() => {
        moveToNextItem();
        isProcessingScanRef.current = false;
      }, 3000);
      return;
    }

    if (scannedSerial && scannedSerial !== expectedSerial) {
      scanResult = {
        success: false,
        message: `Wrong item scanned. Expected: ${expectedSerial}`,
        errorType: 'wrong_item',
        scannedSerial,
        expectedSerial,
      };

      showToast(scanResult, 4000);
      isProcessingScanRef.current = false;
      return;
    }

    if (scannedSerial && scannedSerial === expectedSerial) {
      scanResult = {
        success: true,
        message: 'Successfully scanned! Moving to next item...',
        scannedSerial,
        expectedSerial,
      };

      setState(prev => {
        const newScanErrors = new Map(prev.scanErrors);
        newScanErrors.delete(currentItem.id);
        return {
          ...prev,
          scanResult,
          showScanResult: true,
          scanErrors: newScanErrors,
        };
      });

      setTimeout(() => {
        const nextSet = new Set(state.scannedItems);
        nextSet.add(currentItem.id);
        setState(prev => ({
          ...prev,
          scannedItems: nextSet,
          currentItemIndex: Math.min(
            prev.currentItemIndex + 1,
            order.items.length - 1,
          ),
          showScanResult: false,
          scanResult: null,
        }));
        isProcessingScanRef.current = false;
      }, 1500);
    }
  };

  const onPressDone = () => {
    if (!isComplete) return;
    Alert.alert('Complete Fulfillment', `Complete order #${order.id}?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Complete',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Success', 'Fulfillment completed.');
          navigation.goBack();
        },
      },
    ]);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  if (!order || !order.items?.length) {
    return <EmptyState />;
  }

  return (
    <Skeleton>
      <ScannerHeader
        onPressBack={() => navigation.goBack()}
        title={order.title || currentItem?.name || `Order #${order.id}`}
      />
      <View style={styles.cameraWrapper}>
        {CameraImplementation && (
          <CameraImplementation
            scanBarcode
            hideControls
            showFrame={false}
            style={styles.camera}
            onCameraError={onCameraError}
            onReadCode={handleBarcodeScan}
            laserColor={colors.crimsonRed}
            frameColor={colors.white}
          />
        )}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Scan: {currentItem?.name || 'item'} (
            {currentItem?.expectedSerial || 'N/A'})
          </Text>
          <Text style={styles.progressText}>
            {state.currentItemIndex + 1} of {order?.items?.length || 0}
          </Text>
        </View>
        <View pointerEvents="none" style={styles.frame}>
          <View style={styles.frameOverlay} />
          <View style={styles.frameBorder} />
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
          <View style={styles.centerGuide}>
            <Text style={styles.centerGuideText}>
              {state.scanResult?.errorType === 'wrong_item'
                ? 'Wrong item - try again'
                : 'Position barcode here'}
            </Text>
          </View>
          <View style={styles.scanLine} />
        </View>
        {state.showScanResult && state.scanResult ? (
          <View
            style={[
              styles.toastContainer,
              state.scanResult.errorType === 'wrong_item' &&
                styles.errorToastContainer,
            ]}
          >
            <View
              style={[
                styles.toast,
                {
                  backgroundColor: state.scanResult.success
                    ? colors.success
                    : colors.crimsonRed,
                },
                state.scanResult.errorType === 'wrong_item' &&
                  styles.errorToast,
              ]}
            >
              <Text style={styles.toastText}>{state.scanResult.message}</Text>
            </View>
          </View>
        ) : null}
        <View
          style={[
            styles.progressContainer,
            {
              backgroundColor: !isComplete ? colors.lightBlue : colors.blue,
            },
          ]}
        >
          <TouchableOpacity disabled={!isComplete} onPress={onPressDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
          <View style={styles.scannedContainer}>
            <Text>
              Scanned: {fulfilled} / {total}
            </Text>
          </View>
        </View>
      </View>
    </Skeleton>
  );
};

const styles = StyleSheet.create({
  cameraWrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  camera: {position: 'absolute', top: 0, right: 0, bottom: 0, left: 0},
  instructionContainer: {
    top: 84,
    borderRadius: 14,
    paddingVertical: 10,
    alignSelf: 'center',
    position: 'absolute',
    paddingHorizontal: 18,
    backgroundColor: colors.overlay,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.charcoalGrey,
  },
  progressText: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
    color: colors.lightGrey,
  },
  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: Platform.OS === 'android' ? 5 : 0,
    zIndex: 1000,
    backgroundColor: 'transparent',
    ...(Platform.OS === 'android' && {
      shadowColor: colors.black,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    }),
  },
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
    borderColor: colors.white,
    elevation: Platform.OS === 'android' ? 10 : 0,
    zIndex: 1001,
    shadowColor: colors.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    ...(Platform.OS === 'android' && {
      backgroundColor: 'rgba(255,255,255,0.1)',
    }),
    transform: [{scale: 1.02}],
  },
  cornerTL: {
    top: -FRAME_SIZE / 2 + CORNER,
    left: -FRAME_SIZE / 2 + CORNER,
    borderLeftWidth: CORNER_W,
    borderTopWidth: CORNER_W,
    borderTopLeftRadius: 6,
  },
  cornerTR: {
    top: -FRAME_SIZE / 2 + CORNER,
    right: -FRAME_SIZE / 2 + CORNER,
    borderRightWidth: CORNER_W,
    borderTopWidth: CORNER_W,
    borderTopRightRadius: 6,
  },
  cornerBL: {
    bottom: -FRAME_SIZE / 2 + CORNER,
    left: -FRAME_SIZE / 2 + CORNER,
    borderLeftWidth: CORNER_W,
    borderBottomWidth: CORNER_W,
    borderBottomLeftRadius: 6,
  },
  cornerBR: {
    bottom: -FRAME_SIZE / 2 + CORNER,
    right: -FRAME_SIZE / 2 + CORNER,
    borderRightWidth: CORNER_W,
    borderBottomWidth: CORNER_W,
    borderBottomRightRadius: 6,
  },
  toastContainer: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 2000,
  },
  toast: {
    bottom: 120,
    borderRadius: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    position: 'absolute',
    paddingHorizontal: 14,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {color: colors.white, fontWeight: '700'},
  doneText: {color: colors.white, fontSize: 18, fontWeight: '700'},
  progressContainer: {
    bottom: 20,
    width: '80%',
    borderRadius: 50,
    paddingVertical: 10,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },
  scannedContainer: {
    borderRadius: 50,
    paddingVertical: 8,
    flexDirection: 'row',
    paddingHorizontal: 14,
    backgroundColor: colors.white,
  },
  frameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
  },
  errorToastContainer: {
    bottom: 180,
    zIndex: 2000,
  },
  errorToast: {
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    transform: [{scale: 1.05}],
  },
  frameBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
  },
  centerGuide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1002,
  },
  centerGuideText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.white,
    opacity: 0.7,
    transform: [{translateY: -1}],
    zIndex: 1003,
    shadowColor: colors.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});

export {ProductScanner};
