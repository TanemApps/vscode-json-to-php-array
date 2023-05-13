import * as vscode from "vscode";
import { convertJsonToPhpArray } from "./convert.ts";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "json-to-php-array.fromClipboard",
    () => {
      vscode.env.clipboard.readText().then((jsonValue) => {
        try {
          // Check json syntax.
          JSON.parse(jsonValue);

          // Convert to PHP Array.
          const phpArrayValue = convertJsonToPhpArray(jsonValue);

          // Paste.
          vscode.window.activeTextEditor?.edit((editBuilder) => {
            const position = r.window.activeTextEditor.selection?.active || new r.Position(0,0);
            editBuilder.insert(position, phpArrayValue);
          });
        } catch (error) {
          // Show error message.
          vscode.window.showInformationMessage("Invalid JSON.");
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

// export function deactivate() {}
