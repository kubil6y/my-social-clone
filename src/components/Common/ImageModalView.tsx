import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import { baseUrl, catchErrors } from '../../utils';
import { Post } from '../../types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

interface ImageModalProps {
  postId?: string;
  post?: Post;
  isOpen: boolean;
  onClose: () => void;
  clientFetching: boolean;
}

// client side: get post
// render comments and image in fullscreen modal
export const ImageModalView: React.FC<ImageModalProps> = ({
  postId,
  isOpen,
  onClose,
  clientFetching,
}) => {
  const [state, setState] = useState({
    loading: false,
    post: null,
    error: '',
  });

  useEffect(() => {
    const getUser = async () => {
      if (!clientFetching) return;
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const token = cookie.get('token');
        const { data } = await axios.get(`/${baseUrl}/api/posts/${postId}`, {
          headers: { Authorization: token },
        });
        setState((prev) => ({
          ...prev,
          post: data,
        }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: catchErrors(error) }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };
    getUser();
  }, [postId]);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>alsdfjk lasdjfla sjkdfl ksajdf</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
