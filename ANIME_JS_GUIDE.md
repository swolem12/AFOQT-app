# Anime.js Integration Guide

## Overview
AFOQT Quest now uses [anime.js v4](https://github.com/swolem12/anime) for all CSS design and animation work. This provides smooth, performant animations with a powerful API.

## Library Details
- **Source**: https://github.com/swolem12/anime (your fork)
- **File**: `anime.min.js` (87KB, UMD build)
- **Version**: v4.0.0-beta.102.1
- **Loaded**: Before `app.js` in `index.html`
- **Global**: Available as `anime` object

## Basic Usage

### Simple Animation
```javascript
anime({
  targets: '.my-element',
  translateX: 250,
  rotate: '1turn',
  duration: 800,
  easing: 'easeInOutQuad'
});
```

### Timeline (Sequential Animations)
```javascript
const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl.add({
  targets: '.logo',
  opacity: [0, 1],
  scale: [0.5, 1]
})
.add({
  targets: '.title',
  translateY: [-50, 0],
  opacity: [0, 1]
}, '-=500'); // Start 500ms before previous animation ends
```

### Stagger (Offset Multiple Elements)
```javascript
anime({
  targets: '.list-item',
  translateX: [100, 0],
  opacity: [0, 1],
  delay: anime.stagger(100) // Delay each by 100ms
});
```

### SVG Morphing
```javascript
anime({
  targets: '#my-path',
  d: [
    { value: 'M10 10 L20 20...' }, // Start path
    { value: 'M15 15 L25 25...' }  // End path
  ],
  duration: 2000,
  easing: 'easeInOutQuad'
});
```

### Spring Physics
```javascript
anime({
  targets: '.bouncy-element',
  translateY: 100,
  duration: 1000,
  easing: 'spring(1, 80, 10, 0)' // mass, stiffness, damping, velocity
});
```

## Common Easings
- `linear` - Constant speed
- `easeInOutQuad` - Smooth acceleration/deceleration
- `easeOutExpo` - Fast start, slow end (good for entrances)
- `easeInOutElastic` - Bouncy effect
- `spring(...)` - Physics-based spring
- `steps(10)` - Stepped animation (sprite sheets)

## Animatable Properties

### Transforms
- `translateX`, `translateY`, `translateZ`
- `rotate`, `rotateX`, `rotateY`, `rotateZ`
- `scale`, `scaleX`, `scaleY`, `scaleZ`
- `skew`, `skewX`, `skewY`

### CSS Properties
- `opacity`
- `backgroundColor`, `color`
- `width`, `height`
- `borderRadius`
- `top`, `left`, `right`, `bottom`

### SVG Attributes
- `d` (path data for morphing)
- `points` (polygon/polyline points)
- `strokeDashoffset` (line drawing effect)
- `fill`, `stroke`

## Advanced Features

### Callbacks
```javascript
anime({
  targets: '.element',
  translateX: 250,
  begin: (anim) => console.log('Started'),
  update: (anim) => console.log('Progress:', anim.progress),
  complete: (anim) => console.log('Finished')
});
```

### Playback Control
```javascript
const animation = anime({
  targets: '.element',
  translateX: 250,
  autoplay: false
});

animation.play();
animation.pause();
animation.restart();
animation.reverse();
animation.seek(500); // Jump to 500ms
```

### Path Following
```javascript
const path = anime.path('#my-svg-path');

anime({
  targets: '.element',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  duration: 2000
});
```

## Examples from AFOQT Quest

### Boot Sequence Flash
```javascript
// Phase 1: Logo flash with glitch
anime.timeline()
  .add({
    targets: '.boot-flash-overlay',
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 300,
    easing: 'easeOutQuad'
  })
  .add({
    targets: '.boot-logo-symbol',
    opacity: [0, 1],
    scale: [0.5, 1.2],
    rotate: [-180, 10],
    duration: 1000,
    easing: 'easeOutElastic(1, .6)'
  })
  .add({
    targets: '.boot-logo-glitch',
    opacity: [0, 0.8, 0],
    translateX: [-3, 2, -2, 0],
    translateY: [2, -3, 3, 0],
    duration: 200,
    easing: 'linear'
  });
```

### Data Stream Animation
```javascript
anime({
  targets: '.data-stream',
  translateY: ['0%', '100%'],
  opacity: [0, 1, 0],
  delay: anime.stagger(300),
  duration: 1500,
  easing: 'easeInQuad',
  loop: true
});
```

### Character Title Reveal
```javascript
anime({
  targets: '.title-char',
  opacity: [0, 1],
  translateY: [30, 0],
  rotateX: [90, 0],
  filter: ['blur(10px)', 'blur(0px)'],
  delay: anime.stagger(50),
  duration: 500,
  easing: 'easeOutExpo'
});
```

## Performance Tips

1. **Use transforms over position**: `translateX` is faster than `left`
2. **GPU acceleration**: Transform and opacity trigger GPU rendering
3. **Avoid layout thrashing**: Batch DOM reads/writes
4. **Use `will-change`**: Add `will-change: transform` to CSS for heavy animations
5. **Limit simultaneous animations**: Use timelines to sequence instead

## Resources

- **Documentation**: https://animejs.com/documentation/
- **Examples**: https://animejs.com/
- **Codepen Collection**: https://codepen.io/collection/XLebem/
- **Your Fork**: https://github.com/swolem12/anime

## Next Steps

All future animation work should use anime.js instead of pure CSS keyframes. This includes:
- Boot sequences
- Screen transitions
- Button effects
- Panel animations
- Loading indicators
- Character selection effects
