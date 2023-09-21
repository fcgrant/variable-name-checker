import * as vscode from 'vscode';

function extractVariableNames(symbols: vscode.DocumentSymbol[]): vscode.DocumentSymbol[] {
	const variables = symbols.filter(symbol =>
		symbol.kind === vscode.SymbolKind.Constant ||
		symbol.kind === vscode.SymbolKind.Variable);
						
	return variables.concat(symbols.map(symbol =>
		extractVariableNames(symbol.children)).reduce((a, b) => a.concat(b), []));
}

async function runVariableCheck() {
	const textEditor = vscode.window.activeTextEditor;
	let variables: string[] = [];
	// Text editor can be undefined, so check
	if (!textEditor) {
		console.log("Failed to access text editor");
		return;
	}

	const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>
	('vscode.executeDocumentSymbolProvider', textEditor.document.uri);

	if (symbols !== undefined) {
		for (const variable of extractVariableNames(symbols)) {
			variables.push(variable.name);
		}
	}
}

export function activate(context: vscode.ExtensionContext) {

	const variableCheck = vscode.commands.registerCommand('variable-name-checker.run-variable-check', () => {
		runVariableCheck();
	});
	context.subscriptions.push(variableCheck);
}

export function deactivate() {}