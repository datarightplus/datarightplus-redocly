const xCdsAllowMissingDiscriminator = "x-cds-allowMissingDiscriminator"

function mkDiscriminatorVisitor(f) {
    return {
        any(schema, { report, location, resolve }) {
            const oneOf = schema.oneOf;
            const anyOf = schema.anyOf;
            var desc = null;
            var refs = [];

            if (oneOf) {
                desc = 'oneOf';
                refs = oneOf;
            } else if (anyOf) {
                desc = 'anyOf';
                refs = anyOf;
            } else {
                return;
            }

            f(schema, desc, refs, report, location, resolve);
        },
    } 
}

const ReportIgnoredDiscriminators = () => mkDiscriminatorVisitor( (schema, desc, refs, report, location, resolve) => {
    if (!schema.discriminator) {
        if (schema[xCdsAllowMissingDiscriminator] == true) {
            report({
                message: `${desc} doesn't have a discriminator object and is invalid OAS3 but is being ignored`,
                location: location.child('x-cds-allowMissingDiscriminator'),
            });
        }
    }
});

const CheckDiscriminators = ({allowCds}) => mkDiscriminatorVisitor( (schema, desc, refs, report, location, resolve) => {
    if (!schema.discriminator) {
        if (allowCds && schema[xCdsAllowMissingDiscriminator] == true) {
            return ;
        }

        report({
            message: `${desc} doesn't have a discriminator object nor has ${xCdsAllowMissingDiscriminator}: true`,
            location: location.child('x-cds-allowMissingDiscriminator'),
        });
        return;
    }

    const propertyName = schema.discriminator.propertyName;
    const mappings = schema.discriminator.mapping || {};

    if (!propertyName) {
        report({
            message: `${desc} Schema doesn't have a propertyName`,
            location: location.child('discriminator').child('propertyName'),
        });
    }

    var missingMappings = [];

    refs.forEach((ref,i) => {
        const rPath = ref["$ref"];
        const refDesc = `${desc} ref ${rPath}`
        const resolved = resolve(ref);
        const from = location.child('oneOf').child(i)

        if (!resolved || !resolved.node) {
            report({
                message: `${refDesc} cannot be resolved`,
                location: resolved.location,
                from
            });
            return;
        }

        if (!resolved.node.properties) {
            report({
                message: `${refDesc} does not have a properties object`,
                location: resolved.location,
                from
            });
        }

        const dProp = resolved.node.properties[propertyName];
        const dPropLoc = resolved.location.child("properties").child(propertyName)

        if (!dProp) {
            report({
                message: `${refDesc} schema doesn't the expected discriminator field ${propertyName}`,
                location: dPropLoc,
                from
            });
        }

        if (dProp.type != "string") {
            report({
                message: `${refDesc} ${propertyName} is not of type string`,
                location: dPropLoc.child("type"),
                from
            });
        } else if (dProp.format) {
            report({
                message: `${refDesc} ${propertyName} is of type string but has a format`,
                location: dPropLoc.child("format"),
                from
            });
        }

        const dDefault = dProp.default;

        const m = Object.entries(mappings).find( (kv) => kv[1] == rPath );

        if (!m) {
            missingMappings.push([dDefault || "TODO", rPath])
        } else if (dDefault && m[0] != dDefault) {
            report({
                message: `${refDesc} ${propertyName} default does not align to explicit mapping`,
                location: dPropLoc.child("default"),
                from: location.child("discriminator").child("mapping").child(m[0])
            });
        }
    });

    if (missingMappings.length > 1) {
        report({
            message: `${desc} is missing some explicit mappings. Please add: \n    mapping:\n` + missingMappings.map( m => `      "${m[0]}": ${m[1]}` ).join("\n") ,
            location: location.child("discriminator").child("mapping")
        });
    }
});

module.exports = {
    CheckDiscriminators,
    ReportIgnoredDiscriminators
}