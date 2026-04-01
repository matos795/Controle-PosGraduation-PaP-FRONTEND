import './styles.css'
import { Link, useMatches } from "react-router-dom";
import userImg from '../../assets/user.png'

export default function Header() {

    const matches = useMatches();

    const current = matches[matches.length - 1];

    type BreadcrumbItem = {
        label: string;
        to?: string;
    };

    type RouteHandle = {
        title: string;
        breadcrumb?: BreadcrumbItem[];
    };

    const handleData = (current?.handle as RouteHandle) || {};

    const { title, breadcrumb = [] } = handleData;

    return (
        <header className="cp-header">

            {/* LEFT */}
            <div className="cp-header-left">

                {/* Breadcrumb */}
                {breadcrumb.length > 0 && (
                    <div className="cp-header-breadcrumb">
                        {breadcrumb.map((item, index) => (
                            <span key={index}>
                                {item.to ? (
                                    <Link to={item.to} className="cp-breadcrumb-link">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="cp-breadcrumb-current">
                                        {item.label}
                                    </span>
                                )}

                                {index < breadcrumb.length - 1 && " / "}
                            </span>
                        ))}
                    </div>
                )}
            </div>

                {/* Title */}
                <h1 className="cp-header-title">
                    {title}
                </h1>

            {/* RIGHT */}
            <div className="cp-header-right">
                <div className="cp-user">
                    <img src={userImg} alt="user" />
                    Admin ▾
                </div>
            </div>

        </header>
    )
}