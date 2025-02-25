# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- New parameter "Serving size" for Recipe in the administrator form
- New parameter "Serving size" for Recipe in frontend form
- New filter "Difficulty" in the administrator Recipe list
- New "Random Recipe Module" for frontend (`mod_web357_random_recipe`)
  - Displays a random recipe on each page reload, including title, difficulty icons, and serving size
  - Added a link to the full recipe for more details
  - Implemented Cypress test to verify module functionality

### Changed

- Use Font Awesome icons for difficulty levels in the frontend recipe list and single page view instead of plain text
- Display serving size in the frontend recipe list and single page view
