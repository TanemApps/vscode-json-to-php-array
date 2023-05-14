import * as vscode from "vscode";
import { convertJsonToPhpArray } from "./convert";

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
          const { activeTextEditor } = vscode.window;
          if (activeTextEditor) {
            activeTextEditor?.edit((editBuilder) => {
              const position =
                activeTextEditor.selection?.active || new vscode.Position(0, 0);
              editBuilder.insert(position, phpArrayValue);
            });
          }
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
