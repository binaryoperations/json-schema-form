import { JsonSchema } from '@binaryoperations/json-forms-core/models/JsonSchema';
import {
  RuleEffect,
  RuleOperator,
  UiNodeType,
  UiSchema,
} from '@binaryoperations/json-forms-core/models/UiSchema';

export type FormConfig = {
  data: object;
  uiSchema?: UiSchema;
  schema?: JsonSchema;
};

export const signinForm: FormConfig = {
  data: {
    userName: '',
    password: '',
  },
};

export const newsLetterForm: FormConfig = {
  data: {
    email: '',
    fullName: '',
  },
};

const customerData: FormConfig = {
  data: {
    email: 'forms@binaryoperation.io', // email field
    firstName: 'Form', // string
    lastName: 'Hero', // string
    phone: '007', // custom?
    dateOfBirth: '', // date input/ date picker
    computedAge: '', // computed field? hide if date of birth is invalid
    rating: '7', // would be a number // slider/number field + steps
    gender: '', // options // render select/radio-buttons
    website: '', // url field,
    interests: [], // options // render multiselect/combobox/checkbox,
    address: {
      lineOne: '21 Bakersstreet',
      lineTwo: '',
      city: 'London',
      postalCode: '',
      country: 'United Kingdom',
    },
  },
  schema: {
    type: 'object',
    definitions: {
      phoneWithCountryCode: {
        type: 'object',
        properties: {
          countryCode: { type: 'number' },
          number: { type: 'number' },
          extension: { type: 'number' },
        },
        required: ['number', 'countryCode'],
      },
      phoneNumber: { type: 'number' },
      address: {
        type: 'object',
        properties: {
          lineOne: { type: 'string' },
          lineTwo: { type: 'string' },
          city: { type: 'string' },
          postalCode: { type: 'string' },
          country: { type: 'string' },
        },
        required: ['lineOne', 'city', 'postalCode', 'country'],
      },
    },
    properties: {
      email: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      phone: {
        format: 'phoneWithCountryCode',
        oneOf: [
          { $ref: '#/definitions/phoneNumber' },
          { $ref: '#/definitions/phoneWithCountryCode' },
        ],
      },
      dateOfBirth: {
        type: 'string',
        format: 'date',
      },
      computedAge: {
        type: 'number',
        exclusiveMinimum: 18,
        readOnly: true,
      },
      rating: {
        type: 'number',
        minimum: 0,
        maximum: 7,
      },
      gender: {
        type: 'string',
        enum: ['male', 'female'],
      },
      website: {
        type: 'string',
        format: 'url',
      },
      interests: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['football', 'basketball', 'volleyball'],
        },
      },
    },
  },
};

export const customer: FormConfig = {
  ...customerData,
  uiSchema: {
    type: UiNodeType.ROWS, // fieldsets | fieldset | columns | rows | control
    // order: 0,
    nodes: [
      { type: UiNodeType.CONTROL, scope: '#/properties/email' },
      { type: UiNodeType.CONTROL, scope: '#/properties/firstName' },
      { type: UiNodeType.CONTROL, scope: '#/properties/lastName' },
      { type: UiNodeType.CONTROL, scope: '#/properties/phone' },
      { type: UiNodeType.CONTROL, scope: '#/properties/dateOfBirth' },
      { type: UiNodeType.CONTROL, scope: '#/properties/computedAge' },
      { type: UiNodeType.CONTROL, scope: '#/properties/rating' },
      { type: UiNodeType.CONTROL, scope: '#/properties/gender' },
      { type: UiNodeType.CONTROL, scope: '#/properties/website' },
      { type: UiNodeType.CONTROL, scope: '#/properties/interests' },
      {
        type: UiNodeType.ROWS,
        nodes: [
          {
            type: UiNodeType.CONTROL,
            scope: '#/properties/address/properties/lineOne',
          },
          {
            type: UiNodeType.CONTROL,
            scope: '#/properties/address/properties/lineTwo',
          },
          {
            type: UiNodeType.CONTROL,
            scope: '#/properties/address/properties/postalCode',
          },
          {
            type: UiNodeType.CONTROL,
            scope: '#/properties/address/properties/city',
          },
          {
            type: UiNodeType.CONTROL,
            scope: '#/properties/address/properties/country',
          },
        ],
      },
    ],
  },
};

export const customerWizard: FormConfig = {
  ...customerData,
  uiSchema: {
    type: UiNodeType.FIELD_SETS, // fieldsets | fieldset | columns | rows | control
    // order: 0,
    nodes: [
      {
        label: '',
        type: UiNodeType.FIELD_SET,
        nodes: [
          {
            type: UiNodeType.ROWS,
            nodes: [
              { type: UiNodeType.CONTROL, scope: '#/properties/email' },
              { type: UiNodeType.CONTROL, scope: '#/properties/firstName' },
              { type: UiNodeType.CONTROL, scope: '#/properties/lastName' },
              { type: UiNodeType.CONTROL, scope: '#/properties/phone' },
              { type: UiNodeType.CONTROL, scope: '#/properties/dateOfBirth' },
              {
                type: UiNodeType.CONTROL,
                scope: '#/properties/computedAge',
                rules: {
                  effect: RuleEffect.HIDE,
                  operator: RuleOperator.AND,
                  conditions: [
                    {
                      scope: '#/properties/name',
                      schema: { not: { $isEmpty: true } },
                    },
                  ],
                },
              },
              { type: UiNodeType.CONTROL, scope: '#/properties/rating' },
              { type: UiNodeType.CONTROL, scope: '#/properties/gender' },
              { type: UiNodeType.CONTROL, scope: '#/properties/website' },
              { type: UiNodeType.CONTROL, scope: '#/properties/interests' },
            ],
          },
        ],
      },
      {
        label: '',
        type: UiNodeType.FIELD_SET,
        nodes: [
          {
            type: UiNodeType.COLUMNS,
            nodes: [
              {
                type: UiNodeType.ROWS,
                nodes: [
                  {
                    type: UiNodeType.CONTROL,
                    scope: '#/properties/address/properties/lineOne',
                  },
                  {
                    type: UiNodeType.CONTROL,
                    scope: '#/properties/address/properties/lineTwo',
                  },
                  {
                    type: UiNodeType.COLUMNS,
                    nodes: [
                      {
                        type: UiNodeType.CONTROL,
                        scope: '#/properties/address/properties/postalCode',
                      },
                      {
                        type: UiNodeType.CONTROL,
                        scope: '#/properties/address/properties/city',
                      },
                      {
                        type: UiNodeType.CONTROL,
                        scope: '#/properties/address/properties/country',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: UiNodeType.COLUMNS,
            nodes: [
              {
                type: UiNodeType.ROWS,
                nodes: [
                  {
                    type: UiNodeType.CONTROL,
                    scope: '#/properties/address/properties/lineOne',
                    options: { readOnly: true },
                  },
                  {
                    type: UiNodeType.CONTROL,
                    scope: '#/properties/address/properties/lineTwo',
                    options: { readOnly: true },
                  },
                  {
                    type: UiNodeType.COLUMNS,
                    nodes: [
                      {
                        type: UiNodeType.CONTROL,
                        scope: '#/properties/address/properties/postalCode',
                        options: { readOnly: true },
                      },
                      {
                        type: UiNodeType.CONTROL,
                        scope: '#/properties/address/properties/city',
                        options: { readOnly: true },
                      },
                      {
                        type: UiNodeType.CONTROL,
                        scope: '#/properties/address/properties/country',
                        options: { readOnly: true },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
