import * as React from 'react';
import IFormBoilerplateProps from 'models/IFormBoilerplateProps';
interface IDynamicFormBoilerplateState {
    error: string;
}
export default class DynamicFormBoilerplate extends React.Component<IFormBoilerplateProps, IDynamicFormBoilerplateState> {
    constructor(props: IFormBoilerplateProps);
    render(): React.ReactElement<IFormBoilerplateProps>;
    private _handleSPError;
}
export {};
//# sourceMappingURL=DynamicFormBoilerplate.d.ts.map