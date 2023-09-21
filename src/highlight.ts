import * as vscode from 'vscode';

export default function highlightVariables(variables: Map<string, vscode.Position>, textEditor: vscode.TextEditor): void {

    const highlightedVariables: vscode.DecorationOptions[] = [];
    const variableHighlighter = vscode.window.createTextEditorDecorationType({
        // See package.json for the declaration and default values.
        backgroundColor: { id: 'extension.badVariables' }
    });

    for (const variable of variables.keys()) {
        const startPosition = variables.get(variable)!;
        const endPosition = new vscode.Position(startPosition.line, startPosition.character + variable.length);
        const variableDecoration = { 
            range: new vscode.Range(startPosition, endPosition), 
            hoverMessage: 'variable ' + variable
        };
        highlightedVariables.push(variableDecoration);
    }
    // Clear current decoration
    textEditor.setDecorations(variableHighlighter, []);
    // Set new variable decoration
    textEditor.setDecorations(variableHighlighter, highlightedVariables);
}