var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { DynamicForm } from '@pnp/spfx-controls-react/lib/controls/dynamicForm/DynamicForm';
import { FormDisplayMode } from '@microsoft/sp-core-library';
import { Logger } from '@pnp/logging';
import { MessageBar } from '@fluentui/react/lib/components/MessageBar/MessageBar';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';
var DynamicFormBoilerplate = /** @class */ (function (_super) {
    __extends(DynamicFormBoilerplate, _super);
    function DynamicFormBoilerplate(props) {
        var _this = _super.call(this, props) || this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this._handleSPError = function (listItemData, error) { return __awaiter(_this, void 0, void 0, function () {
            var updateError, httpErr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(error === null || error === void 0 ? void 0 : error.isHttpRequestError)) return [3 /*break*/, 2];
                        httpErr = error;
                        return [4 /*yield*/, httpErr.response.json()];
                    case 1:
                        updateError = (_a.sent())["odata.error"].message.value;
                        return [3 /*break*/, 3];
                    case 2:
                        updateError = error.message || error;
                        _a.label = 3;
                    case 3:
                        Logger.error(error);
                        console.log(updateError);
                        this.setState({
                            error: updateError
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            error: "",
        };
        return _this;
    }
    DynamicFormBoilerplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            this.state.error &&
                React.createElement(MessageBar, { messageBarType: MessageBarType.error, onDismiss: function () { _this.setState({ error: "" }); } }, this.state.error),
            React.createElement(DynamicForm
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            , { 
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                context: this.props.context, listId: this.props.context.list.guid.toString(), listItemId: this.props.context.itemId, onSubmitted: this.props.onSave, onCancelled: this.props.onClose, onSubmitError: this._handleSPError, disabled: this.props.displayMode === FormDisplayMode.Display })));
    };
    return DynamicFormBoilerplate;
}(React.Component));
export default DynamicFormBoilerplate;
//# sourceMappingURL=DynamicFormBoilerplate.js.map