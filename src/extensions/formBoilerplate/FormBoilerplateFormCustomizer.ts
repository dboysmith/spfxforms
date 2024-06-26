import * as React from "react";
import * as ReactDOM from "react-dom";

import { FormDisplayMode, Log } from "@microsoft/sp-core-library";
import { BaseFormCustomizer } from "@microsoft/sp-listview-extensibility";

import { getDefaultTheme } from "@pnp/spfx-controls-react/lib/EnhancedThemeProvider";
import { IItemAddResult, IItems, IItemUpdateResult } from "@pnp/sp/items/types";

import { getSP } from "configs/pnpConfig";
import { SPFI } from "@pnp/sp";
import { ISPNDAItem } from "models/ISPNDAItem";
import IFormBoilerplateProps from "models/IFormBoilerplateProps";
import FormBoilerplate from "./components/FormBoilerplate";
import DynamicFormBoilerplate from "components/DynamicFormBoilerplate";

/**
 * If your form customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFormBoilerplateFormCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = "FormBoilerplateFormCustomizer";

export default class FormBoilerplateFormCustomizer extends BaseFormCustomizer<IFormBoilerplateFormCustomizerProperties> {
  private _listItem: ISPNDAItem;
  private _sp: SPFI;
  private _pnpListItem: IItems;
  private _eTag?: string = "*";

  public async onInit(): Promise<void> {
    // Add your custom initialization to this method. The framework will wait
    // for the returned promise to resolve before rendering the form.
    Log.info(
      LOG_SOURCE,
      "Activated FormBoilerplateFormCustomizer with properties:"
    );
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));

    this._sp = getSP(this.context);
    this._pnpListItem = this._sp.web.lists.getById(
      this.context.list.guid.toString()
    ).items;

    if (this.displayMode !== FormDisplayMode.New) {
      this._listItem = await this._loadItem();
    } else {
      this._listItem = {} as ISPNDAItem;
    }

    return Promise.resolve();
  }

  public render(): void {
    // Use this method to perform your custom rendering.

    // const formCustomizer = DynamicFormBoilerplate;
    const formCustomizer = FormBoilerplate;

    const formBoilerplate: React.ReactElement<{}> = React.createElement(
      formCustomizer,
      {
        context: this.context,
        displayMode: this.displayMode,
        theme: getDefaultTheme(),
        item: this._listItem,
        onSave: this._onSave,
        onClose: this._onClose,
      } as IFormBoilerplateProps
    );

    ReactDOM.render(formBoilerplate, this.domElement);
  }

  public onDispose(): void {
    // This method should be used to free any resources that were allocated during rendering.
    ReactDOM.unmountComponentAtNode(this.domElement);
    super.onDispose();
  }

  private _loadItem = async (): Promise<ISPNDAItem> => {
    const item = await this._pnpListItem
      .getById(this.context.itemId)
      .select(
        "ID ,Status, Partner,Requestor/ID,Requestor/FirstName,Requestor/LastName,Requestor/EMail,TypeofDocument,Parry_x0020_Labs_x0020_Role,PartnersRole,Type_x0020_TA,DateSigned,OpportunityName,PipelineNumber,StatementofWork,Comments"
      )
      .expand("Requestor")();

    // Saving ETag for the update
    this._eTag = item["odata.etag"];

    // Removing unecessary data before passing list item to the component
    delete item["odata.type"];
    delete item["odata.etag"];
    delete item["odata.editLink"];
    delete item["odata.metadata"];
    delete item["odata.id"];
    delete item["Mentor@odata.navigationLinkUrl"];

    return item as ISPNDAItem;
  };

  private _onSave = async (updatedItem: ISPNDAItem): Promise<void> => {
    let res: IItemAddResult | IItemUpdateResult;

    const item = {
      MentorId: updatedItem.Requestor?.Id || null,
      ...updatedItem,
    };

    // Remove the Mentor Field as loaded to avoid an "EntitySet error"
    delete item.Requestor;

    if (this.context.itemId > 0) {
      res = await this._pnpListItem
        .getById(this.context.itemId)
        .update(item, this._eTag);
    } else {
      res = await this._pnpListItem.add(item);
    }

    if (!DEBUG) {
      this._onSaveNative();
    } else {
      // Save new ETag perform multiple savings in debug mode
      this._eTag = res.data.etag;
    }
  };

  private _onSaveNative = (): void => {
    // You MUST call this.formSaved() after you save the form.
    this.formSaved();
  };

  private _onClose = (): void => {
    // You MUST call this.formClosed() after you close the form.
    this.formClosed();
  };
}
