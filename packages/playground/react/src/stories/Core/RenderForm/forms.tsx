import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import {
  ControlSchema,
  ObjectJsonSchema,
  StringJsonSchema,
} from '@binaryoperations/json-forms-core/models/ControlSchema';
import {
  type LayoutSchema,
  EnumUiNode,
} from '@binaryoperations/json-forms-core/models/LayoutSchema';

export type FormConfig = {
  data: object;
  schema: ObjectJsonSchema;
  uiSchema: LayoutSchema;
};

const schema: Record<string, ControlSchema> = {
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
        type: 'number',
        minimum: 0,
        maximum: 7,
      },
      {
        type: 'null',
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
    // rating: '7', // would be a number // slider/number field + steps
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
    renderer: "rows",
    type: EnumUiNode.LAYOUT, // fieldsets | fieldset | columns | rows | control
    // order: 0,
    nodes: [
      { type: EnumUiNode.CONTROL, path: 'email', schema: schema.email },
      { type: EnumUiNode.CONTROL, path: 'firstName', schema: schema.firstName },
      { type: EnumUiNode.CONTROL, path: 'lastName', schema: schema.lastName },
      {
        type: "layout",
        renderer: "columns",
        nodes: [
          {
            type: EnumUiNode.CONTROL,
            path: 'phone/countryCode',
          },
          {
            type: EnumUiNode.CONTROL,
            path: 'phone/number',
          },
        ],
      },
      {
        type: EnumUiNode.CONTROL,
        path: 'dateOfBirth',
        schema: schema.dateOfBirth,
      },
      {
        type: EnumUiNode.CONTROL,
        path: 'computedAge',
        schema: schema.computedAge,
        options: { readOnly: true },
      },
      { type: EnumUiNode.CONTROL, path: 'rating' },
      {
        type: EnumUiNode.CONTROL,
        path: 'gender',
        schema: cast<StringJsonSchema>(schema.gender),
      },
      { type: EnumUiNode.CONTROL, path: 'website', schema: schema.website },
      {
        type: EnumUiNode.CONTROL,
        path: 'interests',
        schema: cast<StringJsonSchema>(schema.interests),
      },
      {
        renderer: "rows",
        type: EnumUiNode.LAYOUT,
        nodes: [
          {
            type: EnumUiNode.CONTROL,
            path: 'address/lineOne',
          },
          {
            type: EnumUiNode.CONTROL,
            path: 'address/lineTwo',
          },
          {
            type: EnumUiNode.CONTROL,
            path: 'address/postalCode',
          },
          {
            type: EnumUiNode.CONTROL,
            path: 'address/city',
          },
          {
            type: EnumUiNode.CONTROL,
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
    type: "layout",
    renderer: "fieldsets", // fieldsets | fieldset | columns | rows | control
    // order: 0,
    nodes: [
      {
        options: {label: '',},
        renderer:"fieldset",
        type: EnumUiNode.LAYOUT,
        nodes: [
          {
            renderer: "rows",
            type: EnumUiNode.LAYOUT,
            nodes: [
              { type: EnumUiNode.CONTROL, path: 'email', schema: schema.email },
              {
                type: EnumUiNode.CONTROL,
                path: 'firstName',
                schema: schema.firstName,
              },
              {
                type: EnumUiNode.CONTROL,
                path: 'lastName',
                schema: schema.lastName,
              },
              {
                type: "layout",
                renderer: "columns",
                nodes: [
                  {
                    type: EnumUiNode.CONTROL,
                    path: 'phone/countryCode',
                  },
                  {
                    type: EnumUiNode.CONTROL,
                    path: 'phone/number',
                  },
                ],
              },
              {
                type: EnumUiNode.CONTROL,
                path: 'dateOfBirth',
                schema: schema.dateOfBirth,
              },
              {
                type: EnumUiNode.CONTROL,
                path: 'computedAge',
                schema: schema.computedAge,
                options: {
                  readOnly: true,
                  deriveFrom: 'dateOfBirth',
                },
              },
              {
                type: EnumUiNode.CONTROL,
                path: 'rating',
              },
              {
                type: EnumUiNode.CONTROL,
                path: 'gender',
                schema: cast<StringJsonSchema>(schema.gender),
              },
              {
                type: EnumUiNode.CONTROL,
                path: 'website',
                schema: schema.website,
              },
              {
                type: EnumUiNode.CONTROL,
                path: 'interests',
                schema: cast<StringJsonSchema>(schema.interests),
              },
            ],
          },
        ],
      },
      {
        options: {label: '',},
        renderer:"fieldset",
        type: EnumUiNode.LAYOUT,
        nodes: [
          {
            type: "layout",
            renderer: "columns",
            nodes: [
              {
                renderer: "rows",
                type: EnumUiNode.LAYOUT,
                nodes: [
                  {
                    type: EnumUiNode.CONTROL,
                    path: 'address/lineOne',
                  },
                  {
                    type: EnumUiNode.CONTROL,
                    path: 'address/lineTwo',
                  },
                  {
                    type: "layout",
                    renderer: "columns",
                    nodes: [
                      {
                        type: EnumUiNode.CONTROL,
                        path: 'address/postalCode',
                      },
                      {
                        type: EnumUiNode.CONTROL,
                        path: 'address/city',
                      },
                      {
                        type: EnumUiNode.CONTROL,
                        path: 'address/country',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "layout",
            renderer: "columns",
            nodes: [
              {
                renderer: "rows",
                type: EnumUiNode.LAYOUT,
                nodes: [
                  {
                    type: EnumUiNode.CONTROL,
                    path: 'address/lineOne',

                    options: { readOnly: true },
                  },
                  {
                    type: EnumUiNode.CONTROL,
                    path: 'address/lineTwo',

                    options: { readOnly: true },
                  },
                  {
                    type: "layout",
                    renderer: "columns",
                    nodes: [
                      {
                        type: EnumUiNode.CONTROL,
                        path: 'address/postalCode',

                        options: { readOnly: true },
                      },
                      {
                        type: EnumUiNode.CONTROL,
                        path: 'address/city',

                        options: { readOnly: true },
                      },
                      {
                        type: EnumUiNode.CONTROL,
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

export const responsive: FormConfig = {
  data: {},
  schema: {
    type: 'object',
    properties: {
      first_name: {
        type: 'string',
        description: '',
        title: 'First Name',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      last_name: {
        type: 'string',
        description: '',
        title: 'Last Name',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      date_of_birth: {
        type: 'string',
        description: '',
        title: 'Date of Birth',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      gender: {
        type: 'string',
        description: '',
        title: 'Gender',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      phone: {
        type: 'number',
        minimum: 0,
        maximum: 100,
        description: '',
        title: 'Phone',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      email: {
        type: 'string',
        format: 'email',
        pattern: '[^\\s@]+@[^\\s@]+\\.[^\\s@]+',
        description: '',
        title: 'email',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      notes: {
        type: 'string',
        description: '',
        title: 'Notes',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      line_one: {
        type: 'string',
        description: '',
        title: 'Line One',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      line_two: {
        type: 'string',
        description: '',
        title: 'Line Two',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      city: {
        type: 'string',
        description: '',
        title: 'City',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      postal_code: {
        type: 'string',
        description: '',
        title: 'Postal Code',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      country: {
        type: 'string',
        description: '',
        title: 'Country',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
    },
    required: [],
  },
  uiSchema: {
    type: "layout",
    renderer: 'rows',
    breakpoints: {
      xs: {
        style: {
          flexBasis: '100%',
          flexGrow: 1,
        },
      },
    },
    nodes: [
      {
        type: "layout",
        renderer: 'columns',
        breakpoints: {
          xs: {
            style: {
              flexWrap: 'wrap',
            },
          },
        },
        nodes: [
          {
            type: "layout",
            renderer: 'rows',
            breakpoints: {
              sm: {
                style: {
                  flexBasis: '50%',
                  flexGrow: 1,
                },
              },
              md: {
                style: {
                  flexBasis: '33.33333333333333%',
                  flexGrow: 1,
                },
              },
            },
            nodes: [
              {
                type: "layout",
                renderer: 'columns',
                breakpoints: {
                  xs: {
                    style: {
                      flexWrap: 'wrap',
                    },
                  },
                },
                nodes: [
                  {
                    type: 'control',
                    id: 'first_name',
                    path: 'first_name',
                    breakpoints: {
                      sm: {
                        style: {
                          flexBasis: '50%',
                          flexGrow: 1,
                        },
                      },
                      md: {
                        style: {
                          flexBasis: '33.33333333333333%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                  {
                    type: 'control',
                    id: 'last_name',
                    path: 'last_name',
                    breakpoints: {
                      sm: {
                        style: {
                          flexBasis: '50%',
                          flexGrow: 1,
                        },
                      },
                      md: {
                        style: {
                          flexBasis: '33.33333333333333%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                  {
                    type: 'control',
                    id: 'date_of_birth',
                    path: 'date_of_birth',
                    breakpoints: {
                      sm: {
                        style: {
                          flexBasis: '50%',
                          flexGrow: 1,
                        },
                      },
                      md: {
                        style: {
                          flexBasis: '33.33333333333333%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                  {
                    type: 'control',
                    id: 'gender',
                    path: 'gender',
                    breakpoints: {
                      sm: {
                        style: {
                          flexBasis: '50%',
                          flexGrow: 1,
                        },
                      },
                      md: {
                        style: {
                          flexBasis: '33.33333333333333%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                  {
                    type: 'control',
                    id: 'phone',
                    path: 'phone',
                    breakpoints: {
                      sm: {
                        style: {
                          flexBasis: '50%',
                          flexGrow: 1,
                        },
                      },
                      md: {
                        style: {
                          flexBasis: '33.33333333333333%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                  {
                    type: 'control',
                    id: 'email',
                    path: 'email',
                    breakpoints: {
                      sm: {
                        style: {
                          flexBasis: '50%',
                          flexGrow: 1,
                        },
                      },
                      md: {
                        style: {
                          flexBasis: '33.33333333333333%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                ],
              },
              {
                type: "layout",
                renderer: 'columns',
                breakpoints: {
                  xs: {
                    style: {
                      flexWrap: 'wrap',
                    },
                  },
                },
                nodes: [
                  {
                    type: 'control',
                    id: 'notes',
                    path: 'notes',
                    breakpoints: {
                      xs: {
                        style: {
                          flexBasis: '100%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "layout",
            renderer: 'rows',
            breakpoints: {
              sm: {
                style: {
                  flexBasis: '50%',
                  flexGrow: 1,
                },
              },
              md: {
                style: {
                  flexBasis: '33.33333333333333%',
                  flexGrow: 1,
                },
              },
            },
            nodes: [
              {
                type: "layout",
                renderer: 'columns',
                breakpoints: {
                  xs: {
                    style: {
                      flexWrap: 'wrap',
                    },
                  },
                },
                nodes: [
                  {
                    type: 'control',
                    id: 'line_one',
                    path: 'line_one',
                    breakpoints: {
                      sm: {
                        style: {
                          flexBasis: '100%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                  {
                    type: 'control',
                    id: 'line_two',
                    path: 'line_two',
                    breakpoints: {
                      sm: {
                        style: {
                          flexBasis: '100%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                ],
              },
              {
                type: "layout",
                renderer: 'columns',
                breakpoints: {
                  xs: {
                    style: {
                      flexWrap: 'wrap',
                    },
                  },
                },
                nodes: [
                  {
                    type: 'control',
                    id: 'city',
                    path: 'city',
                    breakpoints: {
                      sm: {
                        style: {
                          flexBasis: '50%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                  {
                    type: 'control',
                    id: 'postal_code',
                    path: 'postal_code',
                    breakpoints: {
                      sm: {
                        style: {
                          flexBasis: '50%',
                          flexGrow: 1,
                        },
                      },
                    },
                  },
                ],
              },
              {
                type: "layout",
                renderer: 'columns',
                breakpoints: {
                  xs: {
                    style: {
                      flexWrap: 'wrap',
                    },
                  },
                },
                nodes: [
                  {
                    type: 'control',
                    id: 'country',
                    path: 'country',
                    breakpoints: {
                      xs: {
                        style: {
                          flexBasis: '100%',
                          flexGrow: 1,
                        },
                      },
                    },
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

export const composite: FormConfig = {
  data: {
    number: '1',
    date: new Date().toISOString(),
    datetime: new Date().toISOString(),
  },
  schema: {
    type: 'object',
    properties: {
      number: {
        type: ['number', 'string', 'null'],
        minimum: 0,
        maximum: 100,
        description: '',
        title: 'number',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        maxLength: 0,
      },
      date: {
        type: ['string', 'number', 'null'],
        format: 'date',
        description: '',
        title: 'date',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
      datetime: {
        type: ['string', 'number', 'null'],
        format: 'datetime',
        description: '',
        title: 'datetime',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      },
    },
    required: [],
  },
  uiSchema: {
    type: 'layout',
    renderer: "rows",
    nodes: [
      {
        type: 'control',
        id: 'number',
        path: 'number',
      },
      {
        type: 'control',
        id: 'date',
        path: 'date',
      },
      {
        type: 'control',
        id: 'datetime',
        path: 'datetime',
      },
    ],
  },
};

export const frozenArray: FormConfig = {
  data: {
    array: Object.freeze(['football'])
  },
  schema: {
    type: 'object',
    properties: {
      array: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['football', 'basketball', 'volleyball'],
        },
      },
    },
  },
  uiSchema:  {
    type: "layout",
    renderer: "rows",
    nodes: [{
      type: "control",
      path: "array"
    }]
  }
}
