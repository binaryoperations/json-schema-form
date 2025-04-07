import { Tab } from '@binaryoperations/json-forms/react/components/Semantic/Tabs/Tab';

export const tabs = [
  {
    id: 1,
    label: 'Users',
  },
  {
    id: 2,
    label: 'Employees',
  },
  {
    id: 3,
    label: 'Colleagues',
  },
];

export const tabNodes = (
  <>
    <Tab id={1}>
      <div>Tab Row One</div>
      <div>Tab Row 2</div>
    </Tab>
    <Tab id={2}>Tab 2</Tab>
    <Tab id={3}>Tab 3</Tab>
  </>
);
