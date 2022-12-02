"use strict";

var t = require("@babel/types");
function createObjectfromObjectExpression(node) {
  return t.objectExpression(node);
}
module.exports = {
  Program: {
    enter: function enter(progPath) {
      progPath.traverse({
        JSXOpeningElement: {
          enter: function enter(JSXOpeningElementPath) {
            JSXOpeningElementPath.traverse({
              JSXAttribute: {
                enter: function enter(JSXAttributePath) {
                  var _JSXAttributePath$nod, _JSXAttributePath$nod2;
                  if (((_JSXAttributePath$nod = JSXAttributePath.node) === null || _JSXAttributePath$nod === void 0 ? void 0 : (_JSXAttributePath$nod2 = _JSXAttributePath$nod.value) === null || _JSXAttributePath$nod2 === void 0 ? void 0 : _JSXAttributePath$nod2.type) === "JSXExpressionContainer") {
                    var _JSXAttributePath$nod3, _JSXAttributePath$nod4;
                    if (((_JSXAttributePath$nod3 = JSXAttributePath.node) === null || _JSXAttributePath$nod3 === void 0 ? void 0 : (_JSXAttributePath$nod4 = _JSXAttributePath$nod3.value) === null || _JSXAttributePath$nod4 === void 0 ? void 0 : _JSXAttributePath$nod4.expression.type) === "ObjectExpression") {
                      var flag = true;
                      JSXAttributePath.traverse({
                        ObjectProperty: {
                          enter: function enter(ObjectPropertyPath) {
                            var _ObjectPropertyPath$n, _ObjectPropertyPath$n2;
                            if (((_ObjectPropertyPath$n = ObjectPropertyPath.node) === null || _ObjectPropertyPath$n === void 0 ? void 0 : (_ObjectPropertyPath$n2 = _ObjectPropertyPath$n.value) === null || _ObjectPropertyPath$n2 === void 0 ? void 0 : _ObjectPropertyPath$n2.type) === "Identifier") {
                              flag = false;
                            }
                          }
                        }
                      });
                      if (flag) {
                        var _progPath$node, _progPath$node$body, _JSXAttributePath$nod5, _JSXAttributePath$nod6, _JSXAttributePath$nod7;
                        var timestamp = "_timeStamp" + new Date().getTime();
                        (_progPath$node = progPath.node) === null || _progPath$node === void 0 ? void 0 : (_progPath$node$body = _progPath$node.body) === null || _progPath$node$body === void 0 ? void 0 : _progPath$node$body.unshift(t.variableDeclaration("const", [t.variableDeclarator(t.identifier(timestamp), createObjectfromObjectExpression((_JSXAttributePath$nod5 = JSXAttributePath.node) === null || _JSXAttributePath$nod5 === void 0 ? void 0 : (_JSXAttributePath$nod6 = _JSXAttributePath$nod5.value) === null || _JSXAttributePath$nod6 === void 0 ? void 0 : (_JSXAttributePath$nod7 = _JSXAttributePath$nod6.expression) === null || _JSXAttributePath$nod7 === void 0 ? void 0 : _JSXAttributePath$nod7.properties))]));
                        JSXAttributePath.node.value.expression = t.identifier(timestamp);
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    }
  }
};