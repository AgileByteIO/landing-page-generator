import { Show } from 'solid-js';

interface CardProps {
  title: string;
  description?: string;
  href: string;
}

export default function Card(props: CardProps) {
  return (
    <div class="card-wrapper">
      <a href={props.href} class="card">
        <h3>{props.title}</h3>
        <Show when={props.description}>
          <p>{props.description}</p>
        </Show>
      </a>
    </div>
  );
}