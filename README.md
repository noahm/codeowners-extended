# codeowners-extended

Get more out of your CODEOWNERS file. Supports all standard locations including `.github`, `.gitlab`, and `.bitbucket` directories.

Allows easy access to contact info for code owners encoded within the CODEOWNERS file in a simple space-separated format. More info on that [over here](https://github.com/noahm/codeowners?tab=readme-ov-file#team-metadata).

## Features

Displays the owner of the current file in the status bar.

![A preview of the extension](images/statusbar-low.gif)

If you provide contact info in your CODEOWNERS file, this allows you easy access to that info for any individual or team via a quick-search command.

![A preview of the quick search menu](images/menu-low.gif)

## Installation

The simplest way to install is from the official extension marketplace: https://marketplace.visualstudio.com/items?itemName=noahm.codeowners-extended

Alternatively, download the latest release from the releases section here. Run `code --install-extension codeowners-extended-X.X.X.vsix` or, from the "..." menu at the top of the extensions sidebar inside VS Code, pick "Install from VISX..."

## Requirements

Add a CODEOWNERS file to your project according to [Github documentation](https://help.github.com/articles/about-codeowners/)

Team contact info will only be available for projects that include a structured contact info section
within its CODEOWNERS file according to the specs described [here](https://github.com/noahm/codeowners?tab=readme-ov-file#team-metadata).

## Extension Settings

No settings have been implemented yet. May one day add the ability to pick specific info field names for display in the team list.

## Known Issues

None yet!

## Release Notes

See the [changelog](CHANGELOG.md)

## Acknowledgements

Icon from the [Feather Icons](https://feathericons.com/) set used under MIT license.
