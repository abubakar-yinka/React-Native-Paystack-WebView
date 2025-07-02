"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackProvider = exports.PaystackContext = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_webview_1 = require("react-native-webview");
const utils_1 = require("./utils");
const styles_1 = require("./styles");
exports.PaystackContext = (0, react_1.createContext)(null);
const PaystackProvider = ({ publicKey, currency, defaultChannels = ['card'], debug = false, children, onGlobalSuccess, onGlobalCancel, }) => {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [params, setParams] = (0, react_1.useState)(null);
    const [method, setMethod] = (0, react_1.useState)('checkout');
    const fallbackRef = (0, react_1.useMemo)(() => `ref_${Date.now()}`, []);
    const open = (0, react_1.useCallback)((params, selectedMethod) => {
        if (debug)
            console.log(`[Paystack] Opening modal with method: ${selectedMethod}`);
        if (!(0, utils_1.validateParams)(params, debug))
            return;
        setParams(params);
        setMethod(selectedMethod);
        setVisible(true);
    }, [debug]);
    const checkout = (params) => open(params, 'checkout');
    const newTransaction = (params) => open(params, 'newTransaction');
    const close = () => {
        setVisible(false);
        setParams(null);
    };
    const handleMessage = (event) => {
        (0, utils_1.handlePaystackMessage)({
            event,
            debug,
            params,
            onGlobalSuccess,
            onGlobalCancel,
            close,
        });
    };
    const paystackHTML = (0, react_1.useMemo)(() => {
        if (!params)
            return '';
        return (0, utils_1.paystackHtmlContent)((0, utils_1.generatePaystackParams)({
            publicKey,
            email: params.email,
            amount: params.amount,
            reference: params.reference || fallbackRef,
            metadata: params.metadata,
            ...(currency && { currency }),
            channels: defaultChannels,
            plan: params.plan,
            invoice_limit: params.invoice_limit,
            subaccount: params.subaccount,
            split: params.split,
            split_code: params.split_code,
        }), method);
    }, [params, method]);
    if (debug && visible) {
        console.log('[Paystack] HTML Injected:', paystackHTML);
    }
    return (<exports.PaystackContext.Provider value={{ popup: { checkout, newTransaction } }}>
            {children}
            <react_native_1.Modal visible={visible} transparent animationType="slide">
                <react_native_1.View style={styles_1.styles.container}>
                    <react_native_webview_1.WebView originWhitelist={["*"]} source={{ html: paystackHTML }} onMessage={handleMessage} javaScriptEnabled domStorageEnabled startInLoadingState onLoadStart={() => debug && console.log('[Paystack] WebView Load Start')} onLoadEnd={() => debug && console.log('[Paystack] WebView Load End')} renderLoading={() => <react_native_1.ActivityIndicator size="large"/>}/>
                </react_native_1.View>
            </react_native_1.Modal>
        </exports.PaystackContext.Provider>);
};
exports.PaystackProvider = PaystackProvider;
//# sourceMappingURL=PaystackProvider.js.map