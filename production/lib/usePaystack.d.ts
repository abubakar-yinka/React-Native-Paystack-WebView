export declare const usePaystack: () => {
    popup: {
        checkout: (params: import("./types").PaystackParams) => void;
        newTransaction: (params: import("./types").PaystackParams) => void;
    };
};
