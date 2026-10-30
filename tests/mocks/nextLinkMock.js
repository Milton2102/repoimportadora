export default function LinkMock({ href, children, className, onClick, ...props }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
