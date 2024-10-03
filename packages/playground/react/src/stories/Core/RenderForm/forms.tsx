import { RuleEffect, RuleOperator, UiNodeType, UiSchema } from "@binaryoperations/json-forms-core/models/UiSchema"

export type FormConfig = {
    data: object,
    uiSchema?: UiSchema
}

export const signinForm: FormConfig = {
    data: {
        userName: "",
        password: "",
    }
}

export const newsLetterForm: FormConfig = {
    data: {
        email: "",
        fullName: ""
    }
}


export const customer: FormConfig = {
    data: {
        email: "", // email field
        firstName: "", // string
        lastName: "", // string
        phone: "",  // custom?
        dateOfBirth: "", // date input/ date picker
        computedAge: "", // computed field? hide if date of birth is invalid
        rating: "", // would be a number // slider/number field + steps
        gender: "", // options // render select/radio-buttons
        website: '', // url field,
        interests: [], // options // render multiselect/combobox/checkbox,
        address: {
            lineOne: "",
            lineTwo: "",
            city: "",
            postalCode: "",
            country: "",
        },
    },
    uiSchema: {
        type: UiNodeType.ROWS, // fieldsets | fieldset | columns | rows | control
        // order: 0,
        nodes: [
            { type: UiNodeType.CONTROL, property: "#/properties/email" },
            { type: UiNodeType.CONTROL, property: "#/properties/firstName" },
            { type: UiNodeType.CONTROL, property: "#/properties/lastName" },
            { type: UiNodeType.CONTROL, property: "#/properties/phone" },
            { type: UiNodeType.CONTROL, property: "#/properties/dateOfBirth" },
            { type: UiNodeType.CONTROL, property: "#/properties/computedAge" },
            { type: UiNodeType.CONTROL, property: "#/properties/rating" },
            { type: UiNodeType.CONTROL, property: "#/properties/gender" },
            { type: UiNodeType.CONTROL, property: "#/properties/website" },
            { type: UiNodeType.CONTROL, property: "#/properties/interests" },
            {
                type: UiNodeType.ROWS,
                nodes: [
                    { type: UiNodeType.CONTROL, property: "#/properties/address/properties/lineOne" },
                    { type: UiNodeType.CONTROL, property: "#/properties/address/properties/lineTwo" },
                    { type: UiNodeType.CONTROL, property: "#/properties/address/properties/postalCode" },
                    { type: UiNodeType.CONTROL, property: "#/properties/address/properties/city" },
                    { type: UiNodeType.CONTROL, property: "#/properties/address/properties/country" },
                ],
            },
        ],
    },
}

export const customerWizard: FormConfig = {
    data: {
        email: "", // email field
        firstName: "", // string
        lastName: "", // string
        phone: "",  // custom?
        dateOfBirth: "", // date input/ date picker
        computedAge: "", // computed field? hide if date of birth is invalid
        rating: "", // would be a number // slider/number field + steps
        gender: "", // options // render select/radio-buttons
        website: '', // url field,
        interests: [], // options // render multiselect/combobox/checkbox,
        address: {
            lineOne: "",
            lineTwo: "",
            city: "",
            postalCode: "",
            country: "",
        },
    },
    uiSchema: {
        type: UiNodeType.FIELD_SETS, // fieldsets | fieldset | columns | rows | control
        // order: 0,
        nodes: [
            {
                label: "",
                type: UiNodeType.FIELD_SET,
                nodes: [
                    {
                        type: UiNodeType.ROWS,
                        nodes: [
                            { type: UiNodeType.CONTROL, property: "#/properties/email" },
                            { type: UiNodeType.CONTROL, property: "#/properties/firstName" },
                            { type: UiNodeType.CONTROL, property: "#/properties/lastName" },
                            { type: UiNodeType.CONTROL, property: "#/properties/phone" },
                            { type: UiNodeType.CONTROL, property: "#/properties/dateOfBirth" },
                            {
                                type: UiNodeType.CONTROL, property: "#/properties/computedAge",
                                rules: {
                                    effect: RuleEffect.HIDE,
                                    operator: RuleOperator.AND,
                                    conditions: [{
                                        scope: "#/properties/name",
                                        schema: { not: { $isEmpty: true } }
                                    }]
                                }
                            },
                            { type: UiNodeType.CONTROL, property: "#/properties/rating" },
                            { type: UiNodeType.CONTROL, property: "#/properties/gender" },
                            { type: UiNodeType.CONTROL, property: "#/properties/website" },
                            { type: UiNodeType.CONTROL, property: "#/properties/interests" },
                        ],
                    }
                ]
            },
            {
                label: "",
                type: UiNodeType.FIELD_SET,
                nodes:[
                    {
                        type: UiNodeType.COLUMNS,
                        nodes: [
                            {
                                type: UiNodeType.ROWS,
                                nodes: [
                                    { type: UiNodeType.CONTROL, property: "#/properties/address/properties/lineOne" },
                                    { type: UiNodeType.CONTROL, property: "#/properties/address/properties/lineTwo" },
                                    {
                                        type: UiNodeType.COLUMNS,
                                        nodes: [
                                            { type: UiNodeType.CONTROL, property: "#/properties/address/properties/postalCode" },
                                            { type: UiNodeType.CONTROL, property: "#/properties/address/properties/city" },
                                            { type: UiNodeType.CONTROL, property: "#/properties/address/properties/country" },
                                        ]
                                    }
                                ],
                            }
                        ]
                    },
                    {
                        type: UiNodeType.COLUMNS,
                        nodes: [
                            {
                                type: UiNodeType.ROWS,
                                nodes: [
                                    {
                                        type: UiNodeType.CONTROL,
                                        property: "#/properties/address/properties/lineOne",
                                        readonly: true,
                                    },
                                    {
                                        type: UiNodeType.CONTROL,
                                        property: "#/properties/address/properties/lineTwo",
                                        readonly: true,
                                    },
                                    {
                                        type: UiNodeType.COLUMNS,
                                        nodes: [
                                            {
                                                type: UiNodeType.CONTROL,
                                                property: "#/properties/address/properties/postalCode",
                                                readonly: true,
                                            },
                                            {
                                                type: UiNodeType.CONTROL,
                                                property: "#/properties/address/properties/city",
                                                readonly: true,
                                            },
                                            {
                                                type: UiNodeType.CONTROL,
                                                property: "#/properties/address/properties/country",
                                                readonly: true,
                                            },
                                        ]
                                    }
                                ],
                            }
                        ]
                    }
                ],
            }
        ],
    },
}