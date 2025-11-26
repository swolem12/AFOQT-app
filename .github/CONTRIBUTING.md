# Contributing to AFOQT Quest

Thanks for your interest in contributing!

## Development Setup

1. Fork the repository
2. Clone your fork
3. Start local server: `python3 -m http.server 8000`
4. Make changes
5. Test thoroughly
6. Commit and push

## Pull Request Process

1. Update documentation if needed
2. Bump service worker cache version in `sw.js`
3. Test offline functionality
4. Create PR with clear description
5. Wait for review

## Code Guidelines

- Maintain retro terminal aesthetic
- Use existing patterns in `app.js`
- Comment complex logic
- No build dependencies (vanilla JS)
- Test on mobile devices

## Adding Questions

1. Create JSON in `Test Content/<Subject>/`
2. Follow naming: `<subtopic>_<difficulty>_part<N>.json`
3. Update `Patch_18.json` if new subtopic
4. Test with `tests/test-real-questions.html`

## Reporting Bugs

Use GitHub Issues with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/device info
