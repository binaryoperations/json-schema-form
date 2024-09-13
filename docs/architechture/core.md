# Core
`this` accepts:
1. Schema: (optional) \
    The schema allows you to define:
    1. the shape of the data
    2. Validations
    3. Conditional Visibility
    4. Derive Values
2. UI Schema: (optional) \
    The UI Schema allows you to define:
    1. Th UI Shape of the 
    2. Validations
    3. Visibility
    4. Derive Values
3. Custom renderers: \
    Build a custom renderers
    - Accept a renderer repository/ an object of renderers.
    - Object - form control, field, canvas?
    - Action buttons are just another renderers that accepts ButtonProps[] as an paramenter.
4. data: (Required). This forms the basis of the form.
    - Used to build a schema, if one is not provided
    - Used to build a UI Schema, if one is not provided


# PrepareForm
At the core of the project is a class that parses + validates the json objects.
As the name suggests, the class is responsible for preparing the form.
It outputs:
1. schema
2. UI Schema
3. data
4. Errors
    - External errors object
    - Follows the same shape as that of data, except the values on nodes are undefined | string
4. validator
5. Action Button Props
    5. onSubmit?
    6. onReset?
