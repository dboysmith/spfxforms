import { BaseFormCustomizer } from "@microsoft/sp-listview-extensibility";
/**
 * If your form customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFormBoilerplateFormCustomizerProperties {
    sampleText?: string;
}
export default class FormBoilerplateFormCustomizer extends BaseFormCustomizer<IFormBoilerplateFormCustomizerProperties> {
    private _listItem;
    private _sp;
    private _pnpListItem;
    private _eTag?;
    onInit(): Promise<void>;
    render(): void;
    onDispose(): void;
    private _loadItem;
    private _onSave;
    private _onSaveNative;
    private _onClose;
}
//# sourceMappingURL=FormBoilerplateFormCustomizer.d.ts.map