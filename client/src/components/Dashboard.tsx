import React, { useEffect, useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Card } from './Card';

export interface ContentProps {
  _id: string;
  title: string;
  story: string;
  likes: number;
  publishedDate: string;
  userId: string;
}

type TopContentStateProps = ContentProps[];

export const Dashboard = () => {
  const { actions } = useAuth();
  const [topContents, setTopContents] = useState<TopContentStateProps | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const data: TopContentStateProps | undefined = await actions?.request('/content/top', {
          headers: { userid: localStorage.getItem('userId') as string }
        });
        setTopContents(data);
      } catch (error) {
        setTopContents([]);
        console.log(error);
      }
    })();
  }, [actions]);

  return (
    <Container>
      <Accordion>
        {topContents?.map((content, index) => {
          return (
            <Card
              key={content._id}
              eventKey={index.toString()}
              {...content}
              topContents={topContents}
              setTopContents={setTopContents}
            />
          );
        })}
      </Accordion>
    </Container>
  );
};
