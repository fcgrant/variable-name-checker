import * as vscode from 'vscode';
import highlightVariables from './highlight';

function extractVariableNames(symbols: vscode.DocumentSymbol[]): vscode.DocumentSymbol[] {
	const variables = symbols.filter(symbol =>
		symbol.kind === vscode.SymbolKind.Constant ||
		symbol.kind === vscode.SymbolKind.Variable);
						
	return variables.concat(symbols.map(symbol =>
		extractVariableNames(symbol.children)).reduce((a, b) => a.concat(b), []));
}

async function runVariableCheck() {
	const textEditor = vscode.window.activeTextEditor;
	let variables: Map<string, vscode.Position> = new Map();

	// Text editor can be undefined, so check
	if (!textEditor) {
		console.log("Failed to access text editor");
		return;
	}
	const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>
	('vscode.executeDocumentSymbolProvider', textEditor.document.uri);

	// Build array of all variables in the current editor and the index of the 
	// start of their name
	if (symbols !== undefined) {
		for (const variable of extractVariableNames(symbols)) {
			variables.set(variable.name, variable.range.start);
		}
	}

	// Perform checks on variables list

	highlightVariables(variables, textEditor);
}

export function activate(context: vscode.ExtensionContext) {

	const variableCheck = vscode.commands.registerCommand('variable-name-checker.run-variable-check', () => {
		runVariableCheck();
	});
	context.subscriptions.push(variableCheck);
}

export function deactivate() {}