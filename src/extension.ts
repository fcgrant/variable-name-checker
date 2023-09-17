import * as vscode from 'vscode';

function extractVariableList(symbols: vscode.DocumentSymbol[]): vscode.DocumentSymbol[] {
	const variables = symbols.filter(symbol => symbol.kind === vscode.SymbolKind.Constant || symbol.kind === vscode.SymbolKind.Variable);
						
	return variables.concat(symbols.map(symbol => extractVariableList(symbol.children)).reduce((a, b) => a.concat(b), []));
}

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('variable-name-checker.helloWorld', () => {

		const textEditor = vscode.window.activeTextEditor;

		// Text editor can be undefined, so check
		if (!textEditor) {
			console.log("Cannot access text editor");
			return;
		}

		// Get the data from inside the text file
		const fileText = textEditor.document.getText();

		const symbols = vscode.commands.executeCommand<vscode.DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', textEditor.document.uri);

		symbols.then(symbol => {
			if (!(symbol === undefined)) {
				for (const variable of extractVariableList(symbol)) {
					vscode.window.showInformationMessage(variable.name);
				}

			}
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
