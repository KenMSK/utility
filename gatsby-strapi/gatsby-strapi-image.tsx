import {
  GatsbyImage,
  GatsbyImageProps,
  IGatsbyImageData,
} from 'gatsby-plugin-image'
import { memo } from 'react'
import { DeepNullable } from '../util'
import { styled } from 'styled-components'

const NoHighlightImage = styled(GatsbyImage)`
  & img {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }
`

export type StrapiImageData = null | DeepNullable<{
  localFile: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}>

type StrapiImagePropType = Partial<Omit<GatsbyImageProps, 'image'>> & {
  strapiImage?: StrapiImageData
  isRequired?: boolean
}

export const StrapiImage = memo<StrapiImagePropType>(
  ({ strapiImage, alt = '', className, isRequired = false, ...others }) => {
    const gatsbyImage = strapiImage?.localFile?.childImageSharp?.gatsbyImageData
    if (gatsbyImage) {
      return (
        <NoHighlightImage
          className={className}
          image={gatsbyImage as any}
          alt={alt}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...others}
        />
      )
    }
    if (isRequired) {
      console.error(strapiImage, JSON.stringify(strapiImage, null, 2))
      throw new Error('Required image is missing: ')
    }
    return null
  },
)
StrapiImage.displayName = 'StrapiImage'
