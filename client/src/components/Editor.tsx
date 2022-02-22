import styled from '@emotion/styled';
import { convertToRaw, EditorState } from 'draft-js';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Editor as DraftEditor, SyntheticEvent } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAuth } from '../context/AuthContext';
import { PageStateTypes } from './App';
import { ContentProps } from './Dashboard';

interface IContentType {
  title: string | undefined;
  story: string;
  publishedDate: string;
  userId: string | null;
}

interface FCProps {
  setPage: React.Dispatch<React.SetStateAction<PageStateTypes | null>>;
}

export const Editor = ({ setPage }: FCProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [storyError, setStoryError] = useState<string | null>(null);

  const { actions } = useAuth();

  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setStoryError(null);
    setTitleError(null);
    const params: IContentType = {
      title,
      story: value,
      publishedDate: new Date().toISOString(),
      userId: localStorage.getItem('userId')
    };
    if (!params.title) setTitleError('title cannot be empty');
    if (!params.story || params.story === '\n') setStoryError('content cannot be empty');

    try {
      const newPost: ContentProps | undefined = await actions?.request('/content', {
        body: params,
        headers: { userid: localStorage.getItem('userId') as string }
      });
      console.log(newPost);
      setPage('Dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  if (storyError || titleError) console.log(storyError, titleError);

  return (
    <StyledForm onSubmit={e => handleOnSubmit(e)}>
      <div style={{ width: '60%' }}>
        <Form.Label htmlFor="inputTitle">Title</Form.Label>
        <Form.Control
          type="text"
          id="inputTitle"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {titleError ? (
          <Form.Text id="inputTitle" style={{ color: 'red' }}>
            {titleError}
          </Form.Text>
        ) : null}
        <div className="mt-3">
          <Form.Label>Content</Form.Label>
          <DraftEditor
            wrapperStyle={{ border: '1px solid #ced4da' }}
            editorStyle={{ height: '40rem' }}
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={editorState => setEditorState(editorState)}
          />
          {storyError ? <Form.Text style={{ color: 'red' }}>{storyError}</Form.Text> : null}
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button type="submit">Post</Button>
        </div>
      </div>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const IContentSchema = Yup.object().shape({
//   title: Yup.string().required('title cannot be empty'),
//   story: Yup.string().required('story field cannot be empty'),
//   publishedDate: Yup.date().default(() => new Date()),
//   userId: Yup.string().default(() => localStorage.getItem('userId'))
// });
