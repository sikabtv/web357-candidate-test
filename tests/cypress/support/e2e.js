// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Add attachFile() command, which is used in installExtensionFromFileUpload()
import 'cypress-file-upload';

// Register Joomla Cypress custom commands from npm module 'joomla-cypress'
import {registerCommands} from "joomla-cypress";

registerCommands();
