const { render, screen } = require('@testing-library/react');
const Hero = require('./src/components/ui/Hero').default;

const defaultProps = {
  title: 'Test Hero Title',
  description: 'This is a very long description that should be truncated after a certain number of lines',
  author: 'Test Author',
  href: '#',
};

console.log('Testing Hero component with descriptionMaxLines={2}...');
const { container } = render(<Hero {...defaultProps} descriptionMaxLines={2} />);

const descriptionElement = screen.getByText(defaultProps.description);
console.log('Description element:', descriptionElement);
console.log('Description element className:', descriptionElement.className);
console.log('Description element style attribute:', descriptionElement.getAttribute('style'));
console.log('All attributes:', Array.from(descriptionElement.attributes).reduce((acc, attr) => {
  acc[attr.name] = attr.value;
  return acc;
}, {}));
console.log('Container HTML snippet:', container.innerHTML.substring(0, 500));

// Check if the styles are actually there
const style = descriptionElement.getAttribute('style');
console.log('Style contains display:', style && style.includes('display'));
console.log('Style contains WebkitBoxOrient:', style && style.includes('WebkitBoxOrient'));
console.log('Style contains WebkitLineClamp:', style && style.includes('WebkitLineClamp'));
console.log('Style contains overflow:', style && style.includes('overflow'));