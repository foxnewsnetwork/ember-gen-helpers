import Ember from 'ember';
import wrapGenerator from 'ember-gen-helpers/utils/gen-wrap';

const { RSVP } = Ember;

function waitForEmber(x) {
  return new RSVP.Promise((resolve) => {
    const interval = window.setInterval(() => {
      if (document.getElementsByClassName(x).length > 0) {
        resolve(x);
        window.clearInterval(interval);
      }
    }, 20);
  });
}
const TRANSITION_PROPS = ['webkitTransitionEnd', 'transitionend', 'mozTransitionEnd', 'oTransitionEnd'].join(' ');
const oneTransition = (element, cb) => Ember.$(element).one(TRANSITION_PROPS, cb);
const uniqHash = () => Math.floor(Math.random() * 9999999999999).toString(36);
const getAnimationElement = (anchorClass) => document.getElementsByClassName(anchorClass)[0];
const toAnimeFutures = (anchorElement) => (className) => (anchorClass) =>
  new RSVP.Promise((resolve) =>
    oneTransition(anchorElement, () =>
      resolve(`${anchorClass} ${className}`)));

function * animeStar(anchorClass, firstClass, ...classes) {
  yield waitForEmber(yield anchorClass);
  const anchorElement = getAnimationElement(anchorClass);
  const animeFutures = classes.map(toAnimeFutures(anchorElement));
  yield `${anchorClass} ${firstClass}`;

  for(let i = 0; i < animeFutures.length; i++) {
    yield animeFutures[i](anchorClass);
  }
  yield anchorClass;
}

export function genWrapTransformClass([animeFlag, ...classes], hash) {
  const anchorClass = `gen-wrap-transform-class-helper__${animeFlag}--${uniqHash()}`;
  if (animeFlag) {
    return wrapGenerator(animeStar, [anchorClass, ...classes], hash);
  } else {
    return { value: anchorClass };
  }
}

export default Ember.Helper.helper(genWrapTransformClass);
