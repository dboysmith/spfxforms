import { spfi, SPFx } from "@pnp/sp";
import { PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
var _sp = null;
export var getSP = function (context) {
    if (_sp === null && context !== null) {
        _sp = spfi().using(SPFx(context)).using(PnPLogging(2 /* Warning */));
    }
    return _sp;
};
//# sourceMappingURL=pnpConfig.js.map