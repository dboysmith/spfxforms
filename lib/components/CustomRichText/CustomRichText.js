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
import * as React from "react";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
require("./richtext.css");
var CustomRichText = /** @class */ (function (_super) {
    __extends(CustomRichText, _super);
    function CustomRichText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomRichText.prototype.render = function () {
        return React.createElement(RichText, { isEditMode: !this.props.disabled, className: "rich-text", value: this.props.message, onChange: this.props.onChange });
    };
    return CustomRichText;
}(React.Component));
export default CustomRichText;
//# sourceMappingURL=CustomRichText.js.map