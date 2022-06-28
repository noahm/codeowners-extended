import * as vscode from "vscode";
import { OwnerDisplay, OwnerDisplayController } from "./owner-display";
import { quickPickTeamList, quickPickTeamFields } from "./quick-picks";

export function activate(context: vscode.ExtensionContext) {
  const ownerDisplay = new OwnerDisplay();
  const ownerDisplayControler = new OwnerDisplayController(ownerDisplay);

  context.subscriptions.push(ownerDisplay);
  context.subscriptions.push(ownerDisplayControler);

  vscode.commands.registerCommand("codeowners.contactInfo", () => {
    const codeowners = ownerDisplay.getCodeowners();
    if (!codeowners) {
      vscode.window.showErrorMessage(
        "No codeowners info is available at the moment"
      );
      return;
    }

    if (!codeowners.contactInfo.length) {
      vscode.window.showWarningMessage(
        "No usable contact info found in your CODEOWNERS file"
      );
      return;
    }

    quickPickTeamList(codeowners.contactInfo);
  });

  vscode.commands.registerCommand("codeowners.contactInfo.currentFile", () => {
    const codeowners = ownerDisplay.getCodeowners();
    if (!codeowners) {
      vscode.window.showErrorMessage(
        "No codeowners info is available at the moment"
      );
      return;
    }

    const currentOwners = ownerDisplay.getCurrentFileOwners();
    const teamInfoMap = ownerDisplay.teamInfo;
    if (!teamInfoMap) {
      vscode.window.showErrorMessage(
        "No codeowners contact info is available at the moment"
      );
      return;
    }

    const teamInfo = currentOwners
      .map((teamName) => teamInfoMap.get(teamName)!)
      .filter((info) => !!info);

    if (!teamInfo.length) {
      vscode.window.showInformationMessage(
        "This file has no owner information."
      );
    } else if (teamInfo.length > 1) {
      quickPickTeamList(teamInfo);
    } else {
      quickPickTeamFields(teamInfo[0]);
    }
  });
}

export function deactivate() {}
