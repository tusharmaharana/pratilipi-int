import styled from '@emotion/styled';
import { faHeart as UnLike } from '@fortawesome/free-regular-svg-icons';
import { faHeart as Like } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import produce from 'immer';
import React, { useContext, useState } from 'react';
import { Accordion, AccordionContext, Card as BootCard, useAccordionButton } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { formatDate, shortenBigNum } from '../utils/commonHelpers';
import { ContentProps } from './Dashboard';

interface TitleProps {
  eventKey: string;
  content: ContentProps;
}
interface CardProps extends ContentProps {
  eventKey: string;
  topContents: ContentProps[];
  setTopContents: React.Dispatch<React.SetStateAction<ContentProps[] | undefined>>;
}

const ContextAwareTitle = ({ eventKey, content }: TitleProps) => {
  const { activeEventKey } = useContext(AccordionContext);

  const onClickHandler = useAccordionButton(eventKey, undefined);

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div onClick={onClickHandler}>
      {!isCurrentEventKey ? (
        <Accordion.Header>
          {content.title} • {shortenBigNum(content.likes)} likes
        </Accordion.Header>
      ) : (
        <Accordion.Header>{content.title}</Accordion.Header>
      )}
    </div>
  );
};

export const Card: React.FC<CardProps> = props => {
  const { _id, story, likes, publishedDate, eventKey, topContents, setTopContents } = props;
  const { actions } = useAuth();

  const [like, setLike] = useState<boolean | undefined>(undefined);

  const onHandleClick = async () => {
    try {
      if (!like) {
        await actions?.request(`/content/${_id}/like`, {
          headers: { userid: localStorage.getItem('userId') as string }
        });
        const nextState = produce(topContents, draft => {
          const index = draft.findIndex(item => item._id === _id);
          draft[index].likes += 1;
        });
        setTopContents(nextState);
        setLike(true);
      } else {
        await actions?.request(`/content/${_id}/unlike`, {
          headers: { userid: localStorage.getItem('userId') as string }
        });
        const nextState = produce(topContents, draft => {
          const index = draft.findIndex(item => item._id === _id);
          draft[index].likes -= 1;
        });
        setTopContents(nextState);
        setLike(false);
      }
    } catch (error) {
      console.log(error);
      return <div>something went wrong</div>;
    }
  };

  return (
    <Accordion.Item eventKey={eventKey} className="mt-4 mb-4">
      <ContextAwareTitle eventKey={eventKey} content={props} />
      <Accordion.Body className="pb-1">
        <BootCard body>{story}</BootCard>
        <div className="mt-2 mb-1">
          <div onClick={onHandleClick} className="d-inline">
            {like ? <StyledIcon icon={Like} /> : <StyledIcon icon={UnLike} />}
          </div>
          <span>{shortenBigNum(likes)} likes</span>
        </div>
        <small className="fw-lighter">published on {formatDate(publishedDate)}</small>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.4rem;
  padding-right: 1rem;
  color: #dd3434;
`;
