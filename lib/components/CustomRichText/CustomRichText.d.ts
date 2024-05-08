import * as React from "react";
export interface ICustomRichTextProps {
    disabled: boolean;
    message: string;
    onChange: (text: string) => string;
}
export default class CustomRichText extends React.Component<ICustomRichTextProps, {}> {
    render(): React.ReactElement<ICustomRichTextProps>;
}
//# sourceMappingURL=CustomRichText.d.ts.map