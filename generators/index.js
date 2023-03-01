module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'list',
        name: 'atomic',
        message: 'Choose atomic?',
        choices: [
          { name: 'atoms', value: 'atoms' },
          { name: 'molecules', value: 'molecules' },
          { name: 'organisms', value: 'organisms' },
          { name: 'pages', value: 'pages' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
      {
        type: 'input',
        name: 'category',
        message: 'What is your storybook category?',
      },
    ],
    actions: (data) => {
      const path = `../src/components/${data.atomic}/`;
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
