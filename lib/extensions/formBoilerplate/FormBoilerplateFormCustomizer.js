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
import * as ReactDOM from "react-dom";
import { FormDisplayMode, Log } from "@microsoft/sp-core-library";
import { BaseFormCustomizer } from "@microsoft/sp-listview-extensibility";
import { getDefaultTheme } from "@pnp/spfx-controls-react/lib/EnhancedThemeProvider";
import { getSP } from "configs/pnpConfig";
import FormBoilerplate from "./components/FormBoilerplate";
var LOG_SOURCE = "FormBoilerplateFormCustomizer";
var FormBoilerplateFormCustomizer = /** @class */ (function (_super) {
    __extends(FormBoilerplateFormCustomizer, _super);
    function FormBoilerplateFormCustomizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._eTag = "*";
        _this._loadItem = function () { return __awaiter(_this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._pnpListItem
                            .getById(this.context.itemId)
                            .select("ID ,Status, Partner,Requestor/ID,Requestor/FirstName,Requestor/LastName,Requestor/EMail,TypeofDocument,Parry_x0020_Labs_x0020_Role,PartnersRole,Type_x0020_TA,DateSigned,OpportunityName,PipelineNumber,StatementofWork,Comments")
                            .expand("Requestor")()];
                    case 1:
                        item = _a.sent();
                        // Saving ETag for the update
                        this._eTag = item["odata.etag"];
                        // Removing unecessary data before passing list item to the component
                        delete item["odata.type"];
                        delete item["odata.etag"];
                        delete item["odata.editLink"];
                        delete item["odata.metadata"];
                        delete item["odata.id"];
                        delete item["Mentor@odata.navigationLinkUrl"];
                        return [2 /*return*/, item];
                }
            });
        }); };
        _this._onSave = function (updatedItem) { return __awaiter(_this, void 0, void 0, function () {
            var res, item;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        item = __assign({ MentorId: ((_a = updatedItem.Requestor) === null || _a === void 0 ? void 0 : _a.Id) || null }, updatedItem);
                        // Remove the Mentor Field as loaded to avoid an "EntitySet error"
                        delete item.Requestor;
                        if (!(this.context.itemId > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._pnpListItem
                                .getById(this.context.itemId)
                                .update(item, this._eTag)];
                    case 1:
                        res = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this._pnpListItem.add(item)];
                    case 3:
                        res = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!DEBUG) {
                            this._onSaveNative();
                        }
                        else {
                            // Save new ETag perform multiple savings in debug mode
                            this._eTag = res.data.etag;
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this._onSaveNative = function () {
            // You MUST call this.formSaved() after you save the form.
            _this.formSaved();
        };
        _this._onClose = function () {
            // You MUST call this.formClosed() after you close the form.
            _this.formClosed();
        };
        return _this;
    }
    FormBoilerplateFormCustomizer.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Add your custom initialization to this method. The framework will wait
                        // for the returned promise to resolve before rendering the form.
                        Log.info(LOG_SOURCE, "Activated FormBoilerplateFormCustomizer with properties:");
                        Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
                        this._sp = getSP(this.context);
                        this._pnpListItem = this._sp.web.lists.getById(this.context.list.guid.toString()).items;
                        if (!(this.displayMode !== FormDisplayMode.New)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this._loadItem()];
                    case 1:
                        _a._listItem = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this._listItem = {};
                        _b.label = 3;
                    case 3: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    FormBoilerplateFormCustomizer.prototype.render = function () {
        // Use this method to perform your custom rendering.
        // const formCustomizer = DynamicFormBoilerplate;
        var formCustomizer = FormBoilerplate;
        var formBoilerplate = React.createElement(formCustomizer, {
            context: this.context,
            displayMode: this.displayMode,
            theme: getDefaultTheme(),
            item: this._listItem,
            onSave: this._onSave,
            onClose: this._onClose,
        });
        ReactDOM.render(formBoilerplate, this.domElement);
    };
    FormBoilerplateFormCustomizer.prototype.onDispose = function () {
        // This method should be used to free any resources that were allocated during rendering.
        ReactDOM.unmountComponentAtNode(this.domElement);
        _super.prototype.onDispose.call(this);
    };
    return FormBoilerplateFormCustomizer;
}(BaseFormCustomizer));
export default FormBoilerplateFormCustomizer;
//# sourceMappingURL=FormBoilerplateFormCustomizer.js.map