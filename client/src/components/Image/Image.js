import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Image.module.scss'
import images from '~/assets/images'

const cx = classNames.bind(styles)

export const Image = forwardRef(
    (
        {
            src,
            alt,
            className,
            fallback: customFallback = images.noImage,
            ...props
        },
        ref
    ) => {
        return (
            <img
                className={cx('wrapper', className)}
                ref={ref}
                src={src || customFallback}
                alt={alt}
                {...props}
            />
        )
    }
)

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
}

export default Image
