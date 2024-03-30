module.exports = CheckExampleFieldValues

function CheckExampleFieldValues() {
    return {
        Schema(schema, {report, location}) {
            if (schema.type !== 'object') return;
            if (!schema.properties) return;

            for (let element of Object.keys(schema.properties)) {
                if (["string", "number", "integer", "boolean"].includes(schema.properties[element].type)
                    && (typeof schema.properties[element]["x-cds-type"] !== undefined)
                    && ((typeof schema.properties[element].default !== 'undefined') || (typeof schema.properties[element].example !== 'undefined'))) {

                    if (typeof schema.properties[element].default !== 'undefined') {
                        checkValue(element, report, location, schema.properties[element].default, schema.properties[element]["x-cds-type"], 'default')
                    }

                    if (typeof schema.properties[element].example !== 'undefined') {
                        checkValue(element, report, location, schema.properties[element].example, schema.properties[element]["x-cds-type"], 'example')
                    }
                }


            }
        }
    }
}

function checkValue(element, report, location, value, cdstype, name) {
    if (cdstype === 'DateTimeString') {
        let re = new RegExp("^(\\d{4}-\\d{2}-\\d{2})T(\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?)(Z|[\+-]\\d{2}:\\d{2})?$", "gm");
        if (!re.test(value)) {
            report({
                message: `Attribute ${element} does not have a ${name} value (${value}) matching DateTimeString.`,
                location: location.child('properties'),
            });
        }
    }

    if (cdstype === 'DateString') {
        let re = new RegExp("^\\d{4}\-\\d{2}\-\\d{2}$", "gm");
        if (!re.test(value)) {
            report({
                message: `Attribute ${element} does not have a ${name} value (${value}) matching DateString.`,
                location: location.child('properties'),
            });
        }
    }

    if (cdstype === 'RateString') {
        let re = new RegExp("^-?\\d{1,16}\.\\d{2,16}$");
        if (!re.test(value)) {
            report({
                message: `Attribute ${element} does not have a ${name} value (${value}) matching RateString.`,
                location: location.child('properties'),
            });
        }
    }

    if (cdstype === 'AmountString') {
        let re = new RegExp("^-?\\d{1,16}\.\\d{2,16}$");
        if (!re.test(value)) {
            report({
                message: `Attribute ${element} does not have a ${name} value (${value}) matching AmountString.`,
                location: location.child('properties'),
            });
        }
    }

    if (cdstype === 'DurationString') {
        let re = new RegExp("^P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$");
        if (!re.test(value)) {
            report({
                message: `Attribute ${element} does not have a ${name} value (${value}) matching DurationString.`,
                location: location.child('properties'),
            });
        }
    }

}