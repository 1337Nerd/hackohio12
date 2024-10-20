// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    type BarcodeFormat = 'aztec'
        | 'code_128'
        | 'code_39'
        | 'code_93'
        | 'codabar'
        | 'data_matrix'
        | 'ean_13'
        | 'ean_8'
        | 'itf'
        | 'pdf417'
        | 'qr_code'
        | 'upc_a'
        | 'upc_e'
        | 'unknown';

    /**
     * The return type of the Barcode Detect API `detect` function that
     * describes a barcode that has been recognized by the API.
     */
    interface DetectedBarcode {
        /** 
         * A DOMRectReadOnly, which returns the dimensions of a rectangle
         * representing the extent of a detected barcode, aligned with the
         * image 
         */
        boundingBox: DOMRectReadOnly;
        /**
         * The x and y co-ordinates of the four corner points of the detected
         * barcode relative to the image, starting with the top left and working
         * clockwise. This may not be square due to perspective distortions
         * within the image. 
         */
        cornerPoints: {
            x: number,
            y: number,
        }[4];
        /**
         * The detected barcode format
         */
        format: BarcodeFormat;

        /**
         * A string decoded from the barcode data
         */
        rawValue: string;
    }

    /**
     * Options for describing how a BarcodeDetector should be initialised
     */
    interface BarcodeDetectorOptions {
        /** 
         * Which formats the barcode detector should detect 
         */
        formats: BarcodeFormat[];
    }

    /**
     * The BarcodeDetector interface of the Barcode Detection API allows
     * detection of linear and two dimensional barcodes in images.
     */
    class BarcodeDetector {
        /** 
         * Initialize a Barcode Detector instance 
         */
        constructor(options?: BarcodeDetectorOptions): BarcodeDetector;

        /**
         * Retrieve the formats that are supported by the detector 
         */
        static getSupportedFormats(): Promise<BarcodeFormat[]>;

        /** 
         * Attempt to detect barcodes from an image source  
         */
        public detect(source: ImageBitmapSource): Promise<DetectedBarcode[]>;
    }
    interface Window {
        BarcodeDetector: BarcodeDetector
    }
    interface CVEData {
        dataType: string;
        dataVersion: string;
        cveMetadata: CVEMetadata;
        containers: Containers;
        vendor: string;
    }

    interface CVEMetadata {
        state: string;
        cveId: string;
        assignerOrgId: string;
        assignerShortName: string;
        dateUpdated: string;
        dateReserved: string;
        datePublished: string;
    }

    interface Containers {
        cna: CNA;
        adp: ADP[];
    }

    interface CNA {
        providerMetadata: ProviderMetadata;
        descriptions: Description[];
        affected: Affected[];
        references: Reference[];
        problemTypes: ProblemType[];
    }

    interface ProviderMetadata {
        orgId: string;
        shortName: string;
        dateUpdated: string;
    }

    interface Description {
        lang: string;
        value: string;
    }

    interface Affected {
        vendor: string;
        product: string;
        versions: Version[];
    }

    interface Version {
        version: string;
        status: string;
    }

    interface Reference {
        url?: string;
        name?: string;
        tags?: string[];
    }

    interface ProblemType {
        descriptions: ProblemDescription[];
    }

    interface ProblemDescription {
        type: string;
        lang: string;
        description: string;
    }

    interface ADP {
        providerMetadata: ProviderMetadata;
        title: string;
        references: Reference[];
    }

    interface CVEList {
        cvelistv5: Array<[string, CVEData]>;
    }

    namespace App {
        interface Platform {
			env: {
				API_KEY: string,
            }
        }
    }

    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
}

export { };
