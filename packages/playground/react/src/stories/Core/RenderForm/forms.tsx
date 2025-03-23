import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import {
  ObjectJsonSchema,
  Schema,
  StringJsonSchema,
} from '@binaryoperations/json-forms-core/models/ControlSchema';
import {
  type LayoutSchema,
  UiNodeType,
} from '@binaryoperations/json-forms-core/models/LayoutSchema';

export type FormConfig = {
  data: object;
  schema: ObjectJsonSchema;
  uiSchema: LayoutSchema;
};

const schema: Record<string, Schema> = {
  phone: {
    type: 'object',
    properties: {
      countryCode: { type: 'number', maximum: 2 },
      number: { type: 'number' },
      extension: { type: 'number' },
    },
    required: ['number', 'countryCode'],
  },
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
  email: { type: 'string' },
  firstName: { type: 'string' },
  lastName: { type: 'string' },
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
    anyOf: [
      {
        type: 'null',
      },
      {
        type: 'number',
        minimum: 0,
        maximum: 7,
      },
    ],
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
};

export const signinForm: Omit<FormConfig, 'uiSchema'> = {
  schema: {
    type: 'object',
    properties: { userName: schema.email, password: schema.email },
    required: ['userName', 'password'],
  },
  data: {
    userName: '',
    password: '',
  },
};

export const newsLetterForm: Omit<FormConfig, 'uiSchema'> = {
  schema: {
    type: 'object',
    properties: schema,
    required: ['email', 'fullName'],
  },
  data: {
    email: '',
    fullName: '',
  },
};

const customerData: Omit<FormConfig, 'uiSchema'> = {
  schema: { type: 'object', properties: schema },
  data: {
    email: 'forms@binaryoperation.io', // email field
    firstName: 'Form', // string
    lastName: 'Hero', // string
    phone: { number: '007' }, // custom?
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
};

export const customer: FormConfig = {
  ...customerData,
  uiSchema: {
    type: UiNodeType.ROWS, // fieldsets | fieldset | columns | rows | control
    // order: 0,
    nodes: [
      { type: UiNodeType.CONTROL, path: 'email', schema: schema.email },
      { type: UiNodeType.CONTROL, path: 'firstName', schema: schema.firstName },
      { type: UiNodeType.CONTROL, path: 'lastName', schema: schema.lastName },
      {
        type: UiNodeType.COLUMNS,
        nodes: [
          {
            type: UiNodeType.CONTROL,
            path: 'phone/countryCode',
          },
          {
            type: UiNodeType.CONTROL,
            path: 'phone/number',
          },
        ],
      },
      {
        type: UiNodeType.CONTROL,
        path: 'dateOfBirth',
        schema: schema.dateOfBirth,
      },
      {
        type: UiNodeType.CONTROL,
        path: 'computedAge',
        schema: schema.computedAge,
        options: { readOnly: true },
      },
      { type: UiNodeType.CONTROL, path: 'rating' },
      {
        type: UiNodeType.CONTROL,
        path: 'gender',
        schema: cast<StringJsonSchema>(schema.gender),
      },
      { type: UiNodeType.CONTROL, path: 'website', schema: schema.website },
      {
        type: UiNodeType.CONTROL,
        path: 'interests',
        schema: cast<StringJsonSchema>(schema.interests),
      },
      {
        type: UiNodeType.ROWS,
        nodes: [
          {
            type: UiNodeType.CONTROL,
            path: 'address/lineOne',
          },
          {
            type: UiNodeType.CONTROL,
            path: 'address/lineTwo',
          },
          {
            type: UiNodeType.CONTROL,
            path: 'address/postalCode',
          },
          {
            type: UiNodeType.CONTROL,
            path: 'address/city',
          },
          {
            type: UiNodeType.CONTROL,
            path: 'address/country',
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
              { type: UiNodeType.CONTROL, path: 'email', schema: schema.email },
              {
                type: UiNodeType.CONTROL,
                path: 'firstName',
                schema: schema.firstName,
              },
              {
                type: UiNodeType.CONTROL,
                path: 'lastName',
                schema: schema.lastName,
              },
              {
                type: UiNodeType.COLUMNS,
                nodes: [
                  {
                    type: UiNodeType.CONTROL,
                    path: 'phone/countryCode',
                  },
                  {
                    type: UiNodeType.CONTROL,
                    path: 'phone/number',
                  },
                ],
              },
              {
                type: UiNodeType.CONTROL,
                path: 'dateOfBirth',
                schema: schema.dateOfBirth,
              },
              {
                type: UiNodeType.CONTROL,
                path: 'computedAge',
                schema: schema.computedAge,
                options: {
                  readOnly: true,
                  deriveFrom: 'dateOfBirth',
                },
              },
              {
                type: UiNodeType.CONTROL,
                path: 'rating',
              },
              {
                type: UiNodeType.CONTROL,
                path: 'gender',
                schema: cast<StringJsonSchema>(schema.gender),
              },
              {
                type: UiNodeType.CONTROL,
                path: 'website',
                schema: schema.website,
              },
              {
                type: UiNodeType.CONTROL,
                path: 'interests',
                schema: cast<StringJsonSchema>(schema.interests),
              },
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
                    path: 'address/lineOne',
                  },
                  {
                    type: UiNodeType.CONTROL,
                    path: 'address/lineTwo',
                  },
                  {
                    type: UiNodeType.COLUMNS,
                    nodes: [
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/postalCode',
                      },
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/city',
                      },
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/country',
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
                    path: 'address/lineOne',

                    options: { readOnly: true },
                  },
                  {
                    type: UiNodeType.CONTROL,
                    path: 'address/lineTwo',

                    options: { readOnly: true },
                  },
                  {
                    type: UiNodeType.COLUMNS,
                    nodes: [
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/postalCode',

                        options: { readOnly: true },
                      },
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/city',

                        options: { readOnly: true },
                      },
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/country',

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
