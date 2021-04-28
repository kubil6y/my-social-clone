import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Box, Text, Flex, Icon, HStack, Button } from '@chakra-ui/react';
import {
  AiOutlineUpload,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineClear,
} from 'react-icons/ai';

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.download = 'cropPreview.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1
  );
}

export const ImageCropper = () => {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const inputRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const [clear, setClear] = useState(false);
  const [done, setDone] = useState(false);
  const [doneTwice, setDoneTwice] = useState(false);

  console.log({
    upImg,
    imgRef: imgRef.current,
    prevRef: previewCanvasRef.current,
    crop,
    completedCrop,
  });

  const uploadIconClick = () => {
    setDone(false);
    setDoneTwice(false);
    inputRef.current.click();
  };

  const clearHandler = () => {
    //...
    console.log('clear handler');
  };

  const cancelHandler = () => {
    setDone(false);
    setDoneTwice(false);
  };

  const doneHandler = () => {
    if (done) setDoneTwice(true);
    setDone(true);
  };

  const onSelectFile = (e) => {
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
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <Flex alignItems="center">
        <Text fontSize="lg">Select a profile picture</Text>
        <Icon
          as={AiOutlineUpload}
          h={8}
          w={8}
          ml="10px"
          cursor="pointer"
          onClick={uploadIconClick}
        />
      </Flex>
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

      <Box>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </Box>
      {/* controls */}

      {upImg && !doneTwice && (
        <HStack spacing="10px" my="1rem">
          {!done ? (
            <Button
              rightIcon={<AiOutlineClear />}
              colorScheme="green"
              variant="solid"
              size="sm"
              onClick={clearHandler}
            >
              Clear
            </Button>
          ) : (
            <Button
              rightIcon={<AiOutlineClose />}
              colorScheme="red"
              variant="solid"
              size="sm"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          )}

          <Button
            rightIcon={<AiOutlineCheck />}
            colorScheme="blue"
            variant="solid"
            size="sm"
            onClick={doneHandler}
          >
            Done
          </Button>
        </HStack>
      )}
    </Box>
  );
};

/*

      <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() =>
          generateDownload(previewCanvasRef.current, completedCrop)
        }
      >
        Download cropped image
      </button>
 */
