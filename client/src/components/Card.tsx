import React from 'react';
import { Accordion } from 'react-bootstrap';

interface CardProps {
  title: string;
  story: string;
  likes: number;
  publishedDate: string;
  userId?: string;
  setActive: React.Dispatch<React.SetStateAction<activeState>>;
}

export const Card: React.FC<CardProps> = props => {
  const { title, story, likes, publishedDate, setActive } = props;

  <Card>
    <Card.Header>
      <ContextAwareTitle eventKey="0">Click me!</ContextAwareTitle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>;

  return (
    <div>
      {active ? (
        <Accordion.Header>
          {title} &#x2219; {likes} Likes
        </Accordion.Header>
      ) : (
        <Accordion.Header>{title}</Accordion.Header>
      )}

      <Accordion.Body>{story}</Accordion.Body>
    </div>
  );
};
