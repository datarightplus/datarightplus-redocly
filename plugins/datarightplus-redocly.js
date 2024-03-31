const DRPlusTypesMatchFormat = require('./rules/enforce-datarightplustype-formats');
const CheckRequiredFieldsList = require('./rules/check-required-fields');
const CheckExampleFieldValues = require('./rules/check-example-fields');
const DiscriminatorCheckers = require('./rules/check-discriminators');
const id = 'datarightplus-redocly';

const rules = {
    oas3: {
        'enforce-datarightplustype-formats': DRPlusTypesMatchFormat,
        'check-required-fields-list': CheckRequiredFieldsList,
        'check-example-fields': CheckExampleFieldValues,
        'check-discriminators': DiscriminatorCheckers.CheckDiscriminators,
        'report-cds-discriminators': DiscriminatorCheckers.ReportIgnoredDiscriminators
    },
};

module.exports = {
    id,
    rules,
};