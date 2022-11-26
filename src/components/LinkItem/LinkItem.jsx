function LinkItem({ linkClass, icon, textClass, text, href }) {
    return (
      <a className={linkClass} href={href}>
        {icon} <span className={textClass}>{text}</span>
      </a>
    );
  }

  export default LinkItem;