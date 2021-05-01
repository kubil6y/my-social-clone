import React from 'react';
import { InputWithIcon } from '../../components';
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import { VStack, Button, Collapse, Box } from '@chakra-ui/react';

interface SocialSectionProps {
  facebook: string;
  youtube: string;
  instagram: string;
  twitter: string;
  handleChange: Function;
  showSocialLinks: boolean;
  setShowSocialLinks: Function;
}

export const SocialSection: React.FC<SocialSectionProps> = ({
  facebook,
  youtube,
  instagram,
  twitter,
  handleChange,
  showSocialLinks,
  setShowSocialLinks,
}) => {
  return (
    <>
      <Button
        size="sm"
        alignSelf="start"
        bg="red.400"
        color="white"
        onClick={() => setShowSocialLinks((st: boolean) => !st)}
        rightIcon={<AiOutlineUsergroupAdd />}
        _hover={{ bg: 'red.500' }}
        _active={{ bg: 'red.600' }}
        rounded="none"
      >
        Add Social Links
      </Button>

      <Box w="100%">
        <Collapse in={showSocialLinks} animateOpacity>
          <VStack spacing="1rem">
            <InputWithIcon
              icon={AiOutlineFacebook}
              id="facebook"
              placeholder="Facebook"
              type="text"
              name="facebook"
              value={facebook}
              onChange={handleChange}
            />

            <InputWithIcon
              icon={AiOutlineTwitter}
              id="twitter"
              placeholder="Twitter"
              type="text"
              name="twitter"
              value={twitter}
              onChange={handleChange}
            />

            <InputWithIcon
              icon={AiOutlineYoutube}
              id="youtube"
              placeholder="Youtube"
              type="text"
              name="youtube"
              value={youtube}
              onChange={handleChange}
            />

            <InputWithIcon
              icon={AiOutlineInstagram}
              id="instagram"
              placeholder="Instagram"
              type="text"
              name="instagram"
              value={instagram}
              onChange={handleChange}
            />
          </VStack>
        </Collapse>
      </Box>
    </>
  );
};
