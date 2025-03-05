import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import { StringJsonSchema } from '@binaryoperations/json-forms-core/models/ControlSchema';
import {
  UiNodeType,
  type UiSchema,
} from '@binaryoperations/json-forms-core/models/UiSchema';

export type FormConfig = {
  data: object;
  uiSchema?: UiSchema;
};

const schema = {
  phone: {
    type: 'object',
    properties: {
      countryCode: { type: 'number' },
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
} as const;

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
            schema: schema.phone.properties.countryCode,
          },
          {
            type: UiNodeType.CONTROL,
            path: 'phone/number',
            schema: schema.phone.properties.number,
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
      { type: UiNodeType.CONTROL, path: 'rating', schema: schema.rating },
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
            schema: schema.address.properties.lineOne,
          },
          {
            type: UiNodeType.CONTROL,
            path: 'address/lineTwo',
            schema: schema.address.properties.lineTwo,
          },
          {
            type: UiNodeType.CONTROL,
            path: 'address/postalCode',
            schema: schema.address.properties.postalCode,
          },
          {
            type: UiNodeType.CONTROL,
            path: 'address/city',
            schema: schema.address.properties.city,
          },
          {
            type: UiNodeType.CONTROL,
            path: 'address/country',
            schema: schema.address.properties.country,
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
                    schema: schema.phone.properties.countryCode,
                  },
                  {
                    type: UiNodeType.CONTROL,
                    path: 'phone/number',
                    schema: schema.phone.properties.number,
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
                schema: schema.rating,
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
                    schema: schema.address.properties.lineOne,
                  },
                  {
                    type: UiNodeType.CONTROL,
                    path: 'address/lineTwo',
                    schema: schema.address.properties.lineTwo,
                  },
                  {
                    type: UiNodeType.COLUMNS,
                    nodes: [
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/postalCode',
                        schema: schema.address.properties.postalCode,
                      },
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/city',
                        schema: schema.address.properties.city,
                      },
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/country',
                        schema: schema.address.properties.country,
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
                    schema: schema.address.properties.lineOne,
                    options: { readOnly: true },
                  },
                  {
                    type: UiNodeType.CONTROL,
                    path: 'address/lineTwo',
                    schema: schema.address.properties.lineTwo,
                    options: { readOnly: true },
                  },
                  {
                    type: UiNodeType.COLUMNS,
                    nodes: [
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/postalCode',
                        schema: schema.address.properties.postalCode,
                        options: { readOnly: true },
                      },
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/city',
                        schema: schema.address.properties.city,
                        options: { readOnly: true },
                      },
                      {
                        type: UiNodeType.CONTROL,
                        path: 'address/country',
                        schema: schema.address.properties.country,
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
