# Change Log

All notable changes to the "vscode-codeowners" extension will be documented in this file according to recommendations of [Keep a Changelog](http://keepachangelog.com/).

## [Unreleased]

- Initial public release
  - Parses codeowners files with additional team info comment block
  - Adds a "team list" command that will list all teams in the team info section
    - Selecting a team from the list will present all additional info about the team
    - Selecting a specific piece of team info will copy it to the clipboard
  - Displays owner(s) of current file in the status bar
    - Clicking the status bar item for multiple owners will open a team list filtered to just the owners
    - Clicking the status bar item for a single owner will open the additional info list for that team
