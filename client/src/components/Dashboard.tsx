import React, { useContext, useState } from 'react';
import { Accordion, AccordionContext, Card, useAccordionButton } from 'react-bootstrap';

type activeState=0|1

export const Dashboard = () => {
  const [active, setActive] = useState<activeState>(0);
  const handleItemClick=()=>{
    setActive(1)
  }
  return (
    <div>
      <Accordion flush>
        {topContents.map((content, index) => {
          // const order = topContents.length - length;
          // setLength(length - 1);
          <Card key={content._id}>
        <Card.Header>
          <ContextAwareTitle eventKey={index.toString()}/>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Card>

          return (
            <Accordion.Item eventKey={index.toString()} key={content._id} onClick={handleItemClick}>
              <Accordion.Header>{content.title}</Accordion.Header>
              <Accordion.Body>{content.story}</Accordion.Body>>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

const ContextAwareTitle=({  eventKey }) =>{
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,undefined  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div>
      {!isCurrentEventKey?<Accordion.Header>
        {title} • {likes} Likes
      </Accordion.Header>: <Accordion.Header>{title}</Accordion.Header>}


    </div>
  );
}

const topContents = [
  {
    _id: '6200e78489c135165d63203d',
    title: 'Mistborn1',
    story: 'dffgfdgfdgdgdfgdf fdgfdgdf  dfgdfgdfgdfgdfg dg d',
    likes: 36,
    publishedDate: '2005-11-04',
    userId: 'c2svdffvdfvdfvdfvwer'
  },

  {
    _id: '620a1d51ec35196b3f73db66',
    title: 'How to not give a fuck',
    story:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    publishedDate: '2013-04-05T00:00:00.000Z',
    likes: 565,
    userId: '6203b601b604d06620da7616',
    __v: 0
  },

  {
    _id: '620a1d51ec35196b3f73db67',
    title: 'The Power of Habit',
    story:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    publishedDate: '1986-12-05T00:00:00.000Z',
    likes: 24,
    userId: '6203b609d92b6333338a4d57',
    __v: 0
  },

  {
    _id: '620a1d51ec35196b3f73db68',
    title: 'Dune',
    story:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    publishedDate: '1974-05-24T00:00:00.000Z',
    likes: 78793,
    userId: '6203b79d5974d5ae1a99b850',
    __v: 0
  },

  {
    _id: '620a1d51ec35196b3f73db69',
    title: 'Kafka on the shore',
    story:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    publishedDate: '1999-12-05T00:00:00.000Z',
    likes: 10142,
    userId: '6203b7e285892f635b5507b4',
    __v: 0
  },

  {
    _id: '620a1d51ec35196b3f73db6a',
    title: 'Rich Dad, Poor Dad',
    story:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    publishedDate: '1986-11-16T00:00:00.000Z',
    likes: 928,
    userId: '6203b8503e0cd0d371e3238d',
    __v: 0
  }
];
