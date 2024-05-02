
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
  "body": "Montserrat, sans serif"
}

const colors = {
  grassTeal: '#88ccca',
  brand: {
      50: '#348f6c',
      100: '#348f6c',
      200: '#348f6c',
      300: '#348f6c',
      400: '#348f6c',
      500: '#348f6c',
      600: '#348f6c',
      700: '#348f6c',
      800: '#348f6c',
      900: '#348f6c',
  }
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
