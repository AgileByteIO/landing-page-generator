interface Props {
  name: string;
  size?: number;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  class?: string;
}

const icons: Record<string, string> = {
  'software-architecture': `<rect x="3" y="3" width="18" height="18" rx="2"></rect><rect x="7" y="7" width="10" height="10" rx="1"></rect><line x1="7" y1="12" x2="17" y2="12"></line><line x1="12" y1="7" x2="12" y2="17"></line>`,
  'software-development': `<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="12" y1="2" x2="12" y2="22"></line>`,
  'software-testing': `<path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>`,
  'ci-cd': `<circle cx="12" cy="12" r="3"></circle><path d="M12 1v4"></path><path d="M12 19v4"></path><path d="M1 12h4"></path><path d="M19 12h4"></path><path d="M4.22 4.22l2.83 2.83"></path><path d="M16.95 16.95l2.83 2.83"></path><path d="M4.22 19.78l2.83-2.83"></path><path d="M16.95 7.05l2.83-2.83"></path>`,
  'containerisation': `<rect x="4" y="4" width="16" height="16" rx="2"></rect><line x1="4" y1="9" x2="20" y2="9"></line><line x1="9" y1="4" x2="9" y2="20"></line>`,
  'e-commerce': `<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>`,
  'it-consulting': `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>`,
};

export default function ServiceIcon(props: Props) {
  const { name, size = 24, strokeWidth = 2, stroke = 'currentColor', fill = 'none', class: className } = props;
  const iconPath = icons[name] || '';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={className}
      innerHTML={iconPath}
    />
  );
}
