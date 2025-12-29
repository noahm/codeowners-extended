import clipboard from "clipboardy";
import { ReadOnlyDict } from "@nmann/codeowners";
import * as vscode from "vscode";
import { getNthProperty } from "./utils";

export async function quickPickTeamList(
  teams: ReadonlyArray<ReadOnlyDict<string>>,
) {
  const items = teams
    .map((info) => ({
      label: getNthProperty(info, 0) || "",
      detail: getNthProperty(info, 1),
      description: getNthProperty(info, 2),
      everything: info,
    }))
    .filter((item) => !!item.label);

  const item = await vscode.window.showQuickPick(items, {
    matchOnDescription: true,
    matchOnDetail: true,
    placeHolder: "Team contact info",
  });
  if (item) {
    return quickPickTeamFields(item.everything);
  }
}

export async function quickPickTeamFields(teamInfo: ReadOnlyDict<string>) {
  const keys = Object.keys(teamInfo) as Array<string>;
  const itemField = await vscode.window.showQuickPick(
    keys.map((key) => ({
      label: teamInfo[key] || "",
      description: key,
    })),
    {
      placeHolder: "Select a field to copy",
    },
  );
  if (itemField && itemField.label) {
    clipboard.writeSync(itemField.label);
    vscode.window.showInformationMessage(
      `Copied "${itemField.label}" to clipboard`,
    );
  }
}
