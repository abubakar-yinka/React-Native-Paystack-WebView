"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = exports.STATUSBAR_HEIGHT = void 0;
const react_native_1 = require("react-native");
exports.STATUSBAR_HEIGHT = react_native_1.StatusBar.currentHeight;
exports.styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: exports.STATUSBAR_HEIGHT,
    },
});
//# sourceMappingURL=styles.js.map