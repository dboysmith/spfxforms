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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import * as React from "react";
import { Log, FormDisplayMode } from "@microsoft/sp-core-library";
import { Logger } from "@pnp/logging";
import { PeoplePicker, PrincipalType, } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { TextField } from "@fluentui/react/lib/components/TextField/TextField";
import { Dropdown } from "@fluentui/react/lib/components/Dropdown/Dropdown";
import { CommandBar } from "@fluentui/react/lib/components/CommandBar/CommandBar";
import { Separator } from "@fluentui/react/lib/components/Separator/Separator";
import { MessageBar } from "@fluentui/react/lib/components/MessageBar/MessageBar";
import { MessageBarType } from "@fluentui/react/lib/components/MessageBar/MessageBar.types";
import { Breadcrumb } from "@fluentui/react/lib/components/Breadcrumb/Breadcrumb";
import { PrimaryButton } from "@fluentui/react/lib/components/Button/PrimaryButton/PrimaryButton";
import * as strings from "FormBoilerplateFormCustomizerStrings";
import styles from "./FormBoilerplate.module.scss";
import { Constants } from "globals/Constants";
var LOG_SOURCE = "FormBoilerplate";
var FormBoilerplate = /** @class */ (function (_super) {
    __extends(FormBoilerplate, _super);
    function FormBoilerplate(props) {
        var _this = _super.call(this, props) || this;
        _this._completeByItems = Object.keys(Constants.CompleteByChoices).map(function (value) {
            return { key: value, text: value };
        });
        _this._getCommandBarItems = function () {
            var cancelCmd = {
                key: "cancelItem",
                text: strings.Cancel,
                iconProps: { iconName: "Cancel" },
                onClick: function () { return _this.props.onClose(); },
                className: styles.commandBarItems,
            };
            var newEditCmds = [
                {
                    key: "saveItem",
                    text: strings.Save,
                    iconProps: { iconName: "Save" },
                    onRender: function (item) { return _this._renderSaveButton(item); },
                },
                cancelCmd,
            ];
            var displayCmds = [
                {
                    key: "EditItem",
                    text: strings.Edit,
                    iconProps: { iconName: "Edit" },
                    onClick: function () { return _this._onClickEditItem(); },
                    className: styles.commandBarItems,
                },
                cancelCmd,
            ];
            return _this.props.displayMode === FormDisplayMode.Display
                ? displayCmds
                : newEditCmds;
        };
        _this._onChangeTitle = function (_event, newValue) {
            var form = _this.state.formListItem;
            form.Title = newValue || "";
            _this.setState({
                formListItem: form,
            });
        };
        _this._onChangeSOW = function (_event, option, _index) {
            var form = _this.state.formListItem;
            form.Status = option.text;
            _this.setState({
                formListItem: form,
            });
        };
        _this._onChangeStatus = function (_event, option, _index) {
            var form = _this.state.formListItem;
            form.Status = option.text;
            _this.setState({
                formListItem: form,
            });
        };
        _this._onChangeRequestor = function (items) {
            var form = _this.state.formListItem;
            form.Requestor =
                (items.length > 0 && {
                    Id: items[0].id,
                    EMail: items[0].secondaryText,
                }) ||
                    null;
            _this.setState({
                formListItem: form,
            });
        };
        _this._renderSaveButton = function (item) {
            return (React.createElement(PrimaryButton, { type: "submit", className: styles.commandBarItems, styles: item.buttonStyles, text: item.text, iconProps: item.iconProps }));
        };
        _this._onSubmitSaveItem = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var err_1, updateError, httpErr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        this.setState({
                            error: "",
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 9]);
                        return [4 /*yield*/, this.props.onSave(__assign({}, this.state.formListItem))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        err_1 = _a.sent();
                        updateError = void 0;
                        if (!(err_1 === null || err_1 === void 0 ? void 0 : err_1.isHttpRequestError)) return [3 /*break*/, 7];
                        httpErr = err_1;
                        if (!(httpErr.status === 412)) return [3 /*break*/, 4];
                        updateError = strings.ErrorEtagMessage;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, httpErr.response.json()];
                    case 5:
                        updateError = (_a.sent())["odata.error"].message
                            .value;
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        updateError = err_1.message || err_1;
                        _a.label = 8;
                    case 8:
                        Logger.error(err_1);
                        console.log(updateError);
                        this.setState({
                            error: updateError,
                        });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            formListItem: _this.props.item,
            error: "",
        };
        return _this;
    }
    FormBoilerplate.prototype.componentDidMount = function () {
        Log.info(LOG_SOURCE, "React Element: FormBoilerplate mounted");
    };
    FormBoilerplate.prototype.componentWillUnmount = function () {
        Log.info(LOG_SOURCE, "React Element: FormBoilerplate unmounted");
    };
    FormBoilerplate.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        var formTitle = strings.BreadCrumbLabelNewItem;
        if (this.props.displayMode !== FormDisplayMode.New) {
            formTitle = (_a = this.state.formListItem) === null || _a === void 0 ? void 0 : _a.Title;
        }
        var breadcrumb = [
            { text: this.props.context.list.title, key: "ListTitle" },
            { text: formTitle, key: "ItemTitle", isCurrentItem: true },
        ];
        var formDisabled = this.props.displayMode === FormDisplayMode.Display;
        var formContent = (React.createElement("div", { className: styles.helloForm },
            React.createElement(TextField, { autoComplete: "off", required: true, label: strings.FieldTitle, value: (_b = this.state.formListItem) === null || _b === void 0 ? void 0 : _b.Title, onChange: this._onChangeTitle, disabled: formDisabled }),
            React.createElement(Dropdown, { label: strings.FieldCompleteby, selectedKey: (_c = this.state.formListItem) === null || _c === void 0 ? void 0 : _c.StatementofWork, options: this._completeByItems, onChange: this._onChangeSOW, disabled: formDisabled }),
            React.createElement(PeoplePicker, { context: this.props.context, ensureUser: true, defaultSelectedUsers: [(_e = (_d = this.state.formListItem) === null || _d === void 0 ? void 0 : _d.Requestor) === null || _e === void 0 ? void 0 : _e.EMail], titleText: strings.FieldMentor, personSelectionLimit: 1, principalTypes: [PrincipalType.User], onChange: this._onChangeRequestor, disabled: formDisabled })));
        return (React.createElement("form", { onSubmit: this._onSubmitSaveItem, className: styles.formBoilerplate },
            React.createElement(CommandBar, { items: this._getCommandBarItems() }),
            React.createElement(Separator, { className: styles.commandBarSeparators }),
            this.state.error && (React.createElement(MessageBar, { messageBarType: MessageBarType.error, onDismiss: function () {
                    _this.setState({ error: "" });
                } }, this.state.error)),
            React.createElement(Breadcrumb, { items: breadcrumb, className: styles.breadcrumbItem }),
            formContent));
    };
    FormBoilerplate.prototype._onClickEditItem = function () {
        var searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("PageType")) {
            searchParams.set("PageType", FormDisplayMode.Edit.toString());
            window.location.href =
                location.protocol +
                    "//" +
                    location.host +
                    location.pathname +
                    "?" +
                    searchParams;
        }
    };
    return FormBoilerplate;
}(React.Component));
export default FormBoilerplate;
//# sourceMappingURL=FormBoilerplate.js.map