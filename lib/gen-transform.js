// Shamelessly stolen from https://raw.githubusercontent.com/thefrontside/ember-let/master/lib/inline-let-transform.js
/*
  Transforms inline {{gen-take}} and {{gen-anime}} declarations to their equivalent gen-wrap get form.
  For example,

  ```hbs
  {{gen-take fstar onDone='doSomething'}}

  {{hash xxx=(gen-take
        fstar
        onThrow=(action 'doSometingElse'))}}
  ```

  will be transformed to

  ```hbs
  {{get (gen-wrap fstar onDone='doSomething') 'value'}}

  {{hash xxx=(get (gen-wrap fstar onThrow=(action 'doSomethingElse')) 'value')}}
  ```
*/

const GEN_WRAP_EXPR_BY_ORIGINAL_TYPE = {
  ['gen-take'](builder, params, hash){
    return buildGenWrapExpr('gen-wrap', builder, params, hash);
  },
  ['gen-anime'](builder, params, hash) {
    return buildGenWrapExpr('gen-wrap-transform-class', builder, params, hash);
  }
}

const buildGetGenWrapMustache = (builder, statement) => {
  const { path, params, hash } = statement;
  const fn = GEN_WRAP_EXPR_BY_ORIGINAL_TYPE[path.original];
  if (typeof fn === 'function') {
    const genWrapExpr = fn(builder, params, hash);

    Object.assign(statement, buildGetMustache(builder, genWrapExpr));
  }
};

const buildGetGenWrapExpr = (builder, statement) => {
  const { path, params, hash } = statement;
  const fn = GEN_WRAP_EXPR_BY_ORIGINAL_TYPE[path.original];
  if (typeof fn === 'function') {
    const genWrapExpr = fn(builder, params, hash);
    const transformedStatement = buildGetExpr(builder, genWrapExpr);

    Object.assign(statement, transformedStatement);
  }
}

const valueLiteral = (builder) => builder.string('value');
const buildGenWrapExpr = (shorthand, builder, params, hash) => builder.sexpr(shorthand, params, hash);
const buildGetExpr = (builder, expr) => builder.sexpr('get', [expr, valueLiteral(builder)]);
const buildGetMustache = (builder, expr) => builder.mustache('get', [expr, valueLiteral(builder)]);

class GenTakeTransform {
  constructor() {
    this.syntax = null;
  }

  /**
   * Transforms the AST
   *
   * Below are some helpful links:
   * https://github.com/tildeio/htmlbars/blob/master/packages/htmlbars-syntax/lib/builders.js
   *
   * @param {HTMLBars Node} ast - read more about this here:
   * https://github.com/tildeio/htmlbars/blob/master/packages/htmlbars-syntax/lib/types/visitor-keys.js
   */
  transform(ast) {
    const { builders } = this.syntax;

    const MustacheStatement = (statement) => buildGetGenWrapMustache(builders, statement);
    const SubExpression = (statement) => buildGetGenWrapExpr(builders, statement);

    this.syntax.traverse(ast, { MustacheStatement, SubExpression });

    return ast;
  }
}

module.exports = GenTakeTransform;
