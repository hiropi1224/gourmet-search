module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'list',
        name: 'features',
        message: 'Choose features?',
        choices: [
          { name: 'common', value: 'common' },
          { name: 'auth', value: 'auth' },
          { name: 'search', value: 'search' },
          { name: 'postList', value: 'postList' },
          { name: 'postForm', value: 'postForm' },
        ],
      },
      {
        type: 'list',
        name: 'type',
        message: 'Choose type?',
        choices: [
          { name: 'components', value: 'component' },
          { name: 'page', value: 'page' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: (data) => {
      const generatePath = (features, type) => {
        let path;
        if (features === 'common') {
          path = `../src/${data.features}/`;
        } else if (type === 'component') {
          path = `../src/features/${data.features}/components/`; // '../src/features/postList'
        } else {
          path = `../src/features/${data.features}/page/`;
        }
        return path;
      };
      const path = generatePath(data.features, data.type);

      const actions = [
        {
          type: 'add',
          path: path + '{{pascalCase name}}/index.tsx',
          templateFile: 'BaseComponent/index.tsx.hbs',
        },
        {
          type: 'add',
          path: path + '{{pascalCase name}}/{{pascalCase name}}.tsx',
          templateFile: 'BaseComponent/template.tsx.hbs',
        },
        {
          type: 'add',
          path: path + '{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
          templateFile: 'BaseComponent/story.tsx.hbs',
        },
      ];
      return actions;
    },
  });
};
