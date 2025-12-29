# Change Log

All notable changes to the "codeowners-extended" extension will be documented in this file according to recommendations of [Keep a Changelog](http://keepachangelog.com/).

## [v2.0.0] - 2025-12-29

- Adds syntax highlighting support for CODEOWNERS files
- [Breaking] Minimum supported version is VS Code 1.85

## [v1.1.0] - 2024-09-19

- Add support for `.bitbucket` folder for CODEOWNERS location.

## [v1.0.1] - 2022-10-06

- Fix a bug handling paths on windows. The extension is now fully cross-platform!

## [v1.0.0] - 2022-10-06

- Initial public release
  - Parses codeowners files with additional team info comment block
  - Adds a "team list" command that will list all teams in the team info section
    - Selecting a team from the list will present all additional info about the team
    - Selecting a specific piece of team info will copy it to the clipboard
  - Displays owner(s) of current file in the status bar
    - Clicking the status bar item for multiple owners will open a team list filtered to just the owners
    - Clicking the status bar item for a single owner will open the additional info list for that team
