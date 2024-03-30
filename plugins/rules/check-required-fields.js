module.exports = CheckRequiredFieldsList

function CheckRequiredFieldsList() {
    return {
        Schema(schema, {report, location}) {
            if (schema.type !== 'object') return;

            if(schema.required) {
                for (let element of schema.required) {
                    if (!schema.properties[element]) {
                        report({
                            message: `Schema object mentions an attribute ${element} as required but it does not exist.`,
                            location: location.child('properties'),
                        });
                        continue;
                    }

                    /**
                     * Check presence
                     */
                    if (["string", "number", "integer", "boolean"].includes(schema.properties[element].type)
                        && !(typeof schema.properties[element].default !== 'undefined') && !(typeof schema.properties[element].example !== 'undefined')) {
                        report({
                            message: `Attribute ${element} does not have an example value and must (as it is a required field) unless it has a default.`,
                            location: location.child('properties'),
                        });
                        continue;
                    }
                }
            }
        }
    }
}