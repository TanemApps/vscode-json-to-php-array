import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "json-to-php-array.fromClipboard",
    () => {
      vscode.env.clipboard.readText().then((jsonValue) => {
        try {
          // Check json syntax.
          JSON.parse(jsonValue);

          // Convert to PHP Array.
          const phpArrayValue = jsonValue
            .replaceAll("{", "[")
            .replaceAll("}", "]")
            .replaceAll(":", " =>");

          // Paste.
          vscode.window.activeTextEditor?.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(0, 0), phpArrayValue);
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
