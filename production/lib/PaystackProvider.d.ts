import React from 'react';
import { PaystackParams, PaystackProviderProps } from './types';
export declare const PaystackContext: React.Context<{
    popup: {
        checkout: (params: PaystackParams) => void;
        newTransaction: (params: PaystackParams) => void;
    };
} | null>;
export declare const PaystackProvider: React.FC<PaystackProviderProps>;
