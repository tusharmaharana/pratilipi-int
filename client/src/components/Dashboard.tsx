import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { PageStateTypes } from './App';
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

interface FCProps {
  setPage: React.Dispatch<React.SetStateAction<PageStateTypes | null>>;
}

export const Dashboard = ({ setPage }: FCProps) => {
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
    <StyledContainer>
      <div className="d-flex justify-content-left">
        <Button onClick={() => setPage('Editor')}>Write</Button>
      </div>
      {topContents?.length === 0 ? (
        <h3>No Books Added Yet</h3>
      ) : (
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
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  @media (min-width: 992px) {
    max-width: 45rem;
  }
`;
