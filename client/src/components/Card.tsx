import styled from '@emotion/styled';
import { faHeart as UnLike } from '@fortawesome/free-regular-svg-icons';
import { faHeart as Like } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Accordion, AccordionContext, Card as BootCard, useAccordionButton } from 'react-bootstrap';
import { formatDate, shortenBigNum } from '../utils/commonHelpers';

interface TitleProps {
  eventKey: string;
  content: ContentProps;
}
interface ContentProps {
  title: string;
  story: string;
  likes: number;
  publishedDate: string;
  eventKey: string;
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

export const Card: React.FC<ContentProps> = props => {
  const [like, setLike] = useState<boolean>(false);

  const { story, likes, publishedDate, eventKey } = props;

  return (
    <Accordion.Item eventKey={eventKey} className="mt-4 mb-4">
      <ContextAwareTitle eventKey={eventKey} content={props} />
      <Accordion.Body className="pb-1">
        <BootCard body>{story}</BootCard>
        <div className="mt-2 mb-1">
          <div onClick={e => setLike(!like)} className="d-inline">
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

// const StyledFooter = styled.div`
//   padding-top: 1rem;
// `;
