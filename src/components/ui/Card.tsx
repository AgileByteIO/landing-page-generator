import React from 'react';

interface CardProps {
  title: string;
  description?: string;
  author?: string;
  href: string;
}

export default function Card({ title, description, author, href }: CardProps) {
  return (
    <div className="card-wrapper">
      <a href={href} className="card">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        {author && <small>By {author}</small>}
      </a>
    </div>
  );
}
