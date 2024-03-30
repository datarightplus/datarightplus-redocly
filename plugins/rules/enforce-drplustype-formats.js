module.exports = DRPlusTypesMatchFormat

CDSFormats = {
    'Base64': {
        format: 'byte'
    },
    'DateTimeString': {
        format: 'date-time'
    },
    'DateString': {
        format: 'date'
    },
    'CurrencyString': {
        pattern: '\\w{3}'
    },
    'URIString': {
        format: 'uri'
    },
    /**
     * Declared to check for misplacement
     */
    'PositiveInteger': {},
    'NegativeInteger': {},
    'RateString': {},
    'AmountString': {},
    'TimeString': {},
    'DurationString': {}

    /**
     * TODO: I almost put all these in on the spec itself but with such complicated regexp I think it's probably
     * best to keep it in a decorator (which redocly also supports) and inject during generation
     *  'PositiveInteger': {
     *      pattern: '^\\d+$'
     *  },
     *  'NegativeInteger': {
     *      pattern: '^(0|\\-\\d+)$'
     *  },
     *  'RateString': {
     *    pattern: '^([-]?\\d{1,16}(\\.\\d{1,16})?)$'
     *  },
     *  'AmountString': {
     *    pattern: '^([-]?\\d{1,16}\\.\\d{2,16})$'
     *  },
     *  'TimeString': {
     *     pattern: '^((\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?))(Z|[\\+-]\\d{2}:\\d{2})?$'
     *  },
     */
}

function DRPlusTypesMatchFormat() {
    return {
        Schema(schema, {report, location}) {
            if (schema.type !== 'string') return;

            Object.keys(CDSFormats).forEach(function (key) {
                if (schema['format'] === key) {
                    report({
                        message: `Attribute format field contains misplaced x-cds-type of ${key}`,
                        location: location.child('properties'),
                    });
                }
            });

            if (!schema['x-cds-type']) return;

            Object.keys(CDSFormats).forEach(function (key) {
                if (schema['x-cds-type'] === key && CDSFormats[key]['format'] && schema['format'] !== CDSFormats[key]['format']) {
                    report({
                        message: `Attributes with a ${key} type of x-cds-type must be specified as a format of ${CDSFormats[key]['format']}`,
                        location: location.child('properties'),
                    });
                }
            });

            Object.keys(CDSFormats).forEach(function (key) {
                if (schema['x-cds-type'] === key && CDSFormats[key]['pattern'] && schema['pattern'] !== CDSFormats[key]['pattern']) {
                    report({
                        message: `Attributes with a ${key} type of x-cds-type must be specified as a pattern of ${CDSFormats[key]['pattern']}`,
                        location: location.child('properties'),
                    });
                }
            });
        }
    }
}