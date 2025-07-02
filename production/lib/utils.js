"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paystackHtmlContent = exports.generatePaystackParams = exports.handlePaystackMessage = exports.sanitize = exports.validateParams = void 0;
const react_native_1 = require("react-native");
const validateParams = (params, debug) => {
    const errors = [];
    if (!params.email)
        errors.push('Email is required');
    if (!params.amount || typeof params.amount !== 'number' || params.amount <= 0) {
        errors.push('Amount must be a valid number greater than 0');
    }
    if (!params.onSuccess || typeof params.onSuccess !== 'function') {
        errors.push('onSuccess callback is required and must be a function');
    }
    if (!params.onCancel || typeof params.onCancel !== 'function') {
        errors.push('onCancel callback is required and must be a function');
    }
    if (errors.length > 0) {
        debug && console.warn('Paystack Validation Errors:', errors);
        react_native_1.Alert.alert('Payment Error', errors.join('\n'));
        return false;
    }
    return true;
};
exports.validateParams = validateParams;
const sanitize = (value, fallback, wrapString = true) => {
    try {
        if (typeof value === 'string')
            return wrapString ? `'${value}'` : value;
        return JSON.stringify(value ?? fallback);
    }
    catch (e) {
        return JSON.stringify(fallback);
    }
};
exports.sanitize = sanitize;
const handlePaystackMessage = ({ event, debug, params, onGlobalSuccess, onGlobalCancel, close, }) => {
    try {
        const data = JSON.parse(event.nativeEvent.data);
        if (debug)
            console.log('[Paystack] Message Received:', data);
        switch (data.event) {
            case 'success': {
                if (debug)
                    console.log('[Paystack] Success:', data.data);
                params?.onSuccess(data.data);
                onGlobalSuccess?.(data.data);
                close?.();
                break;
            }
            case 'cancel': {
                if (debug)
                    console.log('[Paystack] Cancelled');
                params?.onCancel();
                onGlobalCancel?.();
                close?.();
                break;
            }
            case 'error': {
                if (debug)
                    console.error('[Paystack] Error:', data.error);
                close?.();
                break;
            }
            case 'load': {
                if (debug)
                    console.log('[Paystack] Loaded:', data);
                break;
            }
        }
    }
    catch (e) {
        if (debug)
            console.warn('[Paystack] Message Error:', e);
    }
};
exports.handlePaystackMessage = handlePaystackMessage;
const generatePaystackParams = (config) => {
    const props = [
        `key: '${config.publicKey}'`,
        `email: '${config.email}'`,
        `amount: ${config.amount * 100}`,
        config.currency ? `currency: '${config.currency}'` : '',
        `reference: '${config.reference}'`,
        config.metadata ? `metadata: ${JSON.stringify(config.metadata)}` : '',
        config.channels ? `channels: ${JSON.stringify(config.channels)}` : '',
        config.plan ? `plan: '${config.plan}'` : '',
        config.invoice_limit ? `invoice_limit: ${config.invoice_limit}` : '',
        config.subaccount ? `subaccount: '${config.subaccount}'` : '',
        config.split_code ? `split_code: '${config.split_code}'` : '',
        config.split ? `split: ${JSON.stringify(config.split)}` : '',
        `onSuccess: function(response) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'success', data: response }));
      }`,
        `onCancel: function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'cancel' }));
      }`,
        `onLoad: function(response) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'load', data: response }));
      }`,
        `onError: function(error) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'error', error: { message: error.message } }));
      }`
    ];
    return props.filter(Boolean).join(',\n');
};
exports.generatePaystackParams = generatePaystackParams;
const paystackHtmlContent = (params, method = 'checkout') => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Paystack</title>
    </head>
    <body onload="payWithPaystack()" style="background-color:#fff;height:100vh">
      <script src="https://js.paystack.co/v2/inline.js"></script>
      <script>
        function payWithPaystack() {
          var paystack = new PaystackPop();
          paystack.${method}({
            ${params}
          });
        }
      </script>
    </body>
    </html>
  `;
exports.paystackHtmlContent = paystackHtmlContent;
//# sourceMappingURL=utils.js.map