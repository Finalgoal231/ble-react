import { TurboModule, TurboModuleRegistry } from 'react-native';

/**
 * This represents the Turbo Module version of react-native-ble-manager.
 * This adds the codegen definition to react-native generate the c++ bindings on compile time.
 * That should work only on 0.75 and higher.
 * Don't remove it! and please modify with caution! Knowing that can create wrong bindings into jsi and break at compile or execution time.
 *  - Knowing that also every type needs to match the current Objective C++ and Java callbacks types and callbacks type definitions and be aware of the current differences between implementation in both platforms.
 */
export interface Spec extends TurboModule {
    start(
        options: StartOptions,
        callback: (error: CallbackError) => void
    ): void;

    scan(
        serviceUUIDStrings: string[],
        timeoutSeconds: number,
        allowDuplicates: boolean,
        scanningOptions: ScanOptions,
        callback: (error: CallbackError) => void
    ): void;

    stopScan(callback: (error: CallbackError) => void): void;

    connect(
        peripheralUUID: string,
        options: ConnectOptions,
        callback: (error: CallbackError) => void
    ): void;

    disconnect(
        peripheralUUID: string,
        force: boolean,
        callback: (error: CallbackError) => void
    ): void;

    retrieveServices(
        peripheralUUID: string,
        services: string[],
        callback: (error: CallbackError, peripheral: PeripheralInfo) => void
    ): void;

    readRSSI(
        peripheralUUID: string,
        callback: (error: string | null, rssi: number) => void
    ): void;

    readDescriptor(
        peripheralUUID: string,
        serviceUUID: string,
        characteristicUUID: string,
        descriptorUUID: string,
        callback: (error: string | null, data: number[]) => void
    ): void;

    writeDescriptor(
        peripheralUUID: string,
        serviceUUID: string,
        characteristicUUID: string,
        descriptorUUID: string,
        data: object[],
        callback: (error: string | null) => void
    ): void;

    getDiscoveredPeripherals(
        callback: (error: string | null, result: Peripheral[] | null) => void
    ): void;

    checkState(callback: (state: BleState) => void): void;

    write(
        peripheralUUID: string,
        serviceUUID: string,
        characteristicUUID: string,
        message: object[],
        maxByteSize: number,
        callback: (error: string | null) => void
    ): void;

    writeWithoutResponse(
        peripheralUUID: string,
        serviceUUID: string,
        characteristicUUID: string,
        message: object[],
        maxByteSize: number,
        queueSleepTime: number,
        callback: (error: string | null) => void
    ): void;

    read(
        peripheralUUID: string,
        serviceUUID: string,
        characteristicUUID: string,
        callback: (error: string | null, data: number[]) => void
    ): void;

    startNotification(
        peripheralUUID: string,
        serviceUUID: string,
        characteristicUUID: string,
        callback: (error: string | null) => void
    ): void;

    stopNotification(
        peripheralUUID: string,
        serviceUUID: string,
        characteristicUUID: string,
        callback: (error: string | null) => void
    ): void;

    getConnectedPeripherals(
        serviceUUIDStrings: string[],
        callback: (error: string | null, result: Peripheral[] | null) => void
    ): void;

    isPeripheralConnected(
        peripheralUUID: string,
        callback: (error: Peripheral[]) => void
    ): void;

    isScanning(callback: (error: string | null, status: boolean) => void): void;

    getMaximumWriteValueLengthForWithoutResponse(
        peripheralUUID: string,
        callback: (error: string | null, max: number) => void
    ): void;

    getMaximumWriteValueLengthForWithResponse(
        deviceUUID: string,
        callback: (error: string | null, max: number) => void
    ): void;

    enableBluetooth(callback: (error: string | null) => void): void;

    getBondedPeripherals(
        callback: (error: string | null, result: Peripheral[] | null) => void
    ): void;

    createBond(
        peripheralUUID: string,
        devicePin: string,
        callback: (error: string | null) => void
    ): void;

    removeBond(
        peripheralUUID: string,
        callback: (error: string | null) => void
    ): void;

    removePeripheral(
        peripheralUUID: string,
        callback: (error: string | null) => void
    ): void;

    requestMTU(
        peripheralUUID: string,
        mtu: number,
        callback: (error: string | null, mtu: number) => void
    ): void;

    requestConnectionPriority(
        peripheralUUID: string,
        connectionPriority: number,
        callback: (error: string | null, status: boolean) => void
    ): void;

    refreshCache(
        peripheralUUID: string,
        callback: (error: string | null, result: boolean) => void
    ): void;

    setName(name: string): void;

    getAssociatedPeripherals(
        callback: (
            error: string | null,
            peripherals: Peripheral[] | null
        ) => void
    ): void;

    removeAssociatedPeripheral(
        peripheralUUID: string,
        callback: (error: string | null) => void
    ): void;

    supportsCompanion(callback: (supports: boolean) => void): void;

    companionScan(
        serviceUUIDs: string[],
        option: CompanionScanOptions,
        callback: (error: string | null, peripheral: Peripheral | null) => void
    ): void;

    addListener(eventName: string): void;

    removeListeners(count: number): void;
}

export default TurboModuleRegistry.get<Spec>('BleManager') as Spec | null;

/** Turbo Module Type Definitions */
// These types are more loose than types.ts for simplicity and for codegen support.
// No interfaces or generics are currently supported.
export type BleScanCallbackType = number;
export type BleScanMatchCount = number;
export type BleScanMatchMode = number;
export type BleScanMode = number;
export type BleScanPhyMode = number;
export type CallbackError = string | null;
export type BleState = string;

export type StartOptions = {
    showAlert: boolean;
    restoreIdentifierKey: null | string;
    queueIdentifierKey: null | string;
    forceLegacy: null | boolean;
};

export type ConnectOptions = {
    autoconnect: null | boolean;
    phy: null | number;
};

export type CompanionScanOptions = {
    single: null | boolean;
};

export type Peripheral = {
    id: string;
    rssi: number;
    name: null | string;
    advertising: {
        isConnectable: null | boolean;
        localName: null | string;
        rawData: null | {
            CDVType: number[];
            bytes: number[];
            data: string;
        };
        manufacturerData:
            | null
            | {
                  CDVType: number[];
                  bytes: number[];
                  data: string;
              }[];
        manufacturerRawData: null | {
            CDVType: number[];
            bytes: number[];
            data: string;
        };
        serviceData:
            | null
            | {
                  CDVType: number[];
                  bytes: number[];
                  data: string;
              }[];
        serviceUUIDs: null | string[];
        txPowerLevel: null | number;
    };
};

export type PeripheralInfo = {
    id: string;
    rssi: number;
    name: null | string;
    advertising: {
        isConnectable: null | boolean;
        localName: null | string;
        rawData: null | {
            CDVType: number[];
            bytes: number[];
            data: string;
        };
        manufacturerData:
            | null
            | {
                  CDVType: number[];
                  bytes: number[];
                  data: string;
              }[];
        manufacturerRawData: null | {
            CDVType: number[];
            bytes: number[];
            data: string;
        };
        serviceData:
            | null
            | {
                  CDVType: number[];
                  bytes: number[];
                  data: string;
              }[];
        serviceUUIDs: null | string[];
        txPowerLevel: null | number;
    };
    serviceUUIDs: null | string[];
    characteristics:
        | null
        | {
              properties: {
                  Broadcast: null | string;
                  Read: null | string;
                  WriteWithoutResponse: null | string;
                  Write: null | string;
                  Notify: null | string;
                  Indicate: null | string;
                  AuthenticatedSignedWrites: null | string;
                  ExtendedProperties: null | string;
                  NotifyEncryptionRequired: null | string;
                  IndicateEncryptionRequired: null | string;
              };
              characteristic: string;
              service: string;
              descriptors:
                  | null
                  | {
                        value: string;
                        uuid: string;
                    }[];
          }[];
    services: null | { uuid: string }[];
};

export type ScanOptions = {
    numberOfMatches: null | number;
    matchMode: null | number;
    callbackType: null | number;
    scanMode: null | number;
    reportDelay: null | number;
    phy: null | number;
    legacy: null | boolean;
    exactAdvertisingName: null | string | string[];
    manufacturerData: null | {
        manufacturerId: number;
        manufacturerData: null | number[];
        manufacturerDataMask: null | number[];
    };
    single: null | boolean;
    companion: null | boolean;
};
