
type Suggestions = {
    [index: string]: string[]
};


export default function validateVariables(variables: string[]): Suggestions {

    let variableSuggestions: Suggestions = {};

    for (const name of variables) {
        // Is the variable a single letter
        if (name.length === 1) {
            variableSuggestions[name].push("Variable name should not be a single letter");
        }
        // Does the name contain a data type
            // Check for hungarian notation
            // Check for full data types in name
            // check for abbreviated data types in the name (This could be
            // caught by the abbreviation check)

        // Is the variable made up of actual English words
    
        // Does the name contain abbreviated words
    
        // Should the name contain a real-world unit, unless the type implies a unit?
            // How could we determine if a variable name should contain a unit?
    }

    return variableSuggestions;
}