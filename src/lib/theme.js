
import { extendTheme } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const styles = {
  global: (props) => ({
    body: {
      bg: mode('white', '#202023')(props)
    },
  })
}

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: (props) => ({
      color: mode('#3d7aed', '#ff63c3')(props),
      textUnderlineOffset: 3
    })
  },
  Popover: {
    variants: {
      responsive: {
        popper: {
          maxWidth: '800',
          width: '318'
        }
      }
    }
  }
}

const fonts = {
  //heading: "'M PLUS Rounded 1c'"
}

const colors = {
  grassTeal: '#88ccca',
  brand: {
      50: '#3af05e',
      100: '#3af05e',
      200: '#3af05e',
      300: '#3af05e',
      400: '#3af05e',
      500: '#3af05e',
      600: '#3af05e',
      700: '#3af05e',
      800: '#3af05e',
      900: '#3af05e',
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
