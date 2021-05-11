import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Box, Text, Flex, Icon, HStack, Button } from '@chakra-ui/react';
import {
  AiOutlineUpload,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineClear,
} from 'react-icons/ai';

function generateImage(canvas: any, crop: any) {
  if (!crop || !canvas) {
    return;
  }
  return canvas.toDataURL('image/jpeg', 1.0);
}

interface ImageCropperProps {
  setMedia: Function;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ setMedia }) => {
  const [upImg, setUpImg] = useState<any>();
  const imgRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({
    unit: '%',
    width: 30,
    aspect: 1 / 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const [clear, setClear] = useState(false);
  const [done, setDone] = useState(false);
  const [doneTwice, setDoneTwice] = useState(false);

  const uploadIconClick = () => {
    inputRef.current.click();
    setDone(false);
    setDoneTwice(false);
    setClear(false);
  };

  const clearHandler = () => {
    setMedia(null);
    setCompletedCrop(undefined);
    setDone(true);
    setClear(true);
  };

  const cancelHandler = () => {
    setDone(false);
    setDoneTwice(false);
  };

  const doneHandler = () => {
    if (done) {
      setDoneTwice(true);
      setMedia(generateImage(previewCanvasRef.current, completedCrop));
    }
    setDone(true);
  };

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <Box>
      <input
        type='file'
        accept='image/*'
        onChange={onSelectFile}
        ref={inputRef}
        style={{ display: 'none' }}
      />

      <span data-trigger='fileinput'>
        <Flex alignItems='center'>
          <Text fontSize='lg'>Select a profile picture</Text>
          <Icon
            as={AiOutlineUpload}
            h={8}
            w={8}
            ml='10px'
            cursor='pointer'
            onClick={uploadIconClick}
          />
        </Flex>
      </span>

      <Box>
        {!done && (
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
        )}
      </Box>

      <Box my='10px'>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
            borderRadius: '9999px',
          }}
        />
      </Box>

      {/* controls */}
      {upImg && !doneTwice && !clear && (
        <HStack spacing='10px' my='1rem'>
          {!done ? (
            <Button
              rightIcon={<AiOutlineClear />}
              colorScheme='green'
              variant='solid'
              size='sm'
              onClick={clearHandler}
            >
              Clear
            </Button>
          ) : (
            <Button
              rightIcon={<AiOutlineClose />}
              colorScheme='red'
              variant='solid'
              size='sm'
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          )}

          <Button
            rightIcon={<AiOutlineCheck />}
            colorScheme='blue'
            variant='solid'
            size='sm'
            onClick={doneHandler}
          >
            Done
          </Button>
        </HStack>
      )}
    </Box>
  );
};
