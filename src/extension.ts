import * as vscode from 'vscode';

function extractVariableList(symbols: vscode.DocumentSymbol[]): vscode.DocumentSymbol[] {
	const variables = symbols.filter(symbol => symbol.kind === vscode.SymbolKind.Constant || symbol.kind === vscode.SymbolKind.Variable);
						
	return variables.concat(symbols.map(symbol => extractVariableList(symbol.children)).reduce((a, b) => a.concat(b), []));
}

export function activate(context: vscode.ExtensionContext) {

	const runVariableCheck = vscode.commands.registerCommand('variable-name-checker.run-variable-check', () => {

		const textEditor = vscode.window.activeTextEditor;
		let variables: string[] = [];

		// Text editor can be undefined, so check
		if (!textEditor) {
			console.log("Failed to access text editor");
			return;
		}

		// Create a list of all variables and constants defined in the text editor
		vscode.commands.executeCommand<vscode.DocumentSymbol[]>
			('vscode.executeDocumentSymbolProvider', textEditor.document.uri)
			.then(symbol => {
				if (!(symbol === undefined)) {
					for (const variable of extractVariableList(symbol)) {
						variables.push(variable.name);
					}
				}
			});

	});

	context.subscriptions.push(runVariableCheck);
}

export function deactivate() {}
