
type Suggestions = {
    [index: string]: string[]
};

const dataTypes = [
    "integer", "number", "boolean", "array", "tuple", "char", "string", "void",
    "class", "interface", "enum"
];

const hungarianPrefixes = [
    "b", "i", "c", "n", "dec", "ch", "p", "s", "str", "v", "d", "l", "f", "sz",
    "psz", "h", "by", "y", "u32", "u64", "w", "dw", "C", "I", "X", "x", "m_",
    "g_"
];

export default function validateVariables(variables: string[]): Suggestions {

    let variableSuggestions: Suggestions = {};

    for (const name of variables) {
        // Is the variable a single letter
        if (name.length === 1) {
            variableSuggestions[name].push("Variable name should not be a single letter, consider a more detailed name.");
        }

        // Is the variable name getting too long?
        if (name.length > 30 ) {
            variableSuggestions[name].push("Variable name is quite long, consider a more concise name");
        }

        // Does the name contain a data type

        // Check for hungarian notation
        if (checkHungarianNotation(name)) {
            variableSuggestions[name].push("Avoid using Hungarian Notation, use camelCase or snake_case instead");
        }
        // Check for full data types in name
        if (dataTypes.some(dataType => {name.includes(dataType);})) {
            variableSuggestions[name].push("Variable name contains a data type, the data type should be obvious from the variable definition");
        }
        
        // Check for abbreviated data types in the name (This could be
        
        // caught by the abbreviation check)

        // Is the variable made up of actual English words
    
        // Does the name contain abbreviated words
    
        // Should the name contain a real-world unit, unless the type implies a unit?
            // How could we determine if a variable name should contain a unit?

        // Is a consistent variable naming convention being used?
            // If so, highlight any variables that do not follow this convention
    }

    return variableSuggestions;
}

function checkHungarianNotation(name: string): boolean {
    return true;
}