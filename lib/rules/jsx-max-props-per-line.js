/**
 * @fileoverview Limit maximum of props on a single line in JSX
 * @author Yannick Croissant
 */

'use strict';

var has = require('has');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Limit maximum of props on a single line in JSX',
      category: 'Stylistic Issues',
      recommended: false
    },

    schema: [{
      type: 'object',
      properties: {
        maximum: {
          type: 'integer',
          minimum: 1
        }
      }
    }]
  },

  create: function (context) {

    var sourceCode = context.getSourceCode();
    var configuration = context.options[0] || {};
    var maximum = configuration.maximum || 1;

    function getPropName(propNode) {
      if (propNode.type === 'JSXSpreadAttribute') {
        return sourceCode.getText(propNode.argument);
      }
      return propNode.name.name;
    }

    return {
      JSXOpeningElement: function (node) {
        var props = {};

        node.attributes.forEach(function(decl) {
          var line = decl.loc.start.line;
          if (props[line]) {
            props[line].push(decl);
          } else {
            props[line] = [decl];
          }
        });

        for (var line in props) {
          if (!has(props, line)) {
            continue;
          }
          if (props[line].length > maximum) {
            var name = getPropName(props[line][maximum]);
            context.report({
              node: props[line][maximum],
              message: 'Prop `' + name + '` must be placed on a new line'
            });
            break;
          }
        }
      }
    };
  }
};
