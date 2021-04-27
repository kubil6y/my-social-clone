import React from 'react';
import { AiOutlineFileImage } from 'react-icons/ai';
import { Box, AspectRatio, Icon, Image } from '@chakra-ui/react';

interface ImageDropDivProps {
  highlighted: boolean;
  setHighlighted: Function;
  inputRef: any;
  handleChange: Function;
  mediaPreview: any;
  setMediaPreview: Function;
  setMedia: Function;
}

export const ImageDropDiv: React.FC<ImageDropDivProps> = ({
  highlighted,
  setHighlighted,
  inputRef,
  handleChange,
  mediaPreview,
  setMediaPreview,
  setMedia,
}) => {
  return (
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
        <AspectRatio ratio={4 / 3} m="auto" objectFit="cover">
          <Image src={mediaPreview} alt="media" objectFit="cover" />
        </AspectRatio>
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
  );
};
