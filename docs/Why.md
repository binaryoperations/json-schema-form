# `this`
A adaptive form library that gives you absolute control how to build your form.
`this` wants to deliver:
1. A fast user experience
2. A feature complete solution
3. Typesafe
4. Flexibility \
    Sometimes you just want to write build a form with just a couple of inputs. You do not need to build an entire data structure just to make build a form: \
    easy, ui drive mode allows you build your form with just html/jsx, and `this` will handle everything for you. \
    Alternately, you might have a requirement to to build a complex form such as a shopping cart with variables flowing left right and center;
    With the data driven mode, build your json form, this gives you the ability to declare your json schema/data and let `this` worry about the rest


# `this` UI
Taking JSON schema to the next level;
1. build a dashboard screens with JSON Schema



### Why not existing libraries?
There are a lot of popular form libraries for React.
The pros and cons of each of those are listed below.

- React Hook Form
    - Slow
    - need to have lots of optimizations under the hood to make it work efficiently
        - ? Maybe fixed with React Compiler
    - Not dynamic json/schema forms
        - Build the form yourself
- Formik
    - Unable to extend the values to redux
    - Not dynamic json/schema forms
        - Build the form yourself
- Tanstack forms
    + Typesafe
    - Not dynamic json/schema forms
        - Build the form yourself
- React Final Form
    - Slow, cumbersome to setup
        - ? Maybe fixed with React Compiler
    - Not dynamic json/schema forms
        - Build the form yourself
    - Maintains a local state, thus accessing intermediate state is a process
- Data Driven Forms
    + JSON Form 
    + Angular + Vue + React
    + Diverse commponent support
        + Wizard
        + Date + Time
        + Tabs
        + Select List
        + Slider
        + File Upload
        - Autocomplete
        - Combobox
    - Built on React Final Forms
        - Slowness
            - ? Maybe fixed with React Compiler 
        - Internal state makes it less intriguing
            - Implement a hack; a hidden listener field that 
    + Support sequences
        + update values based on reference value changes
- jsonforms
    + JSON Form
    + Fast
        - Can be faster
    + Angular + Vue + React
        - No support without frameworks
    + Field Variants
        + string => date
    + Limited UI Formating options
    + Limited Diverse commponent support
        + Date + Time
        + Autocomplete
        + Combobox
        + Tabs
    + Interlinked Forms
    + Middleware API
    - Easily possible to go into a rerender cycle
        - On change is triggered whenever the data is changed. Thus using onchange is unstable.
