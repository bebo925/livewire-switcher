// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "livewire-switcher" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('livewire-switcher.switch', async () => {
    // console.log(vscode.workspace.asRelativePath(vscode.window.activeTextEditor?.document.fileName || ''));
    if (vscode.workspace.workspaceFolders && vscode.window.activeTextEditor) {
      if (vscode.workspace.asRelativePath(vscode.window.activeTextEditor?.document.fileName).startsWith('resources/views/livewire/')) {
        const relativePath = vscode.window.activeTextEditor?.document.fileName.split('resources/views/livewire/')[1];
        let file = relativePath
          .split('/')
          .map((d, index, array) => {
            if (index === array.length - 1) {
              let c = d.split('.blade').join('');
              return c.charAt(0).toUpperCase() + c.slice(1);
            } else {
              return d.charAt(0).toUpperCase() + d.slice(1);
            }
          })
          .join('/');
        const document = await vscode.workspace.openTextDocument(vscode.workspace.workspaceFolders[0].uri.path + '/app/Http/Livewire/' + file);
        await vscode.window.showTextDocument(document);
      } else if (vscode.workspace.asRelativePath(vscode.window.activeTextEditor?.document.fileName).startsWith('app/Http/Livewire/')) {
        const relativePath = vscode.window.activeTextEditor?.document.fileName.split('app/Http/Livewire/')[1];
        let file = relativePath
          .split('/')
          .map((d, index, array) => {
            if (index === array.length - 1) {
              let c = d.split('.php')[0] + '.blade.php';
              return c.toLocaleLowerCase();
            } else {
              return d.toLocaleLowerCase();
            }
          })
          .join('/');
        const document = await vscode.workspace.openTextDocument(vscode.workspace.workspaceFolders[0].uri.path + '/resources/views/livewire/' + file);
        await vscode.window.showTextDocument(document);
      }
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
