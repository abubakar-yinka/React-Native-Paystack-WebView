import { Currency, DynamicMultiSplitProps, PaymentChannels, PaystackParams, PaystackTransactionResponse } from './types';
export declare const validateParams: (params: PaystackParams, debug: boolean) => boolean;
export declare const sanitize: (value: unknown, fallback: string | number | object, wrapString?: boolean) => string;
export declare const handlePaystackMessage: ({ event, debug, params, onGlobalSuccess, onGlobalCancel, close, }: {
    event: any;
    debug: boolean;
    params: PaystackParams | null;
    onGlobalSuccess?: ((data: PaystackTransactionResponse) => void) | undefined;
    onGlobalCancel?: (() => void) | undefined;
    close?: (() => void) | undefined;
}) => void;
export declare const generatePaystackParams: (config: {
    publicKey: string;
    email: string;
    amount: number;
    reference: string;
    metadata?: object;
    currency?: Currency;
    channels: PaymentChannels;
    plan?: string;
    invoice_limit?: number;
    subaccount?: string;
    split_code?: string;
    split?: DynamicMultiSplitProps;
}) => string;
export declare const paystackHtmlContent: (params: string, method?: 'checkout' | 'newTransaction') => string;
