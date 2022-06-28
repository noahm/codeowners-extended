import * as vscode from "vscode";
import Codeowners from "twitch-codeowners";
import { getNthProperty } from "./utils";

export class OwnerDisplay {
  private statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000
  );
  private codeowners: Codeowners | null = null;
  public teamInfo: Map<string, Record<string, string>> | null = null;
  private pathPrefixLength = 0;

  constructor() {
    this.refreshOwnersFile();
    this.statusBarItem.tooltip = "Owners";
    this.statusBarItem.command = "codeowners.contactInfo.currentFile";
  }

  public getCodeowners() {
    return this.codeowners;
  }

  public getCurrentFileOwners() {
    if (!this.codeowners || !vscode.window.activeTextEditor) {
      return [];
    }
    return this.codeowners.getOwner(
      vscode.window.activeTextEditor.document.fileName.slice(
        this.pathPrefixLength
      )
    );
  }

  public refreshOwnersFile() {
    try {
      this.codeowners = new Codeowners(
        vscode.workspace.workspaceFolders![0].uri.path
      );
      this.teamInfo = new Map(
        this.codeowners.contactInfo
          .map((teamInfo) => [getNthProperty(teamInfo, 0)!, teamInfo] as const)
          .filter((item) => !!item[0])
      );
      this.pathPrefixLength = this.codeowners.codeownersDirectory.length + 1;
    } catch (e) {
      this.codeowners = null;
      this.teamInfo = null;
    }
  }

  public update() {
    if (!this.codeowners || !vscode.window.activeTextEditor) {
      this.statusBarItem.hide();
      return;
    }

    const currentOwners = this.getCurrentFileOwners();
    if (currentOwners.length) {
      this.statusBarItem.text = `$(organization) ${currentOwners[0]}`;
      if (currentOwners.length > 1) {
        this.statusBarItem.text += ` (+${currentOwners.length - 1})`;
      }
    } else {
      this.statusBarItem.text = "No Owner";
    }
    this.statusBarItem.show();
  }

  public dispose() {}
}

export class OwnerDisplayController {
  private disposable: vscode.Disposable;
  private ownerDisplay: OwnerDisplay;

  constructor(ownerDisplay: OwnerDisplay) {
    this.ownerDisplay = ownerDisplay;

    // subscribe to selection change and editor activation events
    // create a combined disposable from both event subscriptions
    this.disposable = vscode.Disposable.from(
      vscode.window.onDidChangeActiveTextEditor(this.onEditorChange, this),
      vscode.workspace.onDidChangeWorkspaceFolders(this.onWorkspaceChange, this)
    );

    // update the counter for the current file
    this.ownerDisplay.update();
  }

  public dispose() {
    this.disposable.dispose();
  }

  private onEditorChange() {
    this.ownerDisplay.update();
  }

  private onWorkspaceChange() {
    this.ownerDisplay.refreshOwnersFile();
    this.ownerDisplay.update();
  }
}
