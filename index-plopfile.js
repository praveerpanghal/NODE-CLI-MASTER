const shell = require('shelljs')

module.exports = function (plop) {

  const templatesPath = './templates'

  plop.setGenerator('component', {
    description: 'creates a DXP web component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'component name (omit `dxp-` prefix):',
        validate: value => true // @todo
      },
      {
        type: 'input',
        name: 'componentDescription',
        message: 'component description:',
        validate: value => true // @todo
      }
    ],
    actions: data => {
      const actions = []
      const component = 'dxp-{{ dashCase componentName }}'
      const sourcePath = `${templatesPath}/component`
      const targetPath = `packages/components/${component}`
      const packageJSONPath = `${targetPath}/package.json`
      const stencilConfigPath = `${targetPath}/stencil.config.js`
      const readmePath = `${targetPath}/README.md`
      const srcPath = `${targetPath}/src`
      const indexPath = `${srcPath}/index.html`
      const txsPath = `${srcPath}/${component}.tsx`
      const txsSpecPath = `${srcPath}/${component}.spec.tsx`

      // copy template files
      actions.push({
        type: 'addMany',
        destination: targetPath,
        base: sourcePath,
        templateFiles: `${sourcePath}/**`
      })

      // update README
      actions.push({
        type: 'modify',
        path: readmePath,
        pattern: /componentName/g,
        template: '{{ dashCase componentName }}'
      })
      actions.push({
        type: 'modify',
        path: readmePath,
        pattern: /description/g,
        template: '{{ componentDescription }}'
      })

      // update component package.json
      actions.push({
        type: 'modify',
        path: packageJSONPath,
        pattern: /componentName/g,
        template: '{{ dashCase componentName }}'
      })
      actions.push({
        type: 'modify',
        path: packageJSONPath,
        pattern: /componentDescription/g,
        template: '{{ componentDescription }}'
      })

      // update component stencil.config.js
      actions.push({
        type: 'modify',
        path: stencilConfigPath,
        pattern: /componentName/g,
        template: '{{ dashCase componentName }}'
      })

      // update component .tsx
      actions.push({
        type: 'modify',
        path: txsPath,
        pattern: /componentName/g,
        template: '{{ dashCase componentName }}'
      })
      actions.push({
        type: 'modify',
        path: txsPath,
        pattern: /ComponentName/g,
        template: '{{ pascalCase componentName }}'
      })

      // update component .spec.tsx
      actions.push({
        type: 'modify',
        path: txsSpecPath,
        pattern: /componentName/g,
        template: '{{ dashCase componentName }}'
      })
      actions.push({
        type: 'modify',
        path: txsSpecPath,
        pattern: /ComponentName/g,
        template: '{{ pascalCase componentName }}'
      })

      // update component index.html
      actions.push({
        type: 'modify',
        path: indexPath,
        pattern: /componentName/g,
        template: '{{ dashCase componentName }}'
      })

      // install dependencies
      actions.push(data => {
        return new Promise(resolve => {
          shell.exec('yarn', resolve)
        })
      })

      return actions
    }
  })

  plop.setGenerator('interface', {
    description: 'creates an interface'
  })

}
