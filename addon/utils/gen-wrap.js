import Ember from 'ember';
import isPromise from './is-promise';

const { set, get, getWithDefault } = Ember;
const NOOP = () => {};

const iterateGenerator = (gen, input, handlers, method='next') => {
  const { value, done } = gen[method](input);
  const { onNext, onDone, onThrow } = handlers;

  if (isPromise(value)) {
    value.then((result) => {
      iterateGenerator(gen, onNext(result), handlers);
    }).catch((error) => {
      iterateGenerator(gen, onThrow(error), handlers, 'throw');
    });
  } else if (done) {
    onDone(input);
  } else {
    iterateGenerator(gen, onNext(value), handlers);
  }
}

const GenWrap = Ember.Object.extend({
  /**
   * Handle to the local generator
   */
  _localGenerator: null,

  /**
   * Becomes true when the generator is done
   */
  isDone: false,

  init() {
    const generator = get(this, '_localGenerator');
    const onNext = (value) => {
      getWithDefault(this, 'onNext', NOOP).call(this, value);
      return set(this, 'value', value);
    };
    const onDone = (output) => {
      getWithDefault(this, 'onDone', NOOP).call(this, output);
      return set(this, 'isDone', true);
    };
    const onThrow = (error) => {
      getWithDefault(this, 'onThrow', NOOP).call(this, error);
      set(this, 'isThrow', true);
      return error
    };

    iterateGenerator(generator, null, { onNext, onDone, onThrow });
  }
});

/**
 * Creates an es6 generator
 *
 * @param {function*() | ES6 Generator} fstar
 * @param {Array} params
 */
function makeGenerator(fstar, params) {
  if (typeof fstar === 'function') {
    return fstar(...params);
  } else {
    return fstar;
  }
}

export default function genWrap(fstar, params=[], opts={}) {
  const _localGenerator = makeGenerator(fstar, params);

  return GenWrap.create(Object.assign({}, opts, { _localGenerator }));
}
