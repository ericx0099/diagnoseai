import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, useColorMode, useColorModeValue, Icon } from '@chakra-ui/react'
import {BsFillMoonStarsFill,BsSunFill} from "react-icons/bs"

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <AnimatePresence  initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle theme"
          colorScheme={useColorModeValue('purple', 'orange')}
          icon={useColorModeValue(<Icon  fontSize={15} as={BsFillMoonStarsFill} />,<Icon  fontSize={15} as={BsSunFill} />)}
          onClick={toggleColorMode}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemeToggleButton;