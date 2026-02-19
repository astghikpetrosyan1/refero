"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const safe_input_field_1 = tslib_1.__importDefault(require("@helsenorge/form/components/safe-input-field"));
class NumberSafeInputField extends react_1.Component {
    constructor() {
        super(...arguments);
        this.preventWheel = (e) => {
            e.preventDefault();
        };
        this.handleFocus = (e) => {
            var _a, _b;
            e.currentTarget.addEventListener('wheel', this.preventWheel, { passive: false });
            (_b = (_a = this.props).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, e, this.props.id);
        };
        this.handleBlur = (e) => {
            var _a, _b;
            e.currentTarget.removeEventListener('wheel', this.preventWheel);
            (_b = (_a = this.props).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
    }
    render() {
        return (react_1.default.createElement(safe_input_field_1.default, Object.assign({}, this.props, { type: this.props.type || "number", onFocus: this.handleFocus, onBlur: this.handleBlur }), this.props.children));
    }
}
exports.default = NumberSafeInputField;
//# sourceMappingURL=numberSafeInputField.js.map