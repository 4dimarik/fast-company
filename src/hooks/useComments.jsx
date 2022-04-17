import React, { useContext, useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useAuth } from './useAuth';
import { nanoid } from 'nanoid';
import commentService from '../service/comment.service';
import { toast } from 'react-toastify';
const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getComments();
  }, [userId]);
  useEffect(() => {
    if (error != null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);
  async function createComments(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id,
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (e) {
      errorCatcher(e);
    }
  }
  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (e) {
      errorCatcher(e);
    } finally {
      setLoading(false);
    }
  }
  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);

      if (content === null) {
        setComments((prevState) => prevState.filter((c) => c._id !== id));
      }
    } catch (e) {
      errorCatcher(e);
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }
  return (
    <CommentsContext.Provider
      value={{
        isLoading,
        comments,
        createComments,
        getComments,
        removeComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropsTypes.oneOfType([
    PropsTypes.arrayOf(PropsTypes.node),
    PropsTypes.node,
  ]),
};
