//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Card } from './Card';

export const Dashboard = () => {
  const { actions } = useAuth();
  const [topContents, setTopContents] = useState(undefined);

  useEffect(() => {
    (async () => {
      const data = await actions?.request('/content/top', {
        headers: { userid: localStorage.getItem('userId') as string }
      });
      if (data) setTopContents(data);
      else setTopContents(null);
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
