import PropTypes from 'prop-types';
import { NavLink, useMatch } from 'react-router-dom';
import styles from './Menu.module.scss';
import classnames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '~/redux/selectors';
import loginModalSlice from '~/redux/slices/loginModalSlice';

const cx = classnames.bind(styles);

export default function MenuItem({ title, to, icon, activeIcon }) {
    const match = useMatch(to);
    const { currentUser } = useSelector(authSelector);
    const dispatch = useDispatch();

    const handleClick = (e) => {
        if (title === 'Following' && !currentUser) {
            e.preventDefault();
            dispatch(loginModalSlice.actions.show());
        }
    };
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cx('menu-item', {
                    active: isActive,
                })
            }
            onClick={handleClick}
        >
            <span className={cx('icon-wrapper')}>
                {match?.pattern.end ? activeIcon : icon}
            </span>
            <h2 className={cx('title')}>{title}</h2>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};
