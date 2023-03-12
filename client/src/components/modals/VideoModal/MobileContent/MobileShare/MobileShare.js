import React from 'react';
import { Wrapper } from './styled';
import {
    CopyIcon,
    FacebookIcon,
    LineIcon,
    LinkedInIcon,
    MailIcon,
    PinterestIcon,
    RedditIcon,
    ReportIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from '~/components/Icons';

const SHARE_MENU = [
    {
        icon: <FacebookIcon width="2.4rem" height="2.4rem" />,
        title: 'Facebook',
        to: '/feedback',
    },
    {
        icon: <WhatsappIcon width="2.4rem" height="2.4rem" />,
        title: 'Whatsapp',
    },
    {
        icon: <TwitterIcon width="2.4rem" height="2.4rem" />,
        title: 'Twitter',
    },
    {
        icon: <CopyIcon width="2.4rem" height="2.4rem" />,
        title: 'Sao chép',
    },
    {
        icon: <LinkedInIcon width="2.4rem" height="2.4rem" />,
        title: 'LinkedIn',
    },
    {
        icon: <RedditIcon width="2.4rem" height="2.4rem" />,
        title: 'Reddit',
    },
    {
        icon: <TelegramIcon width="2.4rem" height="2.4rem" />,
        title: 'Telegram',
    },
    {
        icon: <MailIcon width="2.4rem" height="2.4rem" />,
        title: 'Email',
    },
    {
        icon: <LineIcon width="2.4rem" height="2.4rem" />,
        title: 'Line',
    },
    {
        icon: <PinterestIcon width="2.4rem" height="2.4rem" />,
        title: 'Pinterest',
    },
];

export default function MobileShare({ showShareContent, onHideShareContent }) {
    return (
        <Wrapper className={showShareContent ? 'show' : 'hide'}>
            <div className="header">
                <span className="comments-count">Chia sẻ với</span>
            </div>
            <ul className="share-list">
                {SHARE_MENU.map((item, index) => (
                    <li key={index} className="share-item">
                        <span className="item-icon icon-wrapper">
                            {item.icon}
                        </span>
                        <span className="item-title">{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="report-container">
                <div className="report-item">
                    <span className="report-icon icon-wrapper">
                        <ReportIcon />
                    </span>
                    <span className="title">Báo cáo</span>
                </div>
            </div>
            <div className="footer" onClick={onHideShareContent}>
                Hủy
            </div>
        </Wrapper>
    );
}
