import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Menu.module.scss'
import { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import Header from './Header'
import { loginWithApp } from '~/redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '~/redux/selectors'
import loginModalSlice from '~/redux/slices/loginModalSlice'
import Spinner from '~/components/Spinner/Spinner'

const cx = classnames.bind(styles)

export default function Menu({ items, title, policy }) {
    const [history, setHistory] = useState([{ data: items }])
    const current = history[history.length - 1]
    const Comp = current.component
    const dispatch = useDispatch()
    const { currentUser, isLoading, isSuccess, error } =
        useSelector(authSelector)

    useEffect(() => {
        setHistory([{ data: items }])
    }, [items])

    useEffect(() => {
        if (isSuccess && currentUser) {
            dispatch(loginModalSlice.actions.hide())
            window.location.reload()
        }
    }, [dispatch, isSuccess, currentUser])

    const renderItems = () => {
        return current.data?.map((item, index) => {
            const isParent = !!item.children

            return (
                <MenuItem
                    key={index}
                    item={item}
                    onClick={async (e) => {
                        e.preventDefault()
                        if (isParent) {
                            setHistory((prevState) => [
                                ...prevState,
                                item.children,
                            ])
                        } else {
                            if (item.title === 'Continue with Facebook') {
                                dispatch(loginWithApp('facebook'))
                            }
                            if (item.title === 'Continue with Google') {
                                dispatch(loginWithApp('google'))
                            }
                        }
                    }}
                />
            )
        })
    }

    const handleBack = () => {
        setHistory((prevState) => prevState.slice(0, history.length - 1))
    }

    if (isLoading) return <Spinner />

    return (
        <div className={cx('wrapper')}>
            {error && <div className="error">{error}</div>}

            {history.length > 1 ? (
                <>
                    <Header title={current.title} onBack={handleBack} />
                    <Comp />
                </>
            ) : (
                <>
                    <h1 className={cx('header')}>{title}</h1>
                    <ul className={cx('items-wrapper')}>{renderItems()}</ul>
                </>
            )}

            {policy && (
                <p className={cx('policy')}>
                    By continuing, you agree to TikTok’s
                    <a href="/legal/terms-of-use" target="_blank">
                        Terms of Service
                    </a>
                    and confirm that you have read TikTok’s
                    <a href="/legal/private-policy" target="_blank">
                        Private Policy
                    </a>
                </p>
            )}
        </div>
    )
}

Menu.propTypes = {
    items: PropTypes.array,
}
