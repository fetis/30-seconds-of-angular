const {sortByLevel} = require("../helpers");

test('sortByLevel :: sorts according to schema ', () => {
  const initial = [
    {level: 'intermediate',},
    {level: 'beginner',},
    {level: 'advanced',},
    {level: 'intermediate',},
  ];
  const sorted = sortByLevel(initial);

  expect(sorted).toMatchSnapshot();

  // Does not mutate the original array
  expect(initial).toMatchSnapshot();
});
