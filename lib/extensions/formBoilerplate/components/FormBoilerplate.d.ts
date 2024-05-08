import * as React from "react";
import { ISPNDAItem } from "models/ISPNDAItem";
import IFormBoilerplateProps from "models/IFormBoilerplateProps";
interface IFormBoilerplateState {
    formListItem: ISPNDAItem;
    error: string;
}
export default class FormBoilerplate extends React.Component<IFormBoilerplateProps, IFormBoilerplateState> {
    private _completeByItems;
    constructor(props: IFormBoilerplateProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<{}>;
    private _getCommandBarItems;
    private _onClickEditItem;
    private _onChangeTitle;
    private _onChangeSOW;
    private _onChangeStatus;
    private _onChangeRequestor;
    private _renderSaveButton;
    private _onSubmitSaveItem;
}
export {};
//# sourceMappingURL=FormBoilerplate.d.ts.map