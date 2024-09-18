// components/Breadcrumb.js
import Link from 'next/link';

const Breadcrumb = ({ links }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {links.map((link, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${index === links.length - 1 ? 'active' : ''}`}
            aria-current={index === links.length - 1 ? 'page' : undefined}
          >
            {index < links.length - 1 ? (
              <Link href={link.href} as={link.as || link.href}>
                {link.label}
              </Link>
            ) : (
              link.label
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
