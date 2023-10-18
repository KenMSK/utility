import { graphql } from 'gatsby'

export const PhotoFields = graphql`
  fragment PHOTO_FIELDS on STRAPI__MEDIA {
    localFile {
      childImageSharp {
        gatsbyImageData
      }
    }
    name
    url
    size
    height
    id
  }
`
