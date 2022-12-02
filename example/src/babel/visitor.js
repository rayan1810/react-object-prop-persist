const t = require("@babel/types");

function createObjectfromObjectExpression(node) {
  return t.objectExpression(node);
}

module.exports = {
  Program: {
    enter: function (progPath) {
      progPath.traverse({
        JSXOpeningElement: {
          enter: function (JSXOpeningElementPath) {
            JSXOpeningElementPath.traverse({
              JSXAttribute: {
                enter: function (JSXAttributePath) {
                  if (
                    JSXAttributePath.node?.value?.type ===
                    "JSXExpressionContainer"
                  ) {
                    if (
                      JSXAttributePath.node?.value?.expression.type ===
                      "ObjectExpression"
                    ) {
                      let flag = true;
                      JSXAttributePath.traverse({
                        ObjectProperty: {
                          enter: function (ObjectPropertyPath) {
                            if (
                              ObjectPropertyPath.node?.value?.type ===
                              "Identifier"
                            ) {
                              flag = false;
                            }
                          },
                        },
                      });
                      if (flag) {
                        const timestamp = "_timeStamp" + new Date().getTime();
                        progPath.node?.body?.unshift(
                          t.variableDeclaration("const", [
                            t.variableDeclarator(
                              t.identifier(timestamp),
                              createObjectfromObjectExpression(
                                JSXAttributePath.node?.value?.expression
                                  ?.properties
                              )
                            ),
                          ])
                        );
                        JSXAttributePath.node.value.expression =
                          t.identifier(timestamp);
                      }
                    }
                  }
                },
              },
            });
          },
        },
      });
    },
  },
};
