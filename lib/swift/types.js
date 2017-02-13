'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeNameFromGraphQLType = typeNameFromGraphQLType;

var _printing = require('../utilities/printing');

var _changeCase = require('change-case');

var _graphql = require('graphql');

const builtInScalarMap = {
  [_graphql.GraphQLString.name]: 'String',
  [_graphql.GraphQLInt.name]: 'Int',
  [_graphql.GraphQLFloat.name]: 'Double',
  [_graphql.GraphQLBoolean.name]: 'Bool',
  [_graphql.GraphQLID.name]: 'GraphQLID'
};

function typeNameFromGraphQLType(context, type, bareTypeName, isOptional) {
  if (type instanceof _graphql.GraphQLNonNull) {
    return typeNameFromGraphQLType(context, type.ofType, bareTypeName, isOptional || false);
  } else if (isOptional === undefined) {
    isOptional = true;
  }

  let typeName;
  if (type instanceof _graphql.GraphQLList) {
    typeName = '[' + typeNameFromGraphQLType(context, type.ofType, bareTypeName) + ']';
  } else if (type instanceof _graphql.GraphQLScalarType) {
    typeName = builtInScalarMap[type.name] || (context.passthroughCustomScalars ? type.name : _graphql.GraphQLString);
  } else {
    typeName = bareTypeName || type.name;
  }

  return isOptional ? typeName + '?' : typeName;
}
//# sourceMappingURL=types.js.map