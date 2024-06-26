import * as React from "react";
import { Log, FormDisplayMode } from "@microsoft/sp-core-library";
import { Logger } from "@pnp/logging";
import { HttpRequestError } from "@pnp/odata";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { IDropdownOption } from "@fluentui/react/lib/components/Dropdown/Dropdown.types";
import { IBreadcrumbItem } from "@pnp/spfx-controls-react/lib/controls/folderExplorer/FolderExplorer";
import { TextField } from "@fluentui/react/lib/components/TextField/TextField";
import { Label } from "@fluentui/react/lib/components/Label/Label";
import { Toggle } from "@fluentui/react/lib/components/Toggle/Toggle";
import { DatePicker } from "@fluentui/react/lib/components/DatePicker/DatePicker";
import { Dropdown } from "@fluentui/react/lib/components/Dropdown/Dropdown";
import { CommandBar } from "@fluentui/react/lib/components/CommandBar/CommandBar";
import { Separator } from "@fluentui/react/lib/components/Separator/Separator";
import { MessageBar } from "@fluentui/react/lib/components/MessageBar/MessageBar";
import { MessageBarType } from "@fluentui/react/lib/components/MessageBar/MessageBar.types";
import { Breadcrumb } from "@fluentui/react/lib/components/Breadcrumb/Breadcrumb";
import { ICommandBarItemProps } from "@fluentui/react/lib/components/CommandBar/CommandBar.types";
import { IPersonaProps } from "@fluentui/react/lib/components/Persona/Persona.types";
import { PrimaryButton } from "@fluentui/react/lib/components/Button/PrimaryButton/PrimaryButton";

import * as strings from "FormBoilerplateFormCustomizerStrings";
import styles from "./FormBoilerplate.module.scss";
import { ISPNDAItem } from "models/ISPNDAItem";
import { Constants } from "globals/Constants";
import IFormBoilerplateProps from "models/IFormBoilerplateProps";
import CustomRichText from "components/CustomRichText/CustomRichText";

interface IFormBoilerplateState {
  formListItem: ISPNDAItem;
  error: string;
}

const LOG_SOURCE: string = "FormBoilerplate";

export default class FormBoilerplate extends React.Component<
  IFormBoilerplateProps,
  IFormBoilerplateState
> {
  private _completeByItems: IDropdownOption<string>[] = Object.keys(
    Constants.CompleteByChoices
  ).map((value) => {
    return { key: value, text: value };
  });

  constructor(props: IFormBoilerplateProps) {
    super(props);

    this.state = {
      formListItem: this.props.item,
      error: "",
    };
  }

  public componentDidMount(): void {
    Log.info(LOG_SOURCE, "React Element: FormBoilerplate mounted");
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, "React Element: FormBoilerplate unmounted");
  }

  public render(): React.ReactElement<{}> {
    let formTitle: string = strings.BreadCrumbLabelNewItem;

    if (this.props.displayMode !== FormDisplayMode.New) {
      formTitle = this.state.formListItem?.Title;
    }

    const breadcrumb: IBreadcrumbItem[] = [
      { text: this.props.context.list.title, key: "ListTitle" },
      { text: formTitle, key: "ItemTitle", isCurrentItem: true },
    ];

    const formDisabled: boolean =
      this.props.displayMode === FormDisplayMode.Display;

    const formContent: JSX.Element = (
      <div className={styles.helloForm}>
        <TextField
          autoComplete="off"
          required
          label={strings.FieldTitle}
          value={this.state.formListItem?.Title}
          onChange={this._onChangeTitle}
          disabled={formDisabled}
        />

        <Dropdown
          label={strings.FieldCompleteby}
          selectedKey={this.state.formListItem?.StatementofWork}
          options={this._completeByItems}
          onChange={this._onChangeSOW}
          disabled={formDisabled}
        />

        <PeoplePicker
          context={this.props.context as any}
          ensureUser
          defaultSelectedUsers={[this.state.formListItem?.Requestor?.EMail]}
          titleText={strings.FieldMentor}
          personSelectionLimit={1}
          principalTypes={[PrincipalType.User]}
          onChange={this._onChangeRequestor}
          disabled={formDisabled}
        />
      </div>
    );

    return (
      <form
        onSubmit={this._onSubmitSaveItem}
        className={styles.formBoilerplate}
      >
        <CommandBar items={this._getCommandBarItems()} />
        <Separator className={styles.commandBarSeparators} />
        {this.state.error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() => {
              this.setState({ error: "" });
            }}
          >
            {this.state.error}
          </MessageBar>
        )}
        <Breadcrumb items={breadcrumb} className={styles.breadcrumbItem} />
        {formContent}
      </form>
    );
  }

  private _getCommandBarItems = (): ICommandBarItemProps[] => {
    const cancelCmd: ICommandBarItemProps = {
      key: "cancelItem",
      text: strings.Cancel,
      iconProps: { iconName: "Cancel" },
      onClick: () => this.props.onClose(),
      className: styles.commandBarItems,
    };

    const newEditCmds: ICommandBarItemProps[] = [
      {
        key: "saveItem",
        text: strings.Save,
        iconProps: { iconName: "Save" },
        onRender: (item) => this._renderSaveButton(item),
      },
      cancelCmd,
    ];

    const displayCmds: ICommandBarItemProps[] = [
      {
        key: "EditItem",
        text: strings.Edit,
        iconProps: { iconName: "Edit" },
        onClick: () => this._onClickEditItem(),
        className: styles.commandBarItems,
      },
      cancelCmd,
    ];

    return this.props.displayMode === FormDisplayMode.Display
      ? displayCmds
      : newEditCmds;
  };

  private _onClickEditItem(): boolean | void {
    const searchParams = new URLSearchParams(window.location.search);
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
  }

  private _onChangeTitle = (
    _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    const form = this.state.formListItem;
    form.Title = newValue || "";

    this.setState({
      formListItem: form,
    });
  };

  private _onChangeSOW = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption<string>,
    _index?: number
  ): void => {
    const form = this.state.formListItem;
    form.Status = option.text;

    this.setState({
      formListItem: form,
    });
  };

  private _onChangeStatus = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption<string>,
    _index?: number
  ): void => {
    const form = this.state.formListItem;
    form.Status = option.text;

    this.setState({
      formListItem: form,
    });
  };

  private _onChangeRequestor = (items: IPersonaProps[]): void => {
    const form = this.state.formListItem;
    form.Requestor =
      (items.length > 0 && {
        Id: items[0].id,
        EMail: items[0].secondaryText,
      }) ||
      null;

    this.setState({
      formListItem: form,
    });
  };

  private _renderSaveButton = (item: ICommandBarItemProps): React.ReactNode => {
    return (
      <PrimaryButton
        type="submit"
        className={styles.commandBarItems}
        styles={item.buttonStyles}
        text={item.text}
        iconProps={item.iconProps}
      />
    );
  };

  private _onSubmitSaveItem = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    this.setState({
      error: "",
    });

    try {
      await this.props.onSave({
        ...this.state.formListItem,
      });
    } catch (err) {
      let updateError: string;

      if (err?.isHttpRequestError) {
        const httpErr: HttpRequestError = err as HttpRequestError;

        // Handling the concurrency issue as working with ETag
        if (httpErr.status === 412) {
          updateError = strings.ErrorEtagMessage;
        } else {
          updateError = (await httpErr.response.json())["odata.error"].message
            .value;
        }
      } else {
        updateError = err.message || err;
      }

      Logger.error(err);
      console.log(updateError);

      this.setState({
        error: updateError,
      });
    }
  };
}
