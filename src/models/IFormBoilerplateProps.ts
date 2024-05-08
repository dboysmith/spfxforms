import { ITheme } from "@fluentui/react";
import { FormDisplayMode } from "@microsoft/sp-core-library";
import { FormCustomizerContext } from "@microsoft/sp-listview-extensibility";
import { ISPNDAItem } from "./ISPNDAItem";

export default interface IFormBoilerplateProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  theme: ITheme;
  item: ISPNDAItem;
  onSave: (updatedItem: ISPNDAItem) => void;
  onClose: () => void;
}
