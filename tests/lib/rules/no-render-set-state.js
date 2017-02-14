/**
 * @fileoverview Prevent usage of setState in componentDidMount
 * @author Adnan Asani
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-render-set-state');
var RuleTester = require('eslint').RuleTester;

var parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('no-render-set-state', rule, {
  valid: [{
    code: [
      'class Hello extends React.Component {',
      '  render () {',
      '    return <div onClick={() => this.setState({ data: data })}/>',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    optons: ['disallow-in-func']
  }, {
    code: [
      'class Hello extends React.Component {',
      '  handleClick () { this.setState({ data: data }) }',
      '  render () {',
      '    return <div onClick={this.handleClick}/>',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    optons: ['disallow-in-func']
  }],

  invalid: [{
    code: [
      'class Hello extends React.Component {',
      '  render () {',
      '    this.setState({ data: data });',
      '    return <div />',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    optons: ['disallow-in-func'],
    errors: [{
      message: 'Do not use setState in render'
    }]
  }]
});
