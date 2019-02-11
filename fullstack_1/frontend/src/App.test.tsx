import React from 'react';
import App from './App';

import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('App', function () {
  test('should contains ', () => {
    const appWrapper = shallow(<App objectives={[]}/>);

    expect(appWrapper.children('h1')).toBeTruthy();
    expect(appWrapper.text()).toContain("CHALLENGE JAVELO");
  });

  test('should contains the count of objectives with current over their target', () => {
    const objectives = [
      { id: 1, title: "1st obj", start: 0, target: 50, current: 20, start_date: "2018-01-05", end_date: "2018-03-05" },
      { id: 2, title: "2nd obj", start: 10, target: 42, current: 999, start_date: "2018-01-25", end_date: "2018-03-30" },
      { id: 3, title: "3rd obj", start: 20, target: 0, current: 20, start_date: "2018-02-05", end_date: "2018-03-05" }
    ];
    const appWrapper = shallow(<App objectives={objectives}/>);

    expect(appWrapper.children('h2')).toBeTruthy();
    expect(appWrapper.text()).toContain(2 + " objectives have their current value over their target");
  });
});
