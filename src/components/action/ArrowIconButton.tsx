import { Match, Switch } from 'solid-js';

interface ArrowIconButtonProps {
  icon: 'up' | 'down' | 'left' | 'right';
  style?: 'default' | 'outline';
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'link';
  className?: string;
  'aria-label': string;
}

const ArrowIconButton = (props: ArrowIconButtonProps) => {
  const classes = `btn btn-icon btn-${props.style || 'default'} ${props.className || ''}`.trim();

  return (
    <Switch>
      <Match when={props.type === 'link' && props.href}>
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          class={classes}
          aria-label={props['aria-label']}
        >
          <ArrowIcon icon={props.icon} />
        </a>
      </Match>
      <Match when={true}>
        <button
          type="button"
          onClick={props.onClick}
          class={classes}
          aria-label={props['aria-label']}
        >
          <ArrowIcon icon={props.icon} />
        </button>
      </Match>
    </Switch>
  );
};

const ArrowIcon = (props: { icon: 'up' | 'down' | 'left' | 'right' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Switch>
        <Match when={props.icon === 'up'}>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </Match>
        <Match when={props.icon === 'down'}>
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </Match>
        <Match when={props.icon === 'left'}>
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </Match>
        <Match when={props.icon === 'right'}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </Match>
      </Switch>
    </svg>
  );
};

export default ArrowIconButton;