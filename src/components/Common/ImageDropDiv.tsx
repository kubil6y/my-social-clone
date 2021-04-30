import React, { useState, useCallback, useRef, useEffect } from 'react';

import { AiOutlineFileImage } from 'react-icons/ai';
import { Box, Center, AspectRatio, Icon, Image } from '@chakra-ui/react';
import { ImageCropper } from '../../components';

interface ImageDropDivProps {
  highlighted: boolean;
  setHighlighted: Function;
  inputRef: any;
  handleChange: Function;
  mediaPreview: any;
  setMediaPreview: Function;
  media: any;
  setMedia: Function;

  isDropped: boolean;
  setIsDropped: Function;
  //croppedImage: any;
  //setCroppedImage: Function;
  //isCropped: boolean;
  //setIsCropped: Function;
}

export const ImageDropDiv: React.FC<ImageDropDivProps> = ({
  highlighted,
  setHighlighted,
  inputRef,
  handleChange,
  mediaPreview,
  setMediaPreview,
  media,
  setMedia,
  isDropped,
  setIsDropped,
  //croppedImage,
  //setCroppedImage,
  //isCropped,
  //setIsCropped,
}) => {
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false);

  return !isDropped ? (
    <Center
      height="200px"
      w="100%"
      bg="blue.50"
      mb="2rem"
      cursor="pointer"
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const file = Array.from(e.dataTransfer.files);
        console.log(file[0]);
        setMedia(file[0]);
        setIsDropped(true);
        setMediaPreview(URL.createObjectURL(file[0]));
      }}
    >
      <Icon
        as={AiOutlineFileImage}
        h={12}
        w={12}
        color={highlighted ? 'green.600' : 'blue.600'}
      />
    </Center>
  ) : (
    <ImageCropper upImg={media} setUpImg={setMedia} />
  );
};

/*
(
    <Box
      w="100%"
      bg="blue.50"
      mb="2rem"
      cursor="pointer"
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setHighlighted(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setHighlighted(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        const file = Array.from(e.dataTransfer.files);
        console.log(file[0]);
        setMedia(file[0]);
        setMediaPreview(URL.createObjectURL(file[0]));
      }}
    >
      {mediaPreview ? (
        <Box height="400px" width="400px">
          <Icon
            as={AiOutlineFileImage}
            h={12}
            w={12}
            color={highlighted ? 'green.600' : 'blue.600'}
          />
        </Box>
      ) : (
        <Box>
          <Icon
            as={AiOutlineFileImage}
            h={12}
            w={12}
            color={highlighted ? 'green.600' : 'blue.600'}
          />
        </Box>
      )}
    </Box>
  )

 */
