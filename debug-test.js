const { render, screen } = require('@testing-library/react');
const Hero = require('./src/components/ui/Hero').default;

const defaultProps = {
  title: 'Test Hero Title',
  description: 'This is a very long description that should be truncated after a certain number of lines',
  author: 'Test Author',
  href: '#',
};

console.log('Testing Hero component...');
const { container } = render(<Hero {...defaultProps} descriptionMaxLines={2} />);

const descriptionElement = screen.getByText(defaultProps.description);
console.log('Description element:', descriptionElement);
console.log('Description element className:', descriptionElement.className);
console.log('Description element style:', descriptionElement.getAttribute('style'));
console.log('Description element computed style:', window.getComputedStyle ? window.getComputedStyle(descriptionElement) : 'not available');
console.log('Container HTML:', container.innerHTML);