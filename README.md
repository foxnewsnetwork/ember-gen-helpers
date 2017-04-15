[![Build Status](https://travis-ci.org/foxnewsnetwork/ember-gen-helpers.svg?branch=master)](https://travis-ci.org/foxnewsnetwork/ember-gen-helpers)

# ember-gen-helpers
Ember template helpers for manipulating generators in particular for handling css-based transitions 

## Philosophy
>As an front-end developer, you should strive to do as much as you can with as low-powered tools as possible.

Nowhere is this maxim more true than in the construction of spiffy looking animations and transitions; as much as possible, we should use css instead of javascript to construct beautiful UI

## Usage
This library exposes two helpers:

### gen-anime
Suppose you want to move some stars around when a user clicks a button on your index page:

Your `index.hbs` might look like this:

```hbs
<div class='index-page'>
  <div class='index-page__anime-square'>
    <img src='/assets/images/star.png' class='index-page__anime-image'>
  </div>
  <button>animate!</button>
</div>
```

We'd like to fly and rotate the stars from `&--x1-y0` to `&--x1-y1` to `&--x0-y1` and none of the anime classes when the user clicks the animate button as according to the below `scss` file:

```scss
.index-page {
  &__anime-square {
    width: 50px;
    height: 50px;
    transition-property: transform;
    transition-duration: 500ms;
    transition-timing-function: ease-in-out;

    &--x1-y0 {
      transform: translateX(100px) rotate(15deg) translateY(0);
    }
    &--x1-y1 {
      transform: translateX(100px) rotate(30deg) translateY(100px);
    }
    &--x0-y1 {
      transform: translateX(0) rotate(45deg) translateY(100px);
    }

  }
  &__anime-image {
    width: 100%;
    height: auto;
  }
}
```

In traditional ember, you might use an observer, wrap in a component, or some other rather obtrusive strategy:
```hbs
<div class='index-page'>
  {{#animate-stars isAnimating=isAnimating onDone=(action 'doSomething') as |animatingClass|}}
    <div class='index-page__anime-square {{animatingClass}}'>
      <img src='/assets/images/star.png' class='index-page__anime-image'>
    </div>
  {{/animate-stars}}
  <button {{action (mut isAnimating) true}}>animate!</button>
</div>
```

```javascript
Ember.Component.extend({
  didInsertElement() {
    this.$('index-page__anime-square').one('transitionend', () => this.goToNextTransitionClass())
  }
});
```

With the `{{gen-anime}}` helper, we can skip the ember component creation step:

```hbs
<div class='index-page'>
  <div class='index-page__anime-square 
    {{gen-anime 
      isAnimating
      'anime-square--x1-y0'
      'anime-square--x1-y1'
      'anime-square--x0-y1'
      'anime-square--x0-y0' 
      onDone=(action (mut isAnimating) false)}}'>
    <img src='/assets/images/star.png' class='index-page__anime-image'>
  </div>
  <button {{action (mut isAnimating) true}}>animate!</button>
</div>
```

This has the benefit of making the animation process entirely css and hbs (no javascript) and has the additional benefit of being more declarative

See it working here: https://foxnewsnetwork.github.io/ember-gen-helpers

### gen-wrap
TODO


## Installation

* `git clone <repository-url>` this repository
* `cd ember-anime-helper`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
